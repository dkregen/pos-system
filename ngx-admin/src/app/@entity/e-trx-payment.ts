import { Entity } from "../@core/entity";
import { EAlert } from "./e-alert";

export class ETrxPayment extends Entity {
  private _status: number = 0;
  private _invoiceId: string = "";
  private _paymentBeforeId: string = "";
  private _discItemTotal: number = 0;
  private _discGlobalTotal: number = 0;
  private _taxTotal: number = 0;
  private _prTotal: number = 0;
  private _cash: number = 0;
  private _firstCash: number = 0;
  private _returnCash: number = 0;
  private _discGlobalPercent: number = 0;
  private _taxPercent: number = 10;
  private _discGlobalState: number = 0;
  private _taxState: number = 0;
  private _prState: number = 0;
  private _cashState: number = 1;
  private _discTotalCal: number = 0;
  private _taxTotalCal: number = 0;
  private _prTotalCal: number = 0;
  private _cashTotalCal: number = 0;
  private _cashBeforeTotalCal: number = 0;
  private _date: string = "";
  private _priceTotal: number = 0;
  private _grandTotalCal: number = 0;
  private _paymentTotal: number = 0;

  constructor() {
    super();
  }

  public readonly NAMES = {
    id: 0,
    status: 1,
    invoiceId: 2,
    paymentBeforeId: 3,
    discItemTotal: 4,
    discGlobalTotal: 5,
    taxTotal: 6,
    prTotal: 7,
    cash: 8,
    returnCash: 9,
    discGlobalPercent: 10,
    taxPercent: 11,
    discGlobalState: 12,
    taxState: 13,
    prState: 14,
    cashState: 15,
    discTotalCal: 16,
    taxTotalCal: 17,
    prTotalCal: 18,
    cashTotalCal: 19,
    cashBeforeTotalCal: 20,
    date: 21,
    priceTotal: 22,
    grandTotalCal: 23
  };

  public objects: Array<any> = [
    "id",
    "status",
    "invoiceId",
    "paymentBeforeId",
    "discItemTotal",
    "discGlobalTotal",
    "taxTotal",
    "prTotal",
    "cash",
    "returnCash",
    "discGlobalPercent",
    "taxPercent",
    "discGlobalState",
    "taxState",
    "prState",
    "cashState",
    "discTotalCal",
    "taxTotalCal",
    "prTotalCal",
    "cashTotalCal",
    "cashBeforeTotalCal",
    "date",
    "priceTotal",
    "grandTotalCal"
  ];

  public checkForm(): EAlert {
    return null;
  }

  public calculateTotalPayment() {
    this._paymentTotal = 0;
    if (this._prState > 0) {
      this._paymentTotal += this._prTotal;
    }
    if (this._cashState > 0) {
      this._paymentTotal += this._cash;
    }
  }

  /**
   * Getter status
   * @return {number }
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Getter invoiceId
   * @return {string }
   */
  public get invoiceId(): string {
    return this._invoiceId;
  }

  /**
   * Getter paymentBeforeId
   * @return {string }
   */
  public get paymentBeforeId(): string {
    return this._paymentBeforeId;
  }

  /**
   * Getter discItemTotal
   * @return {number }
   */
  public get discItemTotal(): number {
    return this._discItemTotal;
  }

  /**
   * Getter discGlobalTotal
   * @return {number }
   */
  public get discGlobalTotal(): number {
    return this._discGlobalTotal;
  }

  /**
   * Getter taxTotal
   * @return {number }
   */
  public get taxTotal(): number {
    return this._taxTotal;
  }

  /**
   * Getter prTotal
   * @return {number }
   */
  public get prTotal(): number {
    return this._prTotal;
  }

  /**
   * Getter cash
   * @return {number }
   */
  public get cash(): number {
    return this._cash;
  }

  /**
   * Getter returnCash
   * @return {number }
   */
  public get returnCash(): number {
    return this._returnCash;
  }

  /**
   * Getter discGlobalPercent
   * @return {number }
   */
  public get discGlobalPercent(): number {
    return this._discGlobalPercent;
  }

  /**
   * Getter taxPercent
   * @return {number }
   */
  public get taxPercent(): number {
    return this._taxPercent;
  }

  /**
   * Getter discGlobalState
   * @return {number }
   */
  public get discGlobalState(): number {
    return this._discGlobalState;
  }

  /**
   * Getter taxState
   * @return {number }
   */
  public get taxState(): number {
    return this._taxState;
  }

  /**
   * Getter prState
   * @return {number }
   */
  public get prState(): number {
    return this._prState;
  }

  /**
   * Getter cashState
   * @return {number }
   */
  public get cashState(): number {
    return this._cashState;
  }

  /**
   * Getter discTotalCal
   * @return {number }
   */
  public get discTotalCal(): number {
    return this._discTotalCal;
  }

  /**
   * Getter taxTotalCal
   * @return {number }
   */
  public get taxTotalCal(): number {
    return this._taxTotalCal;
  }

  /**
   * Getter prTotalCal
   * @return {number }
   */
  public get prTotalCal(): number {
    return this._prTotalCal;
  }

  /**
   * Getter cashTotalCal
   * @return {number }
   */
  public get cashTotalCal(): number {
    return this._cashTotalCal;
  }

  /**
   * Getter cashBeforeTotalCal
   * @return {number }
   */
  public get cashBeforeTotalCal(): number {
    return this._cashBeforeTotalCal;
  }

  /**
   * Getter date
   * @return {string }
   */
  public get date(): string {
    return this._date;
  }

  /**
   * Setter status
   * @param {number } value
   */
  public set status(value: number) {
    this._status = value;
  }

  /**
   * Setter invoiceId
   * @param {string } value
   */
  public set invoiceId(value: string) {
    this._invoiceId = value;
  }

  /**
   * Setter paymentBeforeId
   * @param {string } value
   */
  public set paymentBeforeId(value: string) {
    this._paymentBeforeId = value;
  }

  /**
   * Setter discItemTotal
   * @param {number } value
   */
  public set discItemTotal(value: number) {
    this._discItemTotal = value;
  }

  /**
   * Setter discGlobalTotal
   * @param {number } value
   */
  public set discGlobalTotal(value: number) {
    this._discGlobalTotal = value;
  }

  /**
   * Setter taxTotal
   * @param {number } value
   */
  public set taxTotal(value: number) {
    this._taxTotal = value;
    if (this._taxState > 0) {
      this._taxTotalCal = value;
    }
  }

  /**
   * Setter prTotal
   * @param {number } value
   */
  private firstPr: boolean = true;
  public prFirst: number = 0;
  public set prTotal(value: number) {
    this._prTotal = value;
    this.calculateTotalPayment();
    if (this.firstPr) {
      this.prFirst = value;
      this.firstPr = false;
    }
  }

  /**
   * Setter cash
   * @param {number } value
   */
  private cashIsFirst = true;
  public set cash(value: number) {
    this._cash = value;
    if(this.cashIsFirst) {
      this.firstCash = value;
      this.cashIsFirst = false;
    }
    this.calculateTotalPayment();
  }

  /**
   * Setter returnCash
   * @param {number } value
   */
  public set returnCash(value: number) {
    this._returnCash = value;
  }

  /**
   * Setter discGlobalPercent
   * @param {number } value
   */
  public set discGlobalPercent(value: number) {
    this._discGlobalPercent = value;
  }

  /**
   * Setter taxPercent
   * @param {number } value
   */
  public set taxPercent(value: number) {
    this._taxPercent = value;
  }

  /**
   * Setter discGlobalState
   * @param {number } value
   */
  public set discGlobalState(value: number) {
    this._discGlobalState = value;
  }

  /**
   * Setter taxState
   * @param {number } value
   */
  public set taxState(value: number) {
    this._taxState = value;
  }

  /**
   * Setter prState
   * @param {number } value
   */
  public set prState(value: number) {
    this._prState = value;
    this.calculateTotalPayment();
  }

  /**
   * Setter cashState
   * @param {number } value
   */
  public set cashState(value: number) {
    this._cashState = value;
    this.calculateTotalPayment();
  }

  /**
   * Setter discTotalCal
   * @param {number } value
   */
  public set discTotalCal(value: number) {
    this._discTotalCal = value;
  }

  /**
   * Setter taxTotalCal
   * @param {number } value
   */
  public set taxTotalCal(value: number) {
    this._taxTotalCal = value;
  }

  /**
   * Setter prTotalCal
   * @param {number } value
   */
  public set prTotalCal(value: number) {
    this._prTotalCal = value;
  }

  /**
   * Setter cashTotalCal
   * @param {number } value
   */
  public set cashTotalCal(value: number) {
    this._cashTotalCal = value;
  }

  /**
   * Setter cashBeforeTotalCal
   * @param {number } value
   */
  public set cashBeforeTotalCal(value: number) {
    this._cashBeforeTotalCal = value;
  }

  /**
   * Setter date
   * @param {string } value
   */
  public set date(value: string) {
    this._date = value;
  }

  /**
   * Getter priceTotal
   * @return {number }
   */
  public get priceTotal(): number {
    return this._priceTotal;
  }

  /**
   * Setter priceTotal
   * @param {number } value
   */
  public set priceTotal(value: number) {
    this._priceTotal = value;
  }

  /**
   * Getter grandTotalCal
   * @return {number }
   */
  public get grandTotalCal(): number {
    return this._grandTotalCal;
  }

  /**
   * Setter grandTotalCal
   * @param {number } value
   */
  public set grandTotalCal(value: number) {
    this._grandTotalCal = value;
  }

  /**
   * Getter paymentTotal
   * @return {number }
   */
  public get paymentTotal(): number {
    return this._paymentTotal;
  }

  /**
   * Setter paymentTotal
   * @param {number } value
   */
  public set paymentTotal(value: number) {
    this._paymentTotal = value;
  }

  /**
   * Getter firstCash
   * @return {number }
   */
  public get firstCash(): number {
    return this._firstCash;
  }

  /**
   * Setter firstCash
   * @param {number } value
   */
  public set firstCash(value: number) {
    this._firstCash = value;
  }
}
