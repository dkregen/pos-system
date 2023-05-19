import { Entity } from "../../@cores/entity";
import { MUser } from "./m-user";
import { EFile } from "../file/e-file";

export class EUser extends Entity {

  constructor() {
    super();
  }

  public getDataRelation(): any {}
  private _username: string = "";
  private _email: string = "";
  private _password: string = "";
  private _fullName: string = "";
  private _idFilePicture: string = "";
  private _privilege: number = MUser.PRIV_NOPRIVILEGE;
  private _status: number = MUser.STATUS_INACTIVE;
  private _permission: number = 0;
  private _image: EFile = new EFile();

  /**
   * Getter permission
   * @return {number }
   */
  public get permission(): number {
    return this._permission;
  }

  /**
   * Setter permission
   * @param {number } value
   */
  public set permission(value: number) {
    this._permission = value;
  }

  /**
   * Getter picture
   * @return {EFile }
   */
  public get image(): EFile {
    return this._image;
  }

  /**
   * Setter picture
   * @param {EFile } value
   */
  public set image(value: EFile) {
    this._image = value;
  }

  /**
   * Getter username
   * @return {string}
   */
  public get username(): string {
    return this._username;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Getter fullName
   * @return {string}
   */
  public get fullName(): string {
    return this._fullName;
  }

  /**
   * Getter idFilePicture
   * @return {string}
   */
  public get idFilePicture(): string {
    return this._idFilePicture;
  }

  /**
   * Getter privilege
   * @return {number}
   */
  public get privilege(): number {
    return this._privilege;
  }

  /**
   * Getter status
   * @return {number}
   */
  public get status(): number {
    return this._status;
  }

  /**
   * Setter username
   * @param {string} value
   */
  public set username(value: string) {
    this._username = !!value ? value : null;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = !!value ? value : undefined;
  }

  /**
   * Setter fullName
   * @param {string} value
   */
  public set fullName(value: string) {
    this._fullName = value;
  }

  /**
   * Setter idFilePicture
   * @param {string} value
   */
  public set idFilePicture(value: string) {
    this._idFilePicture = value;
  }

  /**
   * Setter privilege
   * @param {number} value
   */
  public set privilege(value: number) {
    this._privilege = value;
  }

  /**
   * Setter status
   * @param {number} value
   */
  public set status(value: number) {
    this._status = value;
  }

}