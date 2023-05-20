import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'
import { Msg } from '../@config/toastr.config'
import { EFile } from './e-file'
import { EUnit } from './e-unit'
import { EUser } from './e-user'

export class EItem extends Entity {
  public readonly NAMES = {
    id: 0,
    status: 1,
    unitId: 2,
    creatorId: 3,
    pictId: 4,
    name: 5,
    userId: 6,
    priceBuy: 7,
    priceSell: 8,
    barcode: 9,
    upNominal: 10,
    upPercent: 11,
    priceType: 12,
    image: 13,
    unit: 14,
    user: 15,
  }
  public objects: Array<any> = [
    'id',
    'status',
    'unitId',
    'creatorId',
    'pictId',
    'name',
    'userId',
    'priceBuy',
    'priceSell',
    'barcode',
    'upNominal',
    'upPercent',
    'priceType',
    { name: 'image', o: EFile },
    { name: 'unit', o: EUnit },
    { name: 'user', o: EUser },
  ]
  public readonly PRICE_TYPE_MARKUP_PERCENT: number = 0
  public readonly PRICE_TYPE_MARKUP_NOMINAL: number = 1
  public readonly PRICE_TYPE_FIX: number = 2

  constructor() {
    super()
  }

  private _status: string = '1'

  /**
   * Getter status
   * @return {string }
   */
  public get status(): string {
    return this._status
  }

  /**
   * Setter status
   * @param {string } value
   */
  public set status(value: string) {
    this._status = value
  }

  private _unitId: string = ''

  /**
   * Getter unitId
   * @return {string }
   */
  public get unitId(): string {
    return this._unitId
  }

  /**
   * Setter unitId
   * @param {string } value
   */
  public set unitId(value: string) {
    this._unitId = value
  }

  private _creatorId: string = ''

  /**
   * Getter creatorId
   * @return {string }
   */
  public get creatorId(): string {
    return this._creatorId
  }

  /**
   * Setter creatorId
   * @param {string } value
   */
  public set creatorId(value: string) {
    this._creatorId = value
  }

  private _pictId: string = ''

  /**
   * Getter pictId
   * @return {string }
   */
  public get pictId(): string {
    return this._pictId
  }

  /**
   * Setter pictId
   * @param {string } value
   */
  public set pictId(value: string) {
    this._pictId = value
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
    this._name = (!value ? '' : value)
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

  private _priceBuy: number = 0

  /**
   * Getter priceBuy
   * @return {number }
   */
  public get priceBuy(): number {
    return this._priceBuy
  }

  /**
   * Setter priceBuy
   * @param {number } value
   */
  public set priceBuy(value: number) {
    this._priceBuy = value
  }

  private _priceSell: number = 0

  /**
   * Getter priceSell
   * @return {number }
   */
  public get priceSell(): number {
    return this._priceSell
  }

  /**
   * Setter priceSell
   * @param {number } value
   */
  public set priceSell(value: number) {
    this._priceSell = value
  }

  private _barcode: string = ''

  /**
   * Getter barcode
   * @return {string }
   */
  public get barcode(): string {
    return this._barcode
  }

  /**
   * Setter barcode
   * @param {string } value
   */
  public set barcode(value: string) {
    this._barcode = value
  }

  private _upNominal: number = 0

  /**
   * Getter upNominal
   * @return {number }
   */
  public get upNominal(): number {
    return this._upNominal
  }

  /**
   * Setter upNominal
   * @param {number } value
   */
  public set upNominal(value: number) {
    this._upNominal = value
  }

  private _upPercent: number = 0

  /**
   * Getter upPercent
   * @return {number }
   */
  public get upPercent(): number {
    return this._upPercent
  }

  /**
   * Setter upPercent
   * @param {number } value
   */
  public set upPercent(value: number) {
    this._upPercent = value
  }

  private _priceType: number = 0

  /**
   * Getter priceType
   * @return {number }
   */
  public get priceType(): number {
    return this._priceType
  }

  /**
   * Setter priceType
   * @param {number } value
   */
  public set priceType(value: number) {
    this._priceType = value
  }

  private _image: EFile = new EFile()

  /**
   * Getter image
   * @return {EFile }
   */
  public get image(): EFile {
    return this._image
  }

  /**
   * Setter image
   * @param {EFile } value
   */
  public set image(value: EFile) {
    this._image = value
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

  private _user: EUser = new EUser()

  /**
   * Getter user
   * @return {EUser }
   */
  public get user(): EUser {
    return this._user
  }

  /**
   * Setter user
   * @param {EUser } value
   */
  public set user(value: EUser) {
    this._user = value
  }

  public getTextOfPriceType(n: number) {
    const arr = {
      0: 'Markup Persen',
      1: 'Markup Nominal',
      2: 'Harga Tetap',
    }

    return arr[ n ]
  }

  public checkForm(): EAlert {
    if (!this.barcode) {
      return Msg.error('', 'Code tidak boleh dikosongkan!')
    }

    if (!this.name) {
      return Msg.error('', 'Nama tidak boleh kosong!')
    }

    if (!this.unitId) {
      return Msg.error('', 'Lengkapi satuan produk terlebih dahulu!')
    }

    return null
  }

}
