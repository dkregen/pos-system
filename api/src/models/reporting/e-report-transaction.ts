import { Entity } from "../../@cores/entity";

export class EReportTransaction extends Entity {
  constructor() {
    super();
  }

  private _invoice: string = "";
  private _contact: string = "";
  private _amount: number = 0;
  private _arap: number = 0;
  private _discount: number = 0;
  private _date: string = "";
  private _taxIncluded: number = 0;
  private _shortCost: number = 0;
  private _cash: number = 0;
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
   * Getter cash
   * @return {number }
   */
  public get cash(): number {
    return this._cash;
  }

  /**
   * Setter cash
   * @param {number } value
   */
  public set cash(value: number) {
    this._cash = value;
  }

  /**
   * Getter arap
   * @return {number }
   */
  public get arap(): number {
    return this._arap;
  }

  /**
   * Setter arap
   * @param {number } value
   */
  public set arap(value: number) {
    this._arap = value;
  }

  /**
   * Getter invoice
   * @return {string }
   */
  public get invoice(): string {
    return this._invoice;
  }

  /**
   * Getter contact
   * @return {string }
   */
  public get contact(): string {
    return this._contact;
  }

  /**
   * Setter invoice
   * @param {string } value
   */
  public set invoice(value: string) {
    this._invoice = value;
  }

  /**
   * Setter contact
   * @param {string } value
   */
  public set contact(value: string) {
    this._contact = value;
  }

  /**
   * Getter amount
   * @return {number }
   */
  public get amount(): number {
    return this._amount;
  }

  /**
   * Getter discount
   * @return {number }
   */
  public get discount(): number {
    return this._discount;
  }

  /**
   * Setter amount
   * @param {number } value
   */
  public set amount(value: number) {
    this._amount = value;
  }

  /**
   * Setter discount
   * @param {number } value
   */
  public set discount(value: number) {
    this._discount = value;
  }

  /**
   * Getter date
   * @return {string }
   */
  public get date(): string {
    return this._date;
  }

  /**
   * Setter date
   * @param {string } value
   */
  public set date(value: string) {
    this._date = value;
  }

  /**
   * Getter taxIncluded
   * @return {number }
   */
  public get taxIncluded(): number {
    return this._taxIncluded;
  }

  /**
   * Setter taxIncluded
   * @param {number } value
   */
  public set taxIncluded(value: number) {
    this._taxIncluded = value;
  }

  /**
   * Getter shortCost
   * @return {number }
   */
  public get shortCost(): number {
    return this._shortCost;
  }

  /**
   * Setter shortCost
   * @param {number } value
   */
  public set shortCost(value: number) {
    this._shortCost = value;
  }

}