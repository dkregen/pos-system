import { Entity } from '../@core/entity'

export class EReportStock extends Entity {
  public readonly NAMES = {
    id: 0,
    name: 1,
    stock: 2,
    unit: 3,
  }
  public objects: Array<any> = ['id', 'name', 'stock', 'unit']

  private _name: string

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value
  }

  private _stock: number

  /**
   * Getter stock
   * @return {number}
   */
  public get stock(): number {
    return this._stock
  }

  /**
   * Setter stock
   * @param {number} value
   */
  public set stock(value: number) {
    this._stock = value
  }

  private _unit: string = ''

  /**
   * Getter unit
   * @return {string }
   */
  public get unit(): string {
    return this._unit
  }

  /**
   * Setter unit
   * @param {string } value
   */
  public set unit(value: string) {
    this._unit = value
  }
}
