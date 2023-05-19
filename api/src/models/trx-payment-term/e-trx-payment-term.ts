import { Entity } from "../../@cores/entity";

export class ETrxPaymentTerm extends Entity {

  constructor() {
    super();
  }

  private _status: string = "";
  private _idInvoice: string = "";
  private _idTrxPaymentTermBefore: string = "";
  private _totalPrice: number = 0;
  private _totalDiscountItem: number = 0;
  private _totalDiscountGlobal: number = 0;
  private _totalTax: number = 0;
  private _totalARAP: number = 0;
  private _cash: number = 0;
  private _cashReturn: number = 0;
  private _percentDiscountGlobal: number = 0;
  private _percentTax: number = 0;
  private _stateOfDiscountGlobal: string = "";
  private _stateOfTax: string = "";
  private _stateOfARAP: string = "";
  private _stateOfCash: string = "";
  private _calcTotalDiscount: number = 0;
  private _calcTotalTax: number = 0;
  private _calcTotalARAP: number = 0;
  private _calcTotalCash: number = 0;
  private _calcTotalCashBefore: number = 0;
  private _calcGrandTotal: number = 0;
  private _dateCommit: string = "";

  /**
   * Getter status
   * @return {string }
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Getter idInvoice
   * @return {string }
   */
  public get idInvoice(): string {
    return this._idInvoice;
  }

  /**
   * Getter idTrxPaymentTermBefore
   * @return {string }
   */
  public get idTrxPaymentTermBefore(): string {
    return this._idTrxPaymentTermBefore;
  }

  /**
   * Getter totalPrice
   * @return {number }
   */
  public get totalPrice(): number {
    return this._totalPrice;
  }

  /**
   * Getter totalDiscountItem
   * @return {number }
   */
  public get totalDiscountItem(): number {
    return this._totalDiscountItem;
  }

  /**
   * Getter totalDiscountGlobal
   * @return {number }
   */
  public get totalDiscountGlobal(): number {
    return this._totalDiscountGlobal;
  }

  /**
   * Getter totalTax
   * @return {number }
   */
  public get totalTax(): number {
    return this._totalTax;
  }

  /**
   * Getter totalARAP
   * @return {number }
   */
  public get totalARAP(): number {
    return this._totalARAP;
  }

  /**
   * Getter cash
   * @return {number }
   */
  public get cash(): number {
    return this._cash;
  }

  /**
   * Getter cashReturn
   * @return {number }
   */
  public get cashReturn(): number {
    return this._cashReturn;
  }

  /**
   * Getter percentDiscountGlobal
   * @return {number }
   */
  public get percentDiscountGlobal(): number {
    return this._percentDiscountGlobal;
  }

  /**
   * Getter percentTax
   * @return {number }
   */
  public get percentTax(): number {
    return this._percentTax;
  }

  /**
   * Getter stateOfDiscountGlobal
   * @return {string }
   */
  public get stateOfDiscountGlobal(): string {
    return this._stateOfDiscountGlobal;
  }

  public get hasDiscountGlobal(): boolean {
    return this._stateOfDiscountGlobal != "0";
  }

  /**
   * Getter stateOfTax
   * @return {string }
   */
  public get stateOfTax(): string {
    return this._stateOfTax;
  }

  public get hasTax(): boolean {
    return this._stateOfTax != "0";
  }

  /**
   * Getter stateOfARAP
   * @return {string }
   */
  public get stateOfARAP(): string {
    return this._stateOfARAP;
  }

  public get hasARAP(): boolean {
    return this._stateOfARAP != "0";
  }

  /**
   * Getter stateOfCash
   * @return {string }
   */
  public get stateOfCash(): string {
    return this._stateOfCash;
  }

  public get hasCash(): boolean {
    return this._stateOfCash != "0";
  }

  /**
   * Getter calcTotalDiscount
   * @return {number }
   */
  public get calcTotalDiscount(): number {
    return this._calcTotalDiscount;
  }

  /**
   * Getter calcTotalTax
   * @return {number }
   */
  public get calcTotalTax(): number {
    return this._calcTotalTax;
  }

  /**
   * Getter calcTotalARAP
   * @return {number }
   */
  public get calcTotalARAP(): number {
    return this._calcTotalARAP;
  }

  /**
   * Getter calcTotalCash
   * @return {number }
   */
  public get calcTotalCash(): number {
    return this._calcTotalCash;
  }

  /**
   * Getter calcTotalCashBefore
   * @return {number }
   */
  public get calcTotalCashBefore(): number {
    return this._calcTotalCashBefore;
  }

  /**
   * Getter calcGrandTotal
   * @return {number }
   */
  public get calcGrandTotal(): number {
    return this._calcGrandTotal;
  }

  /**
   * Getter dateCommit
   * @return {string }
   */
  public get dateCommit(): string {
    return this._dateCommit;
  }

  /**
   * Setter status
   * @param {string } value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Setter idInvoice
   * @param {string } value
   */
  public set idInvoice(value: string) {
    this._idInvoice = value;
  }

  /**
   * Setter idTrxPaymentTermBefore
   * @param {string } value
   */
  public set idTrxPaymentTermBefore(value: string) {
    this._idTrxPaymentTermBefore = value;
  }

  /**
   * Setter totalPrice
   * @param {number } value
   */
  public set totalPrice(value: number) {
    this._totalPrice = value;
  }

  /**
   * Setter totalDiscountItem
   * @param {number } value
   */
  public set totalDiscountItem(value: number) {
    this._totalDiscountItem = value;
  }

  /**
   * Setter totalDiscountGlobal
   * @param {number } value
   */
  public set totalDiscountGlobal(value: number) {
    this._totalDiscountGlobal = value;
  }

  /**
   * Setter totalTax
   * @param {number } value
   */
  public set totalTax(value: number) {
    this._totalTax = value;
  }

  /**
   * Setter totalARAP
   * @param {number } value
   */
  public set totalARAP(value: number) {
    this._totalARAP = value;
  }

  /**
   * Setter cash
   * @param {number } value
   */
  public set cash(value: number) {
    this._cash = value;
  }

  /**
   * Setter cashReturn
   * @param {number } value
   */
  public set cashReturn(value: number) {
    this._cashReturn = value;
  }

  /**
   * Setter percentDiscountGlobal
   * @param {number } value
   */
  public set percentDiscountGlobal(value: number) {
    this._percentDiscountGlobal = value;
  }

  /**
   * Setter percentTax
   * @param {number } value
   */
  public set percentTax(value: number) {
    this._percentTax = value;
  }

  /**
   * Setter stateOfDiscountGlobal
   * @param {string } value
   */
  public set stateOfDiscountGlobal(value: string) {
    this._stateOfDiscountGlobal = value;
  }

  /**
   * Setter stateOfTax
   * @param {string } value
   */
  public set stateOfTax(value: string) {
    this._stateOfTax = value;
  }

  /**
   * Setter stateOfARAP
   * @param {string } value
   */
  public set stateOfARAP(value: string) {
    this._stateOfARAP = value;
  }

  /**
   * Setter stateOfCash
   * @param {string } value
   */
  public set stateOfCash(value: string) {
    this._stateOfCash = value;
  }

  /**
   * Setter calcTotalDiscount
   * @param {number } value
   */
  public set calcTotalDiscount(value: number) {
    this._calcTotalDiscount = value;
  }

  /**
   * Setter calcTotalTax
   * @param {number } value
   */
  public set calcTotalTax(value: number) {
    this._calcTotalTax = value;
  }

  /**
   * Setter calcTotalARAP
   * @param {number } value
   */
  public set calcTotalARAP(value: number) {
    this._calcTotalARAP = value;
  }

  /**
   * Setter calcTotalCash
   * @param {number } value
   */
  public set calcTotalCash(value: number) {
    this._calcTotalCash = value;
  }

  /**
   * Setter calcTotalCashBefore
   * @param {number } value
   */
  public set calcTotalCashBefore(value: number) {
    this._calcTotalCashBefore = value;
  }

  /**
   * Setter calcGrandTotal
   * @param {number } value
   */
  public set calcGrandTotal(value: number) {
    this._calcGrandTotal = value;
  }

  /**
   * Setter dateCommit
   * @param {string } value
   */
  public set dateCommit(value: string) {
    this._dateCommit = value;
  }

}