import { Entity } from '../@core/entity'
import * as Moment from 'moment'

export class EReportTransaction extends Entity {
  public readonly NAMES = {
    id: 0,
    invoice: 1,
    contact: 2,
    amount: 3,
    arap: 4,
    discount: 5,
    date: 6,
    taxIncluded: 7,
    shortCost: 8,
    cash: 9,
    status: 10,
  }
  public objects: Array<any> = [
    'id',
    'invoice',
    'contact',
    'amount',
    'arap',
    'discount',
    'date',
    'taxIncluded',
    'shortCost',
    'cash',
    'status',
  ]

  constructor() {
    super()
  }

  private _invoice: string = ''

  /**
   * Getter invoice
   * @return {string }
   */
  public get invoice(): string {
    return this._invoice
  }

  /**
   * Setter invoice
   * @param {string } value
   */
  public set invoice(value: string) {
    this._invoice = value
  }

  private _contact: string = ''

  /**
   * Getter contact
   * @return {string }
   */
  public get contact(): string {
    return this._contact
  }

  /**
   * Setter contact
   * @param {string } value
   */
  public set contact(value: string) {
    this._contact = value
  }

  private _amount: number = 0

  /**
   * Getter amount
   * @return {number }
   */
  public get amount(): number {
    return this._amount
  }

  /**
   * Setter amount
   * @param {number } value
   */
  public set amount(value: number) {
    this._amount = value
  }

  private _arap: number = 0

  /**
   * Getter arap
   * @return {number }
   */
  public get arap(): number {
    return this._arap
  }

  /**
   * Setter arap
   * @param {number } value
   */
  public set arap(value: number) {
    this._arap = value
  }

  private _discount: number = 0

  /**
   * Getter discount
   * @return {number }
   */
  public get discount(): number {
    return this._discount
  }

  /**
   * Setter discount
   * @param {number } value
   */
  public set discount(value: number) {
    this._discount = value
  }

  private _date: Moment.Moment = null

  /**
   * Getter date
   * @return {string }
   */
  public get date(): string {
    return this._date.format(Entity.MOMENT_PATTERN_DATE_HUMAN)
  }

  /**
   * Setter date
   * @param {string } value
   */
  public set date(value: string) {
    this._date = Entity.toMoment(value)
  }

  private _taxIncluded: number = 0

  /**
   * Getter taxIncluded
   * @return {number }
   */
  public get taxIncluded(): number {
    return this._taxIncluded
  }

  /**
   * Setter taxIncluded
   * @param {number } value
   */
  public set taxIncluded(value: number) {
    this._taxIncluded = value
  }

  private _shortCost: number = 0

  /**
   * Getter shortCost
   * @return {number }
   */
  public get shortCost(): number {
    return this._shortCost
  }

  /**
   * Setter shortCost
   * @param {number } value
   */
  public set shortCost(value: number) {
    this._shortCost = value
  }

  private _cash: number = 0

  /**
   * Getter cash
   * @return {number }
   */
  public get cash(): number {
    return this._cash
  }

  /**
   * Setter cash
   * @param {number } value
   */
  public set cash(value: number) {
    this._cash = value
  }

  private _status: number = 1

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

  public get nettWorth(): number {
    return this.amount - (this.taxIncluded + this.shortCost + this.discount)
  }

}
