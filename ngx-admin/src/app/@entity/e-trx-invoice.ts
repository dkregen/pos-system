import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'
import { ETrxItem } from './e-trx-item'
import { ETrxPayment } from './e-trx-payment'
import { EContact } from './e-contact'
import * as Moment from 'moment'
import { EUser } from './e-user'

export class ETrxInvoice extends Entity {

  public static readonly TYPE_SELLING: number = 0
  public static readonly TYPE_RECEIVE: number = 1
  public static readonly TYPE_ADJUSTMENT: number = 2
  public readonly INVOICE_ARAP = 0
  public readonly INVOICE_NON_ARAP = 1
  public readonly NAMES = {
    id: 0,
    status: 1,
    contactId: 2,
    userId: 3,
    datetime: 4,
    code: 5,
    type: 6,
  }
  public objects: Array<any> = [
    'id',
    'status',
    'contactId',
    'userId',
    'datetime',
    'code',
    'type',
    { name: 'products', o: ETrxItem, many: true },
    { name: 'services', o: ETrxItem, many: true },
    { name: 'compliments', o: ETrxItem, many: true },
    { name: 'payment', o: ETrxPayment },
    { name: 'contact', o: EContact },
    { name: 'pic', o: EUser },
  ]
  /**
   * Setter datetime
   * @param {string } value
   */
  public dateNotSaved: boolean = false

  constructor() {
    super()
  }

  get TYPE_SELLING(): number { return ETrxInvoice.TYPE_SELLING }

  get TYPE_RECEIVE(): number { return ETrxInvoice.TYPE_RECEIVE }

  get TYPE_ADJUSTMENT(): number { return ETrxInvoice.TYPE_ADJUSTMENT }

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

  private _contactId: string = ''

  /**
   * Getter contactId
   * @return {string }
   */
  public get contactId(): string {
    return this._contactId
  }

  /**
   * Setter contactId
   * @param {string } value
   */
  public set contactId(value: string) {
    this._contactId = value
  }

  private _userId: string = ''

  /**
   * Getter userId
   * @return {string }
   */
  public get userId(): string {
    return this._userId
  }

  /**
   * Setter userId
   * @param {string } value
   */
  public set userId(value: string) {
    this._userId = value
  }

  private _datetime: Moment.Moment = null

  public get datetime(): any {
    return !this._datetime ? '' : this._datetime.format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
  }

  public set datetime(value: any) {
    this._datetime = Moment(value)
  }

  private _code: string = ''

  /**
   * Getter code
   * @return {string }
   */
  public get code(): string {
    return this._code
  }

  /**
   * Setter code
   * @param {string } value
   */
  public set code(value: string) {
    this._code = value
  }

  private _type: number = 0

  /**
   * Getter type
   * @return {number }
   */
  public get type(): number {
    return this._type
  }

  /**
   * Setter type
   * @param {number } value
   */
  public set type(value: number) {
    this._type = value
  }

  private _products: Array<ETrxItem> = []

  /**
   * Getter products
   * @return {Array<ETrxItem> }
   */
  public get products(): Array<ETrxItem> {
    return this._products
  }

  /**
   * Setter products
   * @param {Array<ETrxItem> } value
   */
  public set products(value: Array<ETrxItem>) {
    this._products = value
  }

  private _compliments: Array<ETrxItem> = []

  /**
   * Getter compliments
   * @return {Array<ETrxItem> }
   */
  public get compliments(): Array<ETrxItem> {
    return this._compliments
  }

  /**
   * Setter compliments
   * @param {Array<ETrxItem> } value
   */
  public set compliments(value: Array<ETrxItem>) {
    this._compliments = value
  }

  private _services: Array<ETrxItem> = []

  /**
   * Getter service
   * @return {Array<ETrxItem> }
   */
  public get services(): Array<ETrxItem> {
    return this._services
  }

  /**
   * Setter service
   * @param {Array<ETrxItem> } value
   */
  public set services(value: Array<ETrxItem>) {
    this._services = value
  }

  private _payment: ETrxPayment = new ETrxPayment()

  /**
   * Getter payment
   * @return {ETrxPayment }
   */
  public get payment(): ETrxPayment {
    return this._payment
  }

  /**
   * Setter payment
   * @param {ETrxPayment } value
   */
  public set payment(value: ETrxPayment) {
    this._payment = value
  }

  private _contact: EContact = new EContact()

  /**
   * Getter contact
   * @return {EContact }
   */
  public get contact(): EContact {
    return this._contact
  }

  /**
   * Setter contact
   * @param {EContact } value
   */
  public set contact(value: EContact) {
    this._contact = value
  }

  private _pic: EUser = new EUser()

  /**
   * Getter pic
   * @return {EUser }
   */
  public get pic(): EUser {
    return this._pic
  }

  /**
   * Setter pic
   * @param {EUser } value
   */
  public set pic(value: EUser) {
    this._pic = value
  }

  /**
   * Getter datetime
   * @return {string }
   */
  public get date(): string {
    return !!this._datetime ? this._datetime.format('DD/MM/YY') : ''
  }

  public set date(value: string) {
    if (value.length == 6 && !isNaN(parseInt(value))) {
      this._datetime = this._datetime ? this._datetime : Moment()
      this._datetime = Moment(value + ' ' + this._datetime.format('HH:mm:ss'), 'DDMMYY HH:mm:ss')
      this.dateNotSaved = false
    } else {
      this.dateNotSaved = (value && value != '')
      if (!this.dateNotSaved) {
        this._datetime = null
      }
    }
  }

  /**
   * Getter datetime
   * @return {string }
   */
  public get time(): string {
    return !!this._datetime ? this._datetime.format('HH:mm') : ''
  }

  /**
   * Setter datetime
   * @param {string } value
   */
  public set time(value: string) {
    this._datetime = this._datetime ? this._datetime : Moment()
    this._datetime = Moment(this._datetime.format('DD/MM/YY') + ' ' + value, 'DD/MM/YY HH:mm:ss')
  }

  public static txtType(num): string {
    switch (num) {
      case 0:
        return 'Penjualan'
      case 1:
        return 'Penerimaan'
      case 2:
        return 'Penyesuaian'
      default:
        return '-'
    }
  }

  public static status(n: number) {
    switch (n) {
      case -1:
        return 'Void'
      case 1:
        return 'Posted'
    }
  }

  public isItemEmpty() {
    return this.products.length == 0 && this.compliments.length == 0 && this.services.length == 0
  }

  public checkForm(): EAlert {
    return null
  }

}
