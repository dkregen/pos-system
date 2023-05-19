import { Entity } from "../@core/entity";
import { EAlert } from "./e-alert";
import { Msg } from "../@config/toastr.config";
import { EFile } from "./e-file";
import { EUnit } from "./e-unit";
import { EUser } from "./e-user";

export class EItem extends Entity {
  constructor() {
    super();
  }

  private _status: string = "1";
  private _unitId: string = "";
  private _creatorId: string = "";
  private _pictId: string = "";
  private _name: string = "";
  private _userId: string = "";
  private _priceBuy: number = 0;
  private _priceSell: number = 0;
  private _barcode: string = "";
  private _upNominal: number = 0;
  private _upPercent: number = 0;
  private _priceType: number = 0;
  private _image: EFile = new EFile();
  private _unit: EUnit = new EUnit();
  private _user: EUser = new EUser();

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
    user: 15
  }

  public objects: Array<any> = [
    "id",
    "status",
    "unitId",
    "creatorId",
    "pictId",
    "name",
    "userId",
    "priceBuy",
    "priceSell",
    "barcode",
    "upNominal",
    "upPercent",
    "priceType",
    { name: "image", o: EFile },
    { name: "unit", o: EUnit },
    { name: "user", o: EUser }
  ];

  public readonly PRICE_TYPE_MARKUP_PERCENT: number = 0;
  public readonly PRICE_TYPE_MARKUP_NOMINAL: number = 1;
  public readonly PRICE_TYPE_FIX: number = 2;
  public getTextOfPriceType(n: number) {
    let arr = {
      0: "Markup Persen",
      1: "Markup Nominal",
      2: "Harga Tetap"
    }

    return arr[n];
  }

  public checkForm(): EAlert {
    if(!this.barcode) {
      return Msg.error("", "Code tidak boleh dikosongkan!");
    }

    if(!this.name) {
      return Msg.error("", "Nama tidak boleh kosong!");
    }

    if(!this.unitId) {
      return Msg.error("", "Lengkapi satuan produk terlebih dahulu!");
    }

    return null;
  }

  /**
   * Getter status
   * @return {string }
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Getter unitId
   * @return {string }
   */
  public get unitId(): string {
    return this._unitId;
  }

  /**
   * Getter creatorId
   * @return {string }
   */
  public get creatorId(): string {
    return this._creatorId;
  }

  /**
   * Getter pictId
   * @return {string }
   */
  public get pictId(): string {
    return this._pictId;
  }

  /**
   * Getter name
   * @return {string }
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter barcode
   * @return {string }
   */
  public get barcode(): string {
    return this._barcode;
  }

  /**
   * Setter barcode
   * @param {string } value
   */
  public set barcode(value: string) {
    this._barcode = value;
  }

  /**
   * Getter priceBuy
   * @return {number }
   */
  public get priceBuy(): number {
    return this._priceBuy;
  }

  /**
   * Getter priceSell
   * @return {number }
   */
  public get priceSell(): number {
    return this._priceSell;
  }

  /**
   * Getter image
   * @return {EFile }
   */
  public get image(): EFile {
    return this._image;
  }

  /**
   * Getter unit
   * @return {EUnit }
   */
  public get unit(): EUnit {
    return this._unit;
  }

  /**
   * Setter status
   * @param {string } value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Setter unitId
   * @param {string } value
   */
  public set unitId(value: string) {
    this._unitId = value;
  }

  /**
   * Setter creatorId
   * @param {string } value
   */
  public set creatorId(value: string) {
    this._creatorId = value;
  }

  /**
   * Setter pictId
   * @param {string } value
   */
  public set pictId(value: string) {
    this._pictId = value;
  }

  /**
   * Setter name
   * @param {string } value
   */
  public set name(value: string) {
    this._name = (!value ? "" : value);
  }

  /**
   * Setter priceBuy
   * @param {number } value
   */
  public set priceBuy(value: number) {
    this._priceBuy = value;
  }

  /**
   * Setter priceSell
   * @param {number } value
   */
  public set priceSell(value: number) {
    this._priceSell = value;
  }

  /**
   * Setter image
   * @param {EFile } value
   */
  public set image(value: EFile) {
    this._image = value;
  }

  /**
   * Setter unit
   * @param {EUnit } value
   */
  public set unit(value: EUnit) {
    this._unit = value;
  }

  /**
   * Getter userId
   * @return {string }
   */
  public get userId(): string {
    return this._userId;
  }

  /**
   * Setter userId
   * @param {string } value
   */
  public set userId(value: string) {
    this._userId = value;
  }

  /**
   * Getter user
   * @return {EUser }
   */
  public get user(): EUser {
    return this._user;
  }

  /**
   * Setter user
   * @param {EUser } value
   */
  public set user(value: EUser) {
    this._user = value;
  }

  /**
   * Getter upNominal
   * @return {number }
   */
  public get upNominal(): number {
    return this._upNominal;
  }

  /**
   * Getter upPercent
   * @return {number }
   */
  public get upPercent(): number {
    return this._upPercent;
  }

  /**
   * Setter upNominal
   * @param {number } value
   */
  public set upNominal(value: number) {
    this._upNominal = value;
  }

  /**
   * Setter upPercent
   * @param {number } value
   */
  public set upPercent(value: number) {
    this._upPercent = value;
  }

  /**
   * Getter priceType
   * @return {number }
   */
  public get priceType(): number {
    return this._priceType;
  }

  /**
   * Setter priceType
   * @param {number } value
   */
  public set priceType(value: number) {
    this._priceType = value;
  }

}