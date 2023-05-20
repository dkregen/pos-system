import { Entity } from '../@core/entity'
import { ToastType } from 'angular2-toaster/lib/toast'

export class EAlert extends Entity {

  public objects: Array<any> = [
    'header',
    'body',
    'type',
  ]

  constructor() {
    super()
  }

  private _header: string = ''

  /**
   * Getter header
   * @return {string }
   */
  public get header(): string {
    return this._header
  }

  /**
   * Setter header
   * @param {string } value
   */
  public set header(value: string) {
    this._header = value
    if (value) {
      this._title = value
    } else {
      this._title = undefined
    }
  }

  private _title: string = ''

  /**
   * Getter title
   * @return {string }
   */
  public get title(): string {
    return this._title
  }

  /**
   * Setter title
   * @param {string } value
   */
  public set title(value: string) {
    this._title = value
  }

  private _body: string = ''

  /**
   * Getter body
   * @return {string }
   */
  public get body(): string {
    return this._body
  }

  /**
   * Setter body
   * @param {string } value
   */
  public set body(value: string) {
    this._body = value
  }

  private _type: ToastType = 'info'

  /**
   * Getter type
   * @return {string }
   */
  public get type(): ToastType {
    return this._type
  }

  /**
   * Setter type
   * @param {string } value
   */
  public set type(value: ToastType) {
    this._type = value
  }

}
