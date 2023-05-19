import { Entity } from "../../@cores/entity";
import * as Moment from "moment";
import { MFile } from "./m-file";

export class EFile extends Entity {

  private _filename: string = "";
  private _hash: string = "";
  private _type: number = 0;
  private _extension: string = "";
  private _uploaded: Moment.Moment = Moment();
  private _status: number = 1;
  private _req: any = null;

  /**
   * Getter req
   * @return {any }
   */
  public get req(): any {
    return this._req;
  }

  /**
   * Setter req
   * @param {any } value
   */
  public set req(value: any) {
    this._req = value;
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
  public get filename(): string {
    return this._filename;
  }

  /**
   * Getter file URI
   * @return {String }
   */
  public get fileURI(): string {
    return MFile.FILE_DIR[this.type].pathRoute + this._filename;
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
  public get extension(): string {
    return this._extension;
  }

  /**
   * Getter uploaded
   * @return {Date }
   */
  public get uploaded(): Moment.Moment {
    return this._uploaded;
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
  public set filename(value: string) {
    this._filename = value;
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
  public set extension(value: string) {
    this._extension = value;
  }

  /**
   * Setter uploaded
   * @param {Date } value
   */
  public set uploaded(value: Moment.Moment) {
    this._uploaded = value;
  }

  /**
   * Setter status
   * @param {Number } value
   */
  public set status(value: number) {
    this._status = value;
  }
}