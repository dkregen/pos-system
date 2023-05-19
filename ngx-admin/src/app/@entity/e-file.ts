import { Entity } from "../@core/entity";

export class EFile extends Entity {

  constructor() {
    super();
  }

  public objects: Array<any> = [
    "file",
    "hash",
    "type",
    "ext",
    "upload_date",
    "status"
  ];

  private _file: string = "default.jpg";
  private _hash: string = "";
  private _type: number = 0;
  private _ext: string = "";
  private _upload_date: string = "";
  private _status: number = 1;

  public filePath(): string {
    return this._file;
  }
  
  /**
   * Getter type
   * @return {Number }
   */
  public get type(): number {
    return this._type;
  }

  /**
   * Setter type
   * @param {Number } value
   */
  public set type(value: number) {
    this._type = value;
  }

  /**
   * Getter filename
   * @return {String }
   */
  public get file(): string {
    return "api/images/"+this._file;
  }

  /**
   * Getter hash
   * @return {String }
   */
  public get hash(): string {
    return this._hash;
  }

  /**
   * Getter extension
   * @return {String }
   */
  public get ext(): string {
    return this._ext;
  }

  /**
   * Getter uploaded
   * @return {Date }
   */
  public get upload_date(): string {
    return this._upload_date;
  }

  /**
   * Getter status
   * @return {Number }
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Setter filename
   * @param {String } value
   */
  public set file(value: string) {
    this._file = value;
  }

  /**
   * Setter hash
   * @param {String } value
   */
  public set hash(value: string) {
    this._hash = value;
  }

  /**
   * Setter extension
   * @param {String } value
   */
  public set ext(value: string) {
    this._ext = value;
  }

  /**
   * Setter uploaded
   * @param {Date } value
   */
  public set upload_date(value: string) {
    this._upload_date = value;
  }

  /**
   * Setter status
   * @param {Number } value
   */
  public set status(value: number) {
    this._status = value;
  }
}