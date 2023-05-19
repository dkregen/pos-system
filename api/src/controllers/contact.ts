import { Controller } from "../@cores/controller";
import { MContact } from "../models/contact/m-contact";

export class Contact extends Controller {

  constructor() {
    super(MContact);
  }

  protected errorHandlerInsert(reason: any, response: any) {
    if(reason.sqlMessage) {
      let txt = reason.sqlMessage.replace(/\'/g, "").replace(/_/g, " ");
      this.json.data["message"] = this.msg(this.MSG_TYPE_ERROR, txt);
      response.json(this.json);
    } else {
      this.errorHandler(reason, response);
    }
  }

  protected errorHandlerUpdate(reason: any, response: any) {
    this.errorHandlerInsert(reason, response);
  }
  
}