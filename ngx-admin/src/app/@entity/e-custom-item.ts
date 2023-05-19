import { Entity } from "../@core/entity";
import { EAlert } from "./e-alert";

export class ECustomItem extends Entity {
  private _code: string = "";
  private _name: string = "";
  private _price: number = 0;
  private _type: number = 0;
  private _stock: number = 0;

  public static readonly TYPE_PRODUCT = 0;
  public static readonly TYPE_SERVICE = 1;
  public static readonly TYPE_COMPLIMENT = 2;

  public readonly NAMES = {
    id: 0,
    code: 1,
    name: 2,
    price: 3,
    type: 4,
    stock: 5
  }

  public objects: Array<any> = [
    "id",
    "code",
    "name",
    "price",
    "type",
    "stock"
  ];

  public checkForm(): EAlert {
    return null;
  }

  /**
   * Getter stock
   * @return {number }
   */
  public get stock(): number {
    return this._stock;
  }

  /**
   * Setter stock
   * @param {number } value
   */
  public set stock(value: number) {
    this._stock = value;
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
   * Getter price
   * @return {number }
   */
  public get price(): number {
    return this._price;
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
   * Setter price
   * @param {number } value
   */
  public set price(value: number) {
    this._price = value;
  }

}