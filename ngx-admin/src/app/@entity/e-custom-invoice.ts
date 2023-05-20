import { Entity } from '../@core/entity'

export class ECustomInvoice extends Entity {
  public readonly NAMES = {
    id: 0,
    code: 1,
    contact: 2,
    amount: 3,
  }
  public objects: Array<any> = [
    'id',
    'code',
    'contact',
    'amount',
  ]

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

  private _contact: string = ''

  /**
   * Getter contact
   * @return {string }
   */
  public get contact(): string {
    return this._contact
  }

  /**
   * Setter contact
   * @param {string } value
   */
  public set contact(value: string) {
    this._contact = value
  }

  private _amount: number = 0

  /**
   * Getter amount
   * @return {number }
   */
  public get amount(): number {
    return this._amount
  }

  /**
   * Setter amount
   * @param {number } value
   */
  public set amount(value: number) {
    this._amount = value
  }

}
