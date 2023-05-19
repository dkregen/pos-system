import { Controller } from "../@cores/controller";
import { MUnit } from "../models/unit/m-unit";

export class Unit extends Controller {

  constructor() {
    super(MUnit);
  }
  
}