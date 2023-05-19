import { Model } from "../../@cores/model";
import { MFile } from "../file/m-file";
import { MUnit } from "../unit/m-unit";
import { EItem } from "./e-item";
import { MUser } from "../user/m-user";
import { ECustomItem } from "./e-custom-item";
import * as Moment from "moment";
import { QueryObject } from "../../@cores/query-object";
import { MTrxInvoice } from "../trx-invoice/m-trx-invoice";

export class MItem extends Model {

  protected readonly TABLE: string = "items";
  protected Entity: any = EItem;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<EItem> { return this.p(re, true); }
  public toObject(re: Request | any): EItem { return this.p(re, false); }
  public insert(entity: any): Promise<EItem> { return this.i(entity); }
  public update(entity: any): Promise<EItem> { return this.u(entity); }
  public list(params: any, toForm = false): Promise<Array<EItem>> { return this.l(params, toForm); }
  public fetchWhere(params: any, toForm = false): Promise<EItem> { return this.fW(params, toForm); }
  public fetch(id: string, toForm = false): Promise<EItem> { return this.f(id, toForm); }
  public delete(id: string): Promise<EItem> { return this.d(id); }

  static readonly STATUS_INACTIVE = 0;
  static readonly STATUS_ACTIVE = 1;

  static readonly PRIV_NOPRIVILEGE = -1;
  static readonly PRIV_ADMIN = 0;
  static readonly PRIV_CASHIER = 1;
  static readonly PRIV_MASTER = 2;

  static readonly PERM_ALWAYS_ASK = 0;
  static readonly PERM_ASK_ONCE = 1;
  static readonly PERM_GRANT_ALL = 2;
  static readonly PERM_DENY_ALL = 3;

  public static readonly PRICE_SELL_TYPE_MARKUP_PERCENT: string = "0";
  public static readonly PRICE_SELL_TYPE_MARKUP_NOMINAL: string = "1";
  public static readonly PRICE_SELL_TYPE_FIX: string = "2";

  public readonly NAMES = {
    id: 0,
    status: 1,
    idUnit: 2,
    idFilePicture: 3,
    idUserInput: 4,
    name: 5,
    dateEntry: 6,
    priceBuy: 7,
    priceSell: 8,
    code: 9,
    markupNominal: 10,
    markupPercent: 11,
    priceSellType: 12
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "STATUS",
    "ID_UNIT",
    "ID_FILE_PICTURE",
    "ID_USER_INPUT",
    "NAME",
    "DATE_ENTRY",
    "PRICE_BUY",
    "PRICE_SELL",
    "CODE",
    "MARKUP_NOMINAL",
    "MARKUP_PERCENT",
    "PRICE_SELL_TYPE"
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "status",
    "unitId",
    "pictId",
    "userId",
    "name",
    "entryDate",
    "priceBuy",
    "priceSell",
    "barcode",
    "upNominal",
    "upPercent",
    "priceType"
  ];

  public readonly RELATIONS: Object = {
    image: {
      model: MFile,
      relation: this.RELATION_ONE,
      fk: this.NAMES.idFilePicture,
      autoFetch: true
    },
    unit: {
      model: MUnit,
      relation: this.RELATION_ONE,
      fk: this.NAMES.idUnit,
      autoFetch: true
    },
    user: {
      model: MUser,
      relation: this.RELATION_ONE,
      fk: this.NAMES.idUserInput,
      autoFetch: true
    }
  };
  
  public like(where: string) {
    let like = "%"+where+"%";
    return {
      where: this.FIELDS[this.NAMES.id]+" IN (SELECT ID FROM `items` i WHERE i.`CODE` LIKE ? OR i.`NAME` LIKE ?)",
      var: [like, like]
    }
  }

  public async getPriceBuy(idItem: string, date: Moment.Moment): Promise<number> {
    let price: number = 0;
    let q: QueryObject = new QueryObject();
    try {
      q.query = "SELECT AVG(tit.`PRICE`) AS `0` "
        + "FROM `trx_item` tit "
        + "JOIN `trx_invoice` tin ON tin.`ID` = tit.`ID_INVOICE` "
        + "WHERE tin.`TYPE` = " + MTrxInvoice.TYPE_RECEIVE + " "
        + "AND tin.`DATE` <= ? "
        + "AND tit.`ID_ITEM` = ? "
        + "AND tin.`STATUS` > -1 "
        + "GROUP BY tit.`ID_ITEM`";
      q.value = [date.format("YYYY-MM-DD HH:mm:ss"), idItem];
      let r: any = await Model.exec(q);
      if (r.length > 0) {
        price = r[0][0];
      }
    } catch (e) {
      console.log(e);
    }

    return price;
  }

  public async getPriceSell(idItem: string, date: Moment.Moment): Promise<number> {
    let price: number = await this.getPriceBuy(idItem, date);
    let item: EItem = await this.fetch(idItem);
    if(price <= 0) {
      return item.priceSell;
    }

    switch(item.priceSellType+"") {
      case MItem.PRICE_SELL_TYPE_MARKUP_NOMINAL:
        return price + item.markupNominal;
      case MItem.PRICE_SELL_TYPE_MARKUP_PERCENT:
        return price + (price * item.markupPercent / 100);
      default:
        return item.priceSell;
    }
  }

  public getItemQuery(query: string, limit?: string, index?: number): Promise<Array<ECustomItem>> {
    return new Promise((resolve, reject) => {
      this.connection((c) => {
        var q = this.query(this.FIELDS[this.NAMES.name] + " LIKE ? OR " +
          this.FIELDS[this.NAMES.code] + " LIKE ?", null, null,
          this.FIELDS[this.NAMES.name], "asc", limit, index);
        var vars = [query, query];

        console.log("model.list: query:", q);
        console.log("model.list: values:", vars);
        c.query(q, vars, (err, result) => {
          if (err) return reject(err);
          let listTrxItem: Array<ECustomItem> = new Array();
          for (let i = 0; i < result.length; i++) {
            let item: ECustomItem = new ECustomItem();
            item.id = result[i]["ID"];
            item.name = result[i]["NAME"];
            item.code = result[i]["CODE"];
            item.price = 0;
            listTrxItem[i] = item;
          }
          resolve(listTrxItem);
        });
      });
    });
  }

  public async getWithCurrentStock(query: string, date: Moment.Moment, limit?: string, index?: number):
    Promise<Array<any>> {
    let arr: Array<ECustomItem> = new Array();
    try {
      arr = await this.getItemQuery(query, limit, index);
      for (let i = 0; i < arr.length; i++) {
        arr[i].stock = await MItem.getStock(date || Moment(), arr[i].id);
        arr[i] = arr[i].removeUnderscore();
      }
    } catch (e) {
      console.log(e);
    }
    return arr;
  }

  public async getWithCurrentPriceBuy(query: string, limit?: string, index?: number):
    Promise<Array<ECustomItem>> {
    let arr: Array<ECustomItem> = new Array();
    try {
      arr = await this.getItemQuery(query, limit, index);
      for (let i = 0; i < arr.length; i++) {
        arr[i].price = 0;
        arr[i] = arr[i].removeUnderscore();
      }
    } catch (e) {
      console.log(e);
    }
    return arr;
  }

  public async getWithCurrentPriceSell(query: string, limit?: string, index?: number):
    Promise<Array<ECustomItem>> {
    let arr: Array<ECustomItem> = new Array();
    try {
      arr = await this.getItemQuery(query, limit, index);
      for (let i = 0; i < arr.length; i++) {
        arr[i].price = await this.getPriceSell(arr[i].id, Moment());
        arr[i] = arr[i].removeUnderscore();
      }
    } catch (e) {
      console.log(e);
    }
    return arr;
  }

  public static async getStock(date: Moment.Moment, idItem: string): Promise<number> {
    let n: number = 0;
    try {
      let q: QueryObject = new QueryObject();
      q.query = 'SELECT i.`ID`, SUM(IF(t.`DATE` <= ? AND t.`STATUS`>-1, COALESCE(ti.`QTY`, 0), 0)*IF(t.`TYPE` = 0, -1, 1)) AS `STOCK` '
        + 'FROM `items` i '
        + 'LEFT JOIN `trx_item` ti ON ti.`ID_ITEM` = i.`ID` '
        + 'LEFT JOIN `trx_invoice` t ON t.`ID` = ti.`ID_INVOICE` '
        + 'WHERE i.`ID` = ? '
        + 'GROUP BY i.`ID`';
      q.value = [date.format("YYYY-MM-DD HH:mm:ss"), idItem];
      console.log(q);
      let o = await this.exec(q);
      if (o.length > 0) {
        n = parseInt(o[0]["STOCK"]);
      }
    } catch (e) {
      console.log(e);
    }
    return n;
  }

}