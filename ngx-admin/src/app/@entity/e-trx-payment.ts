import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'

export class ETrxPayment extends Entity {
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
    grandTotalCal: 23,
  }
  public objects: Array<any> = [
    'id',
    'status',
    'invoiceId',
    'paymentBeforeId',
    'discItemTotal',
    'discGlobalTotal',
    'taxTotal',
    'prTotal',
    'cash',
    'returnCash',
    'discGlobalPercent',
    'taxPercent',
    'discGlobalState',
    'taxState',
    'prState',
    'cashState',
    'discTotalCal',
    'taxTotalCal',
    'prTotalCal',
    'cashTotalCal',
    'cashBeforeTotalCal',
    'date',
    'priceTotal',
    'grandTotalCal',
  ]
  public prFirst: number = 0
  /**
   * Setter prTotal
   * @param {number } value
   */
  private firstPr: boolean = true
  /**
   * Setter cash
   * @param {number } value
   */
  private cashIsFirst = true

  constructor() {
    super()
  }

  private _status: number = 0

  /**
   * Getter status
   * @return {number }
   */
  public get status(): number {
    return this._status
  }

  /**
   * Setter status
   * @param {number } value
   */
  public set status(value: number) {
    this._status = value
  }

  private _invoiceId: string = ''

  /**
   * Getter invoiceId
   * @return {string }
   */
  public get invoiceId(): string {
    return this._invoiceId
  }

  /**
   * Setter invoiceId
   * @param {string } value
   */
  public set invoiceId(value: string) {
    this._invoiceId = value
  }

  private _paymentBeforeId: string = ''

  /**
   * Getter paymentBeforeId
   * @return {string }
   */
  public get paymentBeforeId(): string {
    return this._paymentBeforeId
  }

  /**
   * Setter paymentBeforeId
   * @param {string } value
   */
  public set paymentBeforeId(value: string) {
    this._paymentBeforeId = value
  }

  private _discItemTotal: number = 0

  /**
   * Getter discItemTotal
   * @return {number }
   */
  public get discItemTotal(): number {
    return this._discItemTotal
  }

  /**
   * Setter discItemTotal
   * @param {number } value
   */
  public set discItemTotal(value: number) {
    this._discItemTotal = value
  }

  private _discGlobalTotal: number = 0

  /**
   * Getter discGlobalTotal
   * @return {number }
   */
  public get discGlobalTotal(): number {
    return this._discGlobalTotal
  }

  /**
   * Setter discGlobalTotal
   * @param {number } value
   */
  public set discGlobalTotal(value: number) {
    this._discGlobalTotal = value
  }

  private _taxTotal: number = 0

  /**
   * Getter taxTotal
   * @return {number }
   */
  public get taxTotal(): number {
    return this._taxTotal
  }

  /**
   * Setter taxTotal
   * @param {number } value
   */
  public set taxTotal(value: number) {
    this._taxTotal = value
    if (this._taxState > 0) {
      this._taxTotalCal = value
    }
  }

  private _prTotal: number = 0

  /**
   * Getter prTotal
   * @return {number }
   */
  public get prTotal(): number {
    return this._prTotal
  }

  public set prTotal(value: number) {
    this._prTotal = value
    this.calculateTotalPayment()
    if (this.firstPr) {
      this.prFirst = value
      this.firstPr = false
    }
  }

  private _cash: number = 0

  /**
   * Getter cash
   * @return {number }
   */
  public get cash(): number {
    return this._cash
  }

  public set cash(value: number) {
    this._cash = value
    if (this.cashIsFirst) {
      this.firstCash = value
      this.cashIsFirst = false
    }
    this.calculateTotalPayment()
  }

  private _firstCash: number = 0

  /**
   * Getter firstCash
   * @return {number }
   */
  public get firstCash(): number {
    return this._firstCash
  }

  /**
   * Setter firstCash
   * @param {number } value
   */
  public set firstCash(value: number) {
    this._firstCash = value
  }

  private _returnCash: number = 0

  /**
   * Getter returnCash
   * @return {number }
   */
  public get returnCash(): number {
    return this._returnCash
  }

  /**
   * Setter returnCash
   * @param {number } value
   */
  public set returnCash(value: number) {
    this._returnCash = value
  }

  private _discGlobalPercent: number = 0

  /**
   * Getter discGlobalPercent
   * @return {number }
   */
  public get discGlobalPercent(): number {
    return this._discGlobalPercent
  }

  /**
   * Setter discGlobalPercent
   * @param {number } value
   */
  public set discGlobalPercent(value: number) {
    this._discGlobalPercent = value
  }

  private _taxPercent: number = 10

  /**
   * Getter taxPercent
   * @return {number }
   */
  public get taxPercent(): number {
    return this._taxPercent
  }

  /**
   * Setter taxPercent
   * @param {number } value
   */
  public set taxPercent(value: number) {
    this._taxPercent = value
  }

  private _discGlobalState: number = 0

  /**
   * Getter discGlobalState
   * @return {number }
   */
  public get discGlobalState(): number {
    return this._discGlobalState
  }

  /**
   * Setter discGlobalState
   * @param {number } value
   */
  public set discGlobalState(value: number) {
    this._discGlobalState = value
  }

  private _taxState: number = 0

  /**
   * Getter taxState
   * @return {number }
   */
  public get taxState(): number {
    return this._taxState
  }

  /**
   * Setter taxState
   * @param {number } value
   */
  public set taxState(value: number) {
    this._taxState = value
  }

  private _prState: number = 0

  /**
   * Getter prState
   * @return {number }
   */
  public get prState(): number {
    return this._prState
  }

  /**
   * Setter prState
   * @param {number } value
   */
  public set prState(value: number) {
    this._prState = value
    this.calculateTotalPayment()
  }

  private _cashState: number = 1

  /**
   * Getter cashState
   * @return {number }
   */
  public get cashState(): number {
    return this._cashState
  }

  /**
   * Setter cashState
   * @param {number } value
   */
  public set cashState(value: number) {
    this._cashState = value
    this.calculateTotalPayment()
  }

  private _discTotalCal: number = 0

  /**
   * Getter discTotalCal
   * @return {number }
   */
  public get discTotalCal(): number {
    return this._discTotalCal
  }

  /**
   * Setter discTotalCal
   * @param {number } value
   */
  public set discTotalCal(value: number) {
    this._discTotalCal = value
  }

  private _taxTotalCal: number = 0

  /**
   * Getter taxTotalCal
   * @return {number }
   */
  public get taxTotalCal(): number {
    return this._taxTotalCal
  }

  /**
   * Setter taxTotalCal
   * @param {number } value
   */
  public set taxTotalCal(value: number) {
    this._taxTotalCal = value
  }

  private _prTotalCal: number = 0

  /**
   * Getter prTotalCal
   * @return {number }
   */
  public get prTotalCal(): number {
    return this._prTotalCal
  }

  /**
   * Setter prTotalCal
   * @param {number } value
   */
  public set prTotalCal(value: number) {
    this._prTotalCal = value
  }

  private _cashTotalCal: number = 0

  /**
   * Getter cashTotalCal
   * @return {number }
   */
  public get cashTotalCal(): number {
    return this._cashTotalCal
  }

  /**
   * Setter cashTotalCal
   * @param {number } value
   */
  public set cashTotalCal(value: number) {
    this._cashTotalCal = value
  }

  private _cashBeforeTotalCal: number = 0

  /**
   * Getter cashBeforeTotalCal
   * @return {number }
   */
  public get cashBeforeTotalCal(): number {
    return this._cashBeforeTotalCal
  }

  /**
   * Setter cashBeforeTotalCal
   * @param {number } value
   */
  public set cashBeforeTotalCal(value: number) {
    this._cashBeforeTotalCal = value
  }

  private _date: string = ''

  /**
   * Getter date
   * @return {string }
   */
  public get date(): string {
    return this._date
  }

  /**
   * Setter date
   * @param {string } value
   */
  public set date(value: string) {
    this._date = value
  }

  private _priceTotal: number = 0

  /**
   * Getter priceTotal
   * @return {number }
   */
  public get priceTotal(): number {
    return this._priceTotal
  }

  /**
   * Setter priceTotal
   * @param {number } value
   */
  public set priceTotal(value: number) {
    this._priceTotal = value
  }

  private _grandTotalCal: number = 0

  /**
   * Getter grandTotalCal
   * @return {number }
   */
  public get grandTotalCal(): number {
    return this._grandTotalCal
  }

  /**
   * Setter grandTotalCal
   * @param {number } value
   */
  public set grandTotalCal(value: number) {
    this._grandTotalCal = value
  }

  private _paymentTotal: number = 0

  /**
   * Getter paymentTotal
   * @return {number }
   */
  public get paymentTotal(): number {
    return this._paymentTotal
  }

  /**
   * Setter paymentTotal
   * @param {number } value
   */
  public set paymentTotal(value: number) {
    this._paymentTotal = value
  }

  public checkForm(): EAlert {
    return null
  }

  public calculateTotalPayment() {
    this._paymentTotal = 0
    if (this._prState > 0) {
      this._paymentTotal += this._prTotal
    }
    if (this._cashState > 0) {
      this._paymentTotal += this._cash
    }
  }
}
