import { Entity } from "../@core/entity";

export class ECustomInvoice extends Entity {
  private _code: string = "";
  private _contact: string = "";
  private _amount: number = 0;

  public readonly NAMES = {
    id: 0,
    code: 1,
    contact: 2,
    amount: 3
  };
  
  public objects: Array<any> = [
    "id",
    "code",
    "contact",
    "amount"
  ]

  /**
   * Getter code
   * @return {string }
   */
  public get code(): string {
    return this._code;
  }

  /**
   * Getter contact
   * @return {string }
   */
  public get contact(): string {
    return this._contact;
  }

  /**
   * Getter amount
   * @return {number }
   */
  public get amount(): number {
    return this._amount;
  }

  /**
   * Setter code
   * @param {string } value
   */
  public set code(value: string) {
    this._code = value;
  }

  /**
   * Setter contact
   * @param {string } value
   */
  public set contact(value: string) {
    this._contact = value;
  }

  /**
   * Setter amount
   * @param {number } value
   */
  public set amount(value: number) {
    this._amount = value;
  }

}