import { Entity } from "../../@cores/entity";
import { EFile } from "../file/e-file";
import { EUnit } from "../unit/e-unit";
import { EUser } from "../user/e-user";
import { MItem } from "./m-item";

export class EItem extends Entity {

  constructor() {
    super();
  }

  public getDataRelation(): any { }
  private _status: string = "1";
  private _idUnit: string = "";
  private _idFilePicture: string = "";
  private _idUserInput: string = "";
  private _name: string = "";
  private _dateEntry: string = "";
  private _priceBuy: number = 0;
  private _priceSell: number = 0;
  private _code: string = "";
  private _markupNominal: number = 0;
  private _markupPercent: number = 10;
  private _priceSellType: string = MItem.PRICE_SELL_TYPE_MARKUP_PERCENT;
  private _image: EFile = new EFile();
  private _unit: EUnit = new EUnit();
  private _user: EUser = new EUser();

  /**
   * Getter status
   * @return {string }
   */
  public get status(): string {
    return this._status;
  }

  /**
   * Getter idUnit
   * @return {string }
   */
  public get idUnit(): string {
    return this._idUnit;
  }

  /**
   * Getter idFilePicture
   * @return {string }
   */
  public get idFilePicture(): string {
    return this._idFilePicture;
  }

  /**
   * Getter idUserInput
   * @return {string }
   */
  public get idUserInput(): string {
    return this._idUserInput;
  }

  /**
   * Getter name
   * @return {string }
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter dateEntry
   * @return {string }
   */
  public get dateEntry(): string {
    return this._dateEntry;
  }

  /**
   * Getter image
   * @return {EFile }
   */
  public get image(): EFile {
    return this._image;
  }

  /**
   * Getter unit
   * @return {EUnit }
   */
  public get unit(): EUnit {
    return this._unit;
  }

  /**
   * Setter status
   * @param {string } value
   */
  public set status(value: string) {
    this._status = value;
  }

  /**
   * Setter idUnit
   * @param {string } value
   */
  public set idUnit(value: string) {
    this._idUnit = value;
  }

  /**
   * Setter idFilePicture
   * @param {string } value
   */
  public set idFilePicture(value: string) {
    this._idFilePicture = value;
  }

  /**
   * Setter idUserInput
   * @param {string } value
   */
  public set idUserInput(value: string) {
    this._idUserInput = value;
  }

  /**
   * Setter name
   * @param {string } value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter dateEntry
   * @param {string } value
   */
  public set dateEntry(value: string) {
    this._dateEntry = value;
  }

  /**
   * Setter image
   * @param {EFile } value
   */
  public set image(value: EFile) {
    this._image = value;
  }

  /**
   * Setter unit
   * @param {EUnit } value
   */
  public set unit(value: EUnit) {
    this._unit = value;
  }

  /**
   * Getter user
   * @return {EUser }
   */
  public get user(): EUser {
    return this._user;
  }

  /**
   * Setter user
   * @param {EUser } value
   */
  public set user(value: EUser) {
    this._user = value;
  }

  /**
   * Getter priceBuy
   * @return {number }
   */
  public get priceBuy(): number {
    return this._priceBuy;
  }

  /**
   * Getter priceSell
   * @return {number }
   */
  public get priceSell(): number {
    return this._priceSell;
  }

  /**
   * Getter markupNominal
   * @return {number }
   */
  public get markupNominal(): number {
    return this._markupNominal;
  }

  /**
   * Getter markupPercent
   * @return {number }
   */
  public get markupPercent(): number {
    return this._markupPercent;
  }

  /**
   * Setter priceBuy
   * @param {number } value
   */
  public set priceBuy(value: number) {
    this._priceBuy = value;
  }

  /**
   * Setter priceSell
   * @param {number } value
   */
  public set priceSell(value: number) {
    this._priceSell = value;
  }

  /**
   * Setter markupNominal
   * @param {number } value
   */
  public set markupNominal(value: number) {
    this._markupNominal = value;
  }

  /**
   * Setter markupPercent
   * @param {number } value
   */
  public set markupPercent(value: number) {
    this._markupPercent = value;
  }

  /**
   * Getter priceSellType
   * @return {string }
   */
  public get priceSellType(): string {
    return this._priceSellType;
  }

  /**
   * Setter priceSellType
   * @param {string } value
   */
  public set priceSellType(value: string) {
    this._priceSellType = value;
  }

  /**
   * Getter code
   * @return {string }
   */
  public get code(): string {
    return this._code;
  }

  /**
   * Setter code
   * @param {string } value
   */
  public set code(value: string) {
    this._code = value;
  }

}