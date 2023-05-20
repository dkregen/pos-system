import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'
import { EUnit } from './e-unit'

export class ETrxItem extends Entity {

  public readonly TYPE_PRODUCT = 0
  public readonly TYPE_SERVICE = 1
  public readonly TYPE_COMPLIMIENT = 2
  public readonly NAMES = {
    id: 0,
    status: 1,
    itemId: 2,
    invoiceId: 3,
    code: 4,
    name: 5,
    qty: 6,
    itemDisc: 7,
    type: 8,
    oldStock: 9,
    newStock: 10,
    unit: 11,
    price: 12,
  }
  public objects: Array<any> = [
    'id',
    'status',
    'itemId',
    'invoiceId',
    'code',
    'name',
    'qty',
    'itemDisc',
    'type',
    'oldStock',
    'newStock',
    'price',
    { name: 'unit', o: EUnit },
  ]
  /**
   * Setter price
   * @param {number } value
   */
  private isFirstPrice: boolean = true

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

  private _itemId: string = ''

  /**
   * Getter itemId
   * @return {string }
   */
  public get itemId(): string {
    return this._itemId
  }

  /**
   * Setter itemId
   * @param {string } value
   */
  public set itemId(value: string) {
    this._itemId = value
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

  private _name: string = ''

  /**
   * Getter name
   * @return {string }
   */
  public get name(): string {
    return this._name
  }

  /**
   * Setter name
   * @param {string } value
   */
  public set name(value: string) {
    this._name = value
  }

  private _priceMirror: number = 0

  /**
   * Getter priceMirror
   * @return {number }
   */
  public get priceMirror(): number {
    return this._priceMirror
  }

  /**
   * Setter priceMirror
   * @param {number } value
   */
  public set priceMirror(value: number) {
    this._priceMirror = value
  }

  private _qty: number = 0

  /**
   * Getter qty
   * @return {number }
   */
  public get qty(): number {
    return this._qty
  }

  /**
   * Setter qty
   * @param {number } value
   */
  public set qty(value: number) {
    this._qty = (!isNaN(value) ? value : 0)
  }

  private _itemDisc: number = 0

  /**
   * Getter itemDisc
   * @return {number }
   */
  public get itemDisc(): number {
    return this._itemDisc
  }

  /**
   * Setter itemDisc
   * @param {number } value
   */
  public set itemDisc(value: number) {
    if (!isNaN(value)) {
      this._price = (this._priceMirror - value)
      this._itemDisc = (value > 0 ? value : 0)
    }
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

  private _oldStock: number = 0

  /**
   * Getter oldStock
   * @return {number }
   */
  public get oldStock(): number {
    return this._oldStock
  }

  /**
   * Setter oldStock
   * @param {number } value
   */
  public set oldStock(value: number) {
    this._oldStock = value
  }

  private _newStock: number = 0

  /**
   * Getter newStock
   * @return {number }
   */
  public get newStock(): number {
    return this._newStock
  }

  /**
   * Setter newStock
   * @param {number } value
   */
  public set newStock(value: number) {
    this._newStock = value
  }

  private _price: number = 0

  /**
   * Getter price
   * @return {number }
   */
  public get price(): number {
    return this._price
  }

  public set price(value: number) {
    this._price = value
    if (this.isFirstPrice) {
      this.isFirstPrice = false
      this._priceMirror = value + (this._itemDisc * this._qty)
    }
  }

  private _unit: EUnit = new EUnit()

  /**
   * Getter unit
   * @return {EUnit }
   */
  public get unit(): EUnit {
    return this._unit
  }

  /**
   * Setter unit
   * @param {EUnit } value
   */
  public set unit(value: EUnit) {
    this._unit = value
  }

  public get priceCal(): number {
    return this._price
  }

  public set priceCal(value: number) {
    var price = this._priceMirror
    this.itemDisc = price - value
  }

  public get itemDiscPercent(): number {
    return this.itemDisc / (this._priceMirror) * 100
  }

  public set itemDiscPercent(value: number) {
    if (!isNaN(value)) {
      var price = this._priceMirror
      this.itemDisc = price * value / 100
    }
  }

  public get subTotal() {
    return this._price * (!isNaN(this._qty) ? this._qty : 0)
  }

  public set subTotal(value: number) {
    var div = value / (!isNaN(this._qty) ? this._qty : 0)
    this.priceCal = div
    console.log(this)
  }

  public get newStockAdjustment(): number {
    return this._newStock
  }

  public set newStockAdjustment(value: number) {
    console.log('stockAdjustment', value)
    this._newStock = value
  }

  public get qtyAdjustment(): number {
    return this._qty
  }

  public set qtyAdjustment(value: number) {
    console.log('qtyAdjustment', value)
    this._qty = value
  }

  public checkForm(): EAlert {
    return null
  }

}
