import { Entity } from "../../@cores/entity";

export class EReportStockDetails extends Entity {
  constructor() {
    super();
  }

  private _invoice: string = "";
  private _qty: number = 0;
  private _type: number = 0;
  private _status: number = 0;

  /**
   * Getter status
   * @return {number }
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Setter status
   * @param {number } value
   */
  public set status(value: number) {
    this._status = value;
  }

  /**
   * Getter type
   * @return {number }
   */
  public get type(): number {
    return this._type;
  }

  /**
   * Setter type
   * @param {number } value
   */
  public set type(value: number) {
    this._type = value;
  }

  /**
   * Getter invoice
   * @return {string }
   */
  public get invoice(): string {
    return this._invoice;
  }

  /**
   * Getter qty
   * @return {number }
   */
  public get qty(): number {
    return this._qty;
  }

  /**
   * Setter invoice
   * @param {string } value
   */
  public set invoice(value: string) {
    this._invoice = value;
  }

  /**
   * Setter qty
   * @param {number } value
   */
  public set qty(value: number) {
    this._qty = value;
  }
}
