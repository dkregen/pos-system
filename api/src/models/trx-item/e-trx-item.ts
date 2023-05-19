import { Entity } from "../../@cores/entity";
import { MTrxItem } from "./m-trx-item";

export class ETrxItem extends Entity {

  constructor() {
    super();
  }

  private _status: string = "";
  private _idItem: string = "";
  private _idInvoice: string = "";
  private _itemCode: string = "";
  private _itemName: string = "";
  private _price: string = "";
  private _qty: string = "";
  private _discItem: string = "";
  private _productType: number = MTrxItem.TYPE_PRODUCT;

  /**
   * Getter status
   * @return {string }
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Getter idItem
   * @return {string }
   */
  public get idItem(): string {
    return this._idItem;
  }

  /**
   * Getter idInvoice
   * @return {string }
   */
  public get idInvoice(): string {
    return this._idInvoice;
  }

  /**
   * Getter price
   * @return {string }
   */
  public get price(): string {
    return this._price;
  }

  /**
   * Getter qty
   * @return {string }
   */
  public get qty(): string {
    return this._qty;
  }

  /**
   * Getter discItem
   * @return {string }
   */
  public get discItem(): string {
    return this._discItem;
  }

  /**
   * Setter status
   * @param {string } value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Setter idItem
   * @param {string } value
   */
  public set idItem(value: string) {
    this._idItem = value;
  }

  /**
   * Setter idInvoice
   * @param {string } value
   */
  public set idInvoice(value: string) {
    this._idInvoice = value;
  }

  /**
   * Setter price
   * @param {string } value
   */
  public set price(value: string) {
    this._price = value;
  }

  /**
   * Setter qty
   * @param {string } value
   */
  public set qty(value: string) {
    this._qty = value;
  }

  /**
   * Setter discItem
   * @param {string } value
   */
  public set discItem(value: string) {
    this._discItem = value;
  }

  /**
   * Getter itemCode
   * @return {string }
   */
  public get itemCode(): string {
    return this._itemCode;
  }

  /**
   * Getter itemName
   * @return {string }
   */
  public get itemName(): string {
    return this._itemName;
  }

  /**
   * Setter itemCode
   * @param {string } value
   */
  public set itemCode(value: string) {
    this._itemCode = value;
  }

  /**
   * Setter itemName
   * @param {string } value
   */
  public set itemName(value: string) {
    this._itemName = value;
  }

  /**
   * Getter productType
   * @return {number }
   */
  public get productType(): number {
    return this._productType;
  }

  /**
   * Setter productType
   * @param {number } value
   */
  public set productType(value: number) {
    this._productType = value;
  }

}