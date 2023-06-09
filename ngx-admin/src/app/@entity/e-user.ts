import { Entity } from '../@core/entity'
import { EFile } from './e-file'

export class EUser extends Entity {

  public readonly STATUS_INACTIVE = 0
  public readonly STATUS_ACTIVE = 1
  public readonly PRIV_NOPRIVILEGE = -1
  public readonly PRIV_ADMIN = 0
  public readonly PRIV_CASHIER = 1
  public readonly PRIV_MASTER = 2
  public readonly PRIV_OWNER = 3
  public readonly PERM_ALWAYS_ASK = 0
  public readonly PERM_ASK_ONCE = 1
  public readonly PERM_GRANT_ALL = 2
  public readonly PERM_DENY_ALL = 3
  public readonly NAMES = {
    id: 0,
    uname: 1,
    mail: 2,
    pass: 3,
    name: 4,
    status: 5,
    perm: 6,
    priv: 7,
    picture: 8,
    image: 9,
  }
  public objects: Array<any> = [
    'id',
    'uname',
    'mail',
    'pass',
    'name',
    'status',
    'perm',
    'priv',
    'picture',
    { name: 'image', o: EFile },
  ]

  constructor() {
    super()
  }

  private _uname: string = ''

  /**
   * Getter username
   * @return {string}
   */
  public get uname(): string {
    return this._uname
  }

  /**
   * Setter username
   * @param {string} value
   */
  public set uname(value: string) {
    this._uname = value
  }

  private _mail: string = ''

  /**
   * Getter email
   * @return {string}
   */
  public get mail(): string {
    return this._mail
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set mail(value: string) {
    this._mail = value
  }

  private _pass: string = ''

  /**
   * Getter password
   * @return {string}
   */
  public get pass(): string {
    return this._pass
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set pass(value: string) {
    this._pass = value
  }

  private _name: string = ''

  /**
   * Getter fullName
   * @return {string}
   */
  public get name(): string {
    return this._name
  }

  /**
   * Setter fullName
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value
  }

  private _status: number = 0

  /**
   * Getter status
   * @return {number }
   */
  public get status(): number {
    return this._status
  }

  /**
   * Setter status
   * @param {number } value
   */
  public set status(value: number) {
    this._status = value
  }

  private _perm: number = 0

  /**
   * Getter permission
   * @return {string }
   */
  public get perm(): number {
    return this._perm
  }

  /**
   * Setter permission
   * @param {string } value
   */
  public set perm(value: number) {
    this._perm = value
  }

  private _priv: number = 0

  /**
   * Getter priv
   * @return {number }
   */
  public get priv(): number {
    return this._priv
  }

  /**
   * Setter priv
   * @param {number } value
   */
  public set priv(value: number) {
    this._priv = value
  }

  private _picture: string = ''

  /**
   * Getter picture
   * @return {string }
   */
  public get picture(): string {
    return this._picture
  }

  /**
   * Setter picture
   * @param {string } value
   */
  public set picture(value: string) {
    this._picture = value
  }

  private _image: EFile = new EFile()

  /**
   * Getter picture
   * @return {string}
   */
  public get image(): EFile {
    return this._image
  }

  /**
   * Setter picture
   * @param {string} value
   */
  public set image(value: EFile) {
    this._image = value
  }

  public getStatusName(statusCode: number): string {
    switch (statusCode) {
      case this.STATUS_INACTIVE:
        return 'Non-Aktif'
      case this.STATUS_ACTIVE:
        return 'Aktif'
      default:
        return ''
    }
  }

  public getPrivName(privCode: number): string {
    switch (privCode) {
      case this.PRIV_NOPRIVILEGE:
        return 'Unasigned'
      case this.PRIV_ADMIN:
        return 'Administrator'
      case this.PRIV_CASHIER:
        return 'Kasir'
      case this.PRIV_MASTER:
        return 'Master'
      case this.PRIV_OWNER:
        return 'Pemilik'
      default:
        return ''
    }
  }

}
