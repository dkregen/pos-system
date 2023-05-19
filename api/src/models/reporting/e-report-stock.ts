import { Entity } from "../../@cores/entity";

export class EReportStock extends Entity {
  constructor() {
    super();
  }

  private _name: string = "";
  private _stock: number = 0;
  private _unit: string = "";

  /**
   * Getter unit
   * @return {string }
   */
  public get unit(): string {
    return this._unit;
  }

  /**
   * Setter unit
   * @param {string } value
   */
  public set unit(value: string) {
    this._unit = value;
  }

  /**
   * Getter name
   * @return {string }
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter stock
   * @return {number }
   */
  public get stock(): number {
    return this._stock;
  }

  /**
   * Setter name
   * @param {string } value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter stock
   * @param {number } value
   */
  public set stock(value: number) {
    this._stock = value;
  }
}
