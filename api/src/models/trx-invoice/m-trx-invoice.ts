import { Model } from "../../@cores/model";
import { ETrxInvoice } from "./e-trx-invoice";
import { MTrxItem } from "../trx-item/m-trx-item";
import { MTrxPaymentTerm } from "../trx-payment-term/m-trx-payment-term";
import * as Moment from "moment";
import { MUser } from "../user/m-user";
import { MContact } from "../contact/m-contact";
import { QueryObject } from "../../@cores/query-object";
import { MItem } from "../item/m-item";
import { Entity } from "../../@cores/entity";
import { MReporting } from "../reporting/m-reporting";

export class MTrxInvoice extends Model {

  protected readonly TABLE: string = "trx_invoice";
  protected Entity: any = ETrxInvoice;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<ETrxInvoice> { return this.p(re, true); }
  public toObject(re: Request | any): ETrxInvoice { return this.p(re, false); }
  public toForm(re: Request | any): any { return this.p(re, false, true); }
  public insert(entity: any): Promise<ETrxInvoice> { return this.i(entity); }
  public update(entity: any): Promise<ETrxInvoice> { return this.u(entity); }
  public list(params: any, toForm = false): Promise<Array<ETrxInvoice>> { return this.l(params, toForm); }
  public fetchWhere(params: any, toForm = false): Promise<ETrxInvoice> { return this.fW(params, toForm); }
  public fetch(id: string, toForm = false): Promise<ETrxInvoice> { return this.f(id, toForm); }
  public delete(id: string): Promise<ETrxInvoice> { return this.d(id); }

  public static readonly TYPE_SELL: number = 0;
  public static readonly TYPE_RECEIVE: number = 1;
  public static readonly TYPE_ADJUST: number = 2;

  private static readonly PREFIX_TYPE_SELL: string = "S";
  private static readonly PREFIX_TYPE_RECEIVE: string = "R";
  private static readonly PREFIX_TYPE_ADJUST: string = "A";
  private static getPrefixType(index: number): string {
    switch (index + "") {
      case "0":
        return this.PREFIX_TYPE_SELL;
      case "1":
        return this.PREFIX_TYPE_RECEIVE;
      default:
        return this.PREFIX_TYPE_ADJUST;
    }
  }

  public readonly NAMES = {
    id: 0,
    status: 1,
    idContact: 2,
    idUser: 3,
    codeInvoice: 4,
    date: 5,
    type: 6
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "STATUS",
    "ID_CONTACT",
    "ID_USER",
    "CODE_INVOICE",
    "DATE",
    "TYPE"
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "status",
    "contactId",
    "userId",
    "code",
    "datetime",
    "type"
  ];

  public like(where: string) {
    let like = "%" + where + "%";
    return {
      where: this.FIELDS[this.NAMES.id] + " IN (SELECT u.`ID` FROM `units` u WHERE u.`NAME` LIKE ?)",
      var: [like]
    }
  }

  public static async buildInvoice(req: any): Promise<ETrxInvoice> {
    let mTrxInvoice: MTrxInvoice = new MTrxInvoice();
    let mTrxItem: MTrxItem = new MTrxItem();
    let mTrxPaymentTerm: MTrxPaymentTerm = new MTrxPaymentTerm();
    let invoice: ETrxInvoice = await mTrxInvoice.populate(req);
    invoice.date || (invoice.date = Moment());
    if (!invoice.codeInvoice || invoice.codeInvoice === "") {
      invoice.codeInvoice = await MTrxInvoice.generateNoInvoice(invoice);
    }

    if (!invoice.idContact) {
      invoice.idContact = null;
    }

    let products: Array<any> = ("_products" in req.body ? req.body._products : null);
    let compliments = ("_compliments" in req.body ? req.body._compliments : null);
    let services = ("_services" in req.body ? req.body._services : null);
    let payment = ("_payment" in req.body ? req.body._payment : null);

    if (products) {
      for (let i = 0; i < products.length; i++) {
        invoice.products[i] = await mTrxItem.populate({ body: products[i] });
      }
    }

    if (compliments) {
      for (let i = 0; i < compliments.length; i++) {
        invoice.compliments[i] = await mTrxItem.populate({ body: compliments[i] });
      }
    }

    if (services) {
      for (let i = 0; i < services.length; i++) {
        invoice.services[i] = await mTrxItem.populate({ body: services[i] });
      }
    }

    if (payment) {
      let p = await mTrxPaymentTerm.populate({ body: payment });
      if(!!p.stateOfARAP && parseInt(p.stateOfARAP)>0) {
        p.stateOfCash = "1";
      }

      if(!p.idTrxPaymentTermBefore) {
        p.idTrxPaymentTermBefore = null;
      }
      
      invoice.payment = await MTrxPaymentTerm.getMovementPayment(p);
    }

    return invoice;
  }

  public static async insertNewInvoice(inv: ETrxInvoice): Promise<string> {
    let mTrxInvoice: MTrxInvoice = new MTrxInvoice();
    let mTrxItem: MTrxItem = new MTrxItem();
    let mTrxPaymentTerm: MTrxPaymentTerm = new MTrxPaymentTerm();
    try {
      if(inv.hasId()) {
        await mTrxInvoice.update(inv)
       } else {
          for (let item of inv.products) {
            let stock: number = await MReporting.getStockByIdAndBeforeDate(item.idItem, Moment(new Date()).add(1, 'days').format("YYYY-MM-DD"));
            if(parseInt(!!item.qty?item.qty:"0") > stock && inv.type == MTrxInvoice.TYPE_SELL) {
              return "Tidak dapat disimpan karena stok kurang.\n\nProduk: "+item.itemName+"\nQty saat ini: "+stock;
            }
          }
          for (let item of inv.compliments) {
            let stock: number = await MReporting.getStockByIdAndBeforeDate(item.idItem, Moment(new Date()).add(1, 'days').format("YYYY-MM-DD"));
            if(parseInt(!!item.qty?item.qty:"0") > stock) {
              return "Tidak dapat disimpan karena stok kurang.<br>Produk: "+item.itemName+"<br>Qty saat ini: "+stock;
            }
          }
          await mTrxInvoice.insert(inv);
       }
      for (let item of inv.products) {
        item.idInvoice = inv.id;
        item.productType = MTrxItem.TYPE_PRODUCT;
        item.hasId() || await mTrxItem.insert(item);
      }
      for (let item of inv.services) {
        item.idInvoice = inv.id;
        item.productType = MTrxItem.TYPE_SERVICE;
        item.hasId() || await mTrxItem.insert(item);
      }
      for (let item of inv.compliments) {
        item.idInvoice = inv.id;
        item.productType = MTrxItem.TYPE_COMPLIMIENT;
        item.hasId() || await mTrxItem.insert(item);
      }

      inv.payment.idInvoice = inv.id;
      if(!inv.payment.hasId() || inv.payment.id == "-1") {
        inv.payment.id = "";
        inv.payment.dateCommit = Moment().format(Entity.MOMENT_PATTERN_MYSQL);
        await mTrxPaymentTerm.insert(inv.payment);
      }

    } catch (e) {
      console.log(e);
    }

    return null;
  }

  public static async generateNoInvoice(inv: ETrxInvoice): Promise<string> {
    try {
      let model: MTrxInvoice = new MTrxInvoice();
      let prefix = MTrxInvoice.getPrefixType(inv.type);
      let master = this.generateDigitNumber(2, inv.idUser);
      let date = (Moment()).format("YYYYMMDD");
      let builder = prefix + master + "-" + date + "-";
      let counter: number = await model.count({
        where: model.FIELDS[model.NAMES.codeInvoice] + " LIKE ?",
        var: builder + "%"
      });

      return builder + this.generateDigitNumber(3, (counter + 1));
    } catch (e) {
      console.log(e);
    }
  }

  public static async getInvoiceObject(idInvoice: string): Promise<object> {
    let mTrxInvoice: MTrxInvoice = new MTrxInvoice();
    let mTrxItem: MTrxItem = new MTrxItem();
    let mTrxPaymentTerm: MTrxPaymentTerm = new MTrxPaymentTerm();
    let mUser: MUser = new MUser();
    let mContact: MContact = new MContact();

    try {
      let inv: ETrxInvoice = await mTrxInvoice.fetch(idInvoice);
      let invoice: any = await mTrxInvoice.toForm(inv);
      invoice["products"] = await mTrxItem.list({
        where: mTrxItem.FIELDS[mTrxItem.NAMES.productType] + " = ? AND " +
          mTrxItem.FIELDS[mTrxItem.NAMES.idInvoice] + " = ? ",
        var: [MTrxItem.TYPE_PRODUCT, idInvoice]
      }, true);

      if(inv.type == MTrxInvoice.TYPE_ADJUST) {
        let mItem: MItem = new MItem();
        for(let i of invoice["products"]) {
          console.log("this is it: ", inv.date);
          let n = await MItem.getStock(inv.date?Entity.moment(inv.date):Moment(), i["itemId"]);
          i["oldStock"] = n - i["qty"];
          i["newStock"] = n;
        }
      }

      invoice["services"] = await mTrxItem.list({
        where: mTrxItem.FIELDS[mTrxItem.NAMES.productType] + " = ? AND " +
          mTrxItem.FIELDS[mTrxItem.NAMES.idInvoice] + " = ? ",
        var: [MTrxItem.TYPE_SERVICE, idInvoice]
      }, true);
      invoice["compliments"] = await mTrxItem.list({
        where: mTrxItem.FIELDS[mTrxItem.NAMES.productType] + " = ? AND " +
          mTrxItem.FIELDS[mTrxItem.NAMES.idInvoice] + " = ? ",
        var: [MTrxItem.TYPE_COMPLIMIENT, idInvoice]
      }, true);
      invoice["payment"] = await mTrxPaymentTerm.toFormObject(await MTrxPaymentTerm.getPayment(idInvoice));

      invoice["contact"] = await mContact.fetch(inv.idContact, true);
      invoice["pic"] = await mUser.fetch(inv.idUser, true);
      invoice['pic']['password'] = undefined;

      return invoice;

    } catch (e) {
      console.log(e);
    }

    return null;
  }

  public static async searchInvoice(type:number, query: string): Promise<Array<any>> {
    let q = new QueryObject();
    q.query = "SELECT * FROM (SELECT i.`ID` AS `id`, i.`CODE_INVOICE` AS `code`, c.`NAME` AS `contact`, SUM(p.`CALC_GRAND_TOTAL`+p.`CASH_RETURN`)-SUM(p.`CALC_TOTAL_CASH`+p.`CALC_TOTAL_DISCOUNT`) AS `amount` " 
            + "FROM `trx_invoice` i "
            + "JOIN `contacts` c ON i.`ID_CONTACT` = c.`ID` "
            + "JOIN `trx_payment_term` p ON p.`ID_INVOICE` = i.`ID` "
            + "WHERE i.`TYPE`= ? "
            + "AND p.`STATE_OF_ARAP` > 0 "
            + "AND (i.`CODE_INVOICE` LIKE ? OR c.`NAME` LIKE ?) "
            + "GROUP BY i.`ID`) `t` WHERE `t`.`amount` > 0";
    q.value = [type, "%"+query+"%", "%"+query+"%"];
    let r = await Model.exec(q);
    return r;
  }

}