import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'

export class EContact extends Entity {
  public readonly NAMES = {
    id: 0,
    name: 1,
    phone: 2,
    company: 3,
    tlp: 4,
    ktp: 5,
  }
  public objects: Array<any> = ['id', 'name', 'phone', 'company', 'tlp', 'ktp']

  constructor() {
    super()
  }

  private _name: string = ''

  /**
   * Getter name
   * @return {String }
   */
  public get name(): string {
    return this._name
  }

  /**
   * Setter name
   * @param {String } value
   */
  public set name(value: string) {
    this._name = value
  }

  private _phone: string = ''

  /**
   * Getter phone
   * @return {string }
   */
  public get phone(): string {
    return this._phone
  }

  /**
   * Setter phone
   * @param {string } value
   */
  public set phone(value: string) {
    this._phone = value
  }

  private _company: string = ''

  /**
   * Getter company
   * @return {string }
   */
  public get company(): string {
    return this._company
  }

  /**
   * Setter company
   * @param {string } value
   */
  public set company(value: string) {
    this._company = value
  }

  private _tlp: string = ''

  /**
   * Getter tlp
   * @return {string }
   */
  public get tlp(): string {
    return this._tlp
  }

  /**
   * Setter tlp
   * @param {string } value
   */
  public set tlp(value: string) {
    this._tlp = value
  }

  private _ktp: string = ''

  /**
   * Getter ktp
   * @return {string }
   */
  public get ktp(): string {
    return this._ktp
  }

  /**
   * Setter ktp
   * @param {string } value
   */
  public set ktp(value: string) {
    this._ktp = value
  }

  public checkForm(): EAlert {
    return null
  }
}
