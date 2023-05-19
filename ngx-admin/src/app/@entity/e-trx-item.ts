import { Entity } from "../@core/entity";
import { EAlert } from "./e-alert";
import { formatNumber } from "@angular/common";
import { EUnit } from "./e-unit";

export class ETrxItem extends Entity {

  constructor() {
    super();
  }

  private _status: number = 0;
  private _itemId: string = "";
  private _invoiceId: string = "";
  private _code: string = "";
  private _name: string = "";
  private _priceMirror: number = 0;
  private _qty: number = 0;
  private _itemDisc: number = 0;
  private _type: number = 0;
  private _oldStock: number = 0;
  private _newStock: number = 0;
  private _price: number = 0;
  private _unit: EUnit = new EUnit();

  public readonly TYPE_PRODUCT = 0;
  public readonly TYPE_SERVICE = 1;
  public readonly TYPE_COMPLIMIENT = 2;

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
    price: 12
  };

  public objects: Array<any> = [
    "id",
    "status",
    "itemId",
    "invoiceId",
    "code",
    "name",
    "qty",
    "itemDisc",
    "type",
    "oldStock",
    "newStock",
    "price",
    { name: "unit", o: EUnit }
  ]

  public checkForm(): EAlert {
    return null;
  }

  /**
   * Getter type
   * @return {number }
   */
  public get type(): number {
    return this._type;
  }

  /**
   * Setter type
   * @param {number } value
   */
  public set type(value: number) {
    this._type = value;
  }

  /**
   * Getter code
   * @return {string }
   */
  public get code(): string {
    return this._code;
  }

  /**
   * Getter name
   * @return {string }
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter code
   * @param {string } value
   */
  public set code(value: string) {
    this._code = value;
  }

  /**
   * Setter name
   * @param {string } value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Getter status
   * @return {number }
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Getter itemId
   * @return {string }
   */
  public get itemId(): string {
    return this._itemId;
  }

  /**
   * Getter invoiceId
   * @return {string }
   */
  public get invoiceId(): string {
    return this._invoiceId;
  }

  /**
   * Getter price
   * @return {number }
   */
  public get price(): number {
    return this._price;
  }
  public get priceCal(): number {
    return this._price;
  }

  /**
   * Getter qty
   * @return {number }
   */
  public get qty(): number {
    return this._qty;
  }

  /**
   * Getter itemDisc
   * @return {number }
   */
  public get itemDisc(): number {
    return this._itemDisc;
  }

  public get itemDiscPercent(): number {
    return this.itemDisc / (this._priceMirror) * 100;
  }

  /**
   * Setter status
   * @param {number } value
   */
  public set status(value: number) {
    this._status = value;
  }

  /**
   * Setter itemId
   * @param {string } value
   */
  public set itemId(value: string) {
    this._itemId = value;
  }

  /**
   * Setter invoiceId
   * @param {string } value
   */
  public set invoiceId(value: string) {
    this._invoiceId = value;
  }

  /**
   * Setter price
   * @param {number } value
   */
  private isFirstPrice: boolean = true;
  public set price(value: number) {
    this._price = value;
    if(this.isFirstPrice) {
      this.isFirstPrice = false;
      this._priceMirror = value + (this._itemDisc * this._qty);
    }
  }

  public set priceCal(value: number) {
    var price = this._priceMirror;
    this.itemDisc = price - value;
  }

  /**
   * Setter qty
   * @param {number } value
   */
  public set qty(value: number) {
    this._qty = (!isNaN(value) ? value : 0);
  }

  /**
   * Setter itemDisc
   * @param {number } value
   */
  public set itemDisc(value: number) {
    if (!isNaN(value)) {
      this._price = (this._priceMirror - value);
      this._itemDisc = (value > 0 ? value : 0);
    }
  }

  public set itemDiscPercent(value: number) {
    if (!isNaN(value)) {
      var price = this._priceMirror;
      this.itemDisc = price * value / 100;
    }
  }

  public get subTotal() {
    return this._price * (!isNaN(this._qty) ? this._qty : 0);
  }

  public set subTotal(value: number) {
    var div = value / (!isNaN(this._qty) ? this._qty : 0);
    this.priceCal = div;
    console.log(this)
  }

  /**
   * Getter priceMirror
   * @return {number }
   */
  public get priceMirror(): number {
    return this._priceMirror;
  }

  /**
   * Setter priceMirror
   * @param {number } value
   */
  public set priceMirror(value: number) {
    this._priceMirror = value;
  }

  /**
   * Getter oldStock
   * @return {number }
   */
  public get oldStock(): number {
    return this._oldStock;
  }

  /**
   * Getter newStock
   * @return {number }
   */
  public get newStock(): number {
    return this._newStock;
  }

  /**
   * Setter oldStock
   * @param {number } value
   */
  public set oldStock(value: number) {
    this._oldStock = value;
  }

  /**
   * Setter newStock
   * @param {number } value
   */
  public set newStock(value: number) {
    this._newStock = value;
  }

  /**
   * Getter unit
   * @return {EUnit }
   */
  public get unit(): EUnit {
    return this._unit;
  }

  /**
   * Setter unit
   * @param {EUnit } value
   */
  public set unit(value: EUnit) {
    this._unit = value;
  }

  public set newStockAdjustment(value: number) {
    console.log("stockAdjustment", value);
    this._newStock = value;
  }

  public get newStockAdjustment(): number {
    return this._newStock;
  }

  public set qtyAdjustment(value: number) {
    console.log("qtyAdjustment", value)
    this._qty = value;
  }

  public get qtyAdjustment(): number {
    return this._qty;
  }

}