import { Controller } from "../@cores/controller";
import { ParamReportTransaction } from "../models/reporting/param-report-transaction";
import { MReporting } from "../models/reporting/m-reporting";
import { EReportTransaction } from "../models/reporting/e-report-transaction";
import { MTrxInvoice } from "../models/trx-invoice/m-trx-invoice";
import { ParamReportStock } from "../models/reporting/param-report-stock";
import { EReportStock } from "../models/reporting/e-report-stock";
import { ParamReportStockDetails } from "../models/reporting/param-report-stock-details";
import { EReportStockDetails } from "../models/reporting/e-report-stock-details";

export class Reporting extends Controller {
  constructor() {
    super();

    this.router.route("/selling").get((req, res) => {
      (async () => {
        try {
          let param: ParamReportTransaction = new ParamReportTransaction(
            req.query
          );
          let data: Array<EReportTransaction> = await MReporting.getDataReport(
            param,
            MTrxInvoice.TYPE_SELL
          );
          this.json["data"]["list"] = data;
          res.json(this.json);
        } catch (e) {
          console.log(e);
          res.sendStatus(500);
        }
      })();
    });

    this.router.route("/receiving").get((req, res) => {
      (async () => {
        try {
          let param: ParamReportTransaction = new ParamReportTransaction(
            req.query
          );
          let data: Array<EReportTransaction> = await MReporting.getDataReport(
            param,
            MTrxInvoice.TYPE_RECEIVE
          );
          this.json["data"]["list"] = data;
          res.json(this.json);
        } catch (e) {
          console.log(e);
          res.sendStatus(500);
        }
      })();
    });

    this.router.route("/stock").get(async (req, res) => {
      try {
        let param: ParamReportStock = new ParamReportStock(req.query);
        let data: Array<EReportStock> = await MReporting.getDataReportStock(param);
        this.json["data"]["list"] = data;
        res.json(this.json);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    });

    this.router.route("/stock-details").get(async (req, res) => {
      try {
        let param: ParamReportStockDetails = new ParamReportStockDetails(req.query);
        let data: Array<EReportStockDetails> = await MReporting.getDataReportStockDetails(param);
        this.json["data"]["list"] = data;
        res.json(this.json);
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    });
  }
}
