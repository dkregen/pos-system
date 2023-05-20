import { Entity } from '../@core/entity'
import { environment } from '../../environments/environment'

export class EFile extends Entity {

  public objects: Array<any> = [
    'file',
    'hash',
    'type',
    'ext',
    'upload_date',
    'status',
  ]

  constructor() {
    super()
  }

  private _file: string = 'default.jpg'

  /**
   * Getter filename
   * @return {String }
   */
  public get file(): string {
    return environment.api + '/images/' + this._file
  }

  /**
   * Setter filename
   * @param {String } value
   */
  public set file(value: string) {
    this._file = value
  }

  private _hash: string = ''

  /**
   * Getter hash
   * @return {String }
   */
  public get hash(): string {
    return this._hash
  }

  /**
   * Setter hash
   * @param {String } value
   */
  public set hash(value: string) {
    this._hash = value
  }

  private _type: number = 0

  /**
   * Getter type
   * @return {Number }
   */
  public get type(): number {
    return this._type
  }

  /**
   * Setter type
   * @param {Number } value
   */
  public set type(value: number) {
    this._type = value
  }

  private _ext: string = ''

  /**
   * Getter extension
   * @return {String }
   */
  public get ext(): string {
    return this._ext
  }

  /**
   * Setter extension
   * @param {String } value
   */
  public set ext(value: string) {
    this._ext = value
  }

  private _upload_date: string = ''

  /**
   * Getter uploaded
   * @return {Date }
   */
  public get upload_date(): string {
    return this._upload_date
  }

  /**
   * Setter uploaded
   * @param {Date } value
   */
  public set upload_date(value: string) {
    this._upload_date = value
  }

  private _status: number = 1

  /**
   * Getter status
   * @return {Number }
   */
  public get status(): number {
    return this._status
  }

  /**
   * Setter status
   * @param {Number } value
   */
  public set status(value: number) {
    this._status = value
  }

  public filePath(): string {
    return this._file
  }
}
