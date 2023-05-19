import { Entity } from '../@core/entity'
import * as Moment from 'moment'

export class EReportTransaction extends Entity {
  constructor() {
    super()
  }

  private _invoice: string = ''
  private _contact: string = ''
  private _amount: number = 0
  private _arap: number = 0
  private _discount: number = 0
  private _date: Moment.Moment = null
  private _taxIncluded: number = 0
  private _shortCost: number = 0
  private _cash: number = 0
  private _status: number = 1

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

  /**
   * Getter invoice
   * @return {string }
   */
  public get invoice(): string {
    return this._invoice
  }

  public get nettWorth(): number {
    return this.amount - (this.taxIncluded + this.shortCost + this.discount)
  }

  /**
   * Getter contact
   * @return {string }
   */
  public get contact(): string {
    return this._contact
  }

  /**
   * Setter invoice
   * @param {string } value
   */
  public set invoice(value: string) {
    this._invoice = value
  }

  /**
   * Setter contact
   * @param {string } value
   */
  public set contact(value: string) {
    this._contact = value
  }

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

  /**
   * Getter amount
   * @return {number }
   */
  public get amount(): number {
    return this._amount
  }

  /**
   * Getter arap
   * @return {number }
   */
  public get arap(): number {
    return this._arap
  }

  /**
   * Getter discount
   * @return {number }
   */
  public get discount(): number {
    return this._discount
  }

  /**
   * Getter taxIncluded
   * @return {number }
   */
  public get taxIncluded(): number {
    return this._taxIncluded
  }

  /**
   * Getter shortCost
   * @return {number }
   */
  public get shortCost(): number {
    return this._shortCost
  }

  /**
   * Setter amount
   * @param {number } value
   */
  public set amount(value: number) {
    this._amount = value
  }

  /**
   * Setter arap
   * @param {number } value
   */
  public set arap(value: number) {
    this._arap = value
  }

  /**
   * Setter discount
   * @param {number } value
   */
  public set discount(value: number) {
    this._discount = value
  }

  /**
   * Setter taxIncluded
   * @param {number } value
   */
  public set taxIncluded(value: number) {
    this._taxIncluded = value
  }

  /**
   * Setter shortCost
   * @param {number } value
   */
  public set shortCost(value: number) {
    this._shortCost = value
  }

}
