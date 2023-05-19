import { Entity } from '../../@cores/entity'
import { EFile } from '../file/e-file'
import { EUnit } from '../unit/e-unit'
import { EUser } from '../user/e-user'
import { MItem } from './m-item'

export class EItem extends Entity {

	constructor() {
		super()
	}

	private _status: string = '1'

	/**
	 * Getter status
	 * @return {string }
	 */
	public get status(): string {
		return this._status
	}

	/**
	 * Setter status
	 * @param {string } value
	 */
	public set status(value: string) {
		this._status = value
	}

	private _idUnit: string = ''

	/**
	 * Getter idUnit
	 * @return {string }
	 */
	public get idUnit(): string {
		return this._idUnit
	}

	/**
	 * Setter idUnit
	 * @param {string } value
	 */
	public set idUnit(value: string) {
		this._idUnit = value
	}

	private _idFilePicture: string = ''

	/**
	 * Getter idFilePicture
	 * @return {string }
	 */
	public get idFilePicture(): string {
		return this._idFilePicture
	}

	/**
	 * Setter idFilePicture
	 * @param {string } value
	 */
	public set idFilePicture(value: string) {
		this._idFilePicture = value
	}

	private _idUserInput: string = ''

	/**
	 * Getter idUserInput
	 * @return {string }
	 */
	public get idUserInput(): string {
		return this._idUserInput
	}

	/**
	 * Setter idUserInput
	 * @param {string } value
	 */
	public set idUserInput(value: string) {
		this._idUserInput = value
	}

	private _name: string = ''

	/**
	 * Getter name
	 * @return {string }
	 */
	public get name(): string {
		return this._name
	}

	/**
	 * Setter name
	 * @param {string } value
	 */
	public set name(value: string) {
		this._name = value
	}

	private _dateEntry: string = ''

	/**
	 * Getter dateEntry
	 * @return {string }
	 */
	public get dateEntry(): string {
		return this._dateEntry
	}

	/**
	 * Setter dateEntry
	 * @param {string } value
	 */
	public set dateEntry(value: string) {
		this._dateEntry = value
	}

	private _priceBuy: number = 0

	/**
	 * Getter priceBuy
	 * @return {number }
	 */
	public get priceBuy(): number {
		return this._priceBuy
	}

	/**
	 * Setter priceBuy
	 * @param {number } value
	 */
	public set priceBuy(value: number) {
		this._priceBuy = value
	}

	private _priceSell: number = 0

	/**
	 * Getter priceSell
	 * @return {number }
	 */
	public get priceSell(): number {
		return this._priceSell
	}

	/**
	 * Setter priceSell
	 * @param {number } value
	 */
	public set priceSell(value: number) {
		this._priceSell = value
	}

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

	private _markupNominal: number = 0

	/**
	 * Getter markupNominal
	 * @return {number }
	 */
	public get markupNominal(): number {
		return this._markupNominal
	}

	/**
	 * Setter markupNominal
	 * @param {number } value
	 */
	public set markupNominal(value: number) {
		this._markupNominal = value
	}

	private _markupPercent: number = 10

	/**
	 * Getter markupPercent
	 * @return {number }
	 */
	public get markupPercent(): number {
		return this._markupPercent
	}

	/**
	 * Setter markupPercent
	 * @param {number } value
	 */
	public set markupPercent(value: number) {
		this._markupPercent = value
	}

	private _priceSellType: string = MItem.PRICE_SELL_TYPE_MARKUP_PERCENT

	/**
	 * Getter priceSellType
	 * @return {string }
	 */
	public get priceSellType(): string {
		return this._priceSellType
	}

	/**
	 * Setter priceSellType
	 * @param {string } value
	 */
	public set priceSellType(value: string) {
		this._priceSellType = value
	}

	private _image: EFile = new EFile()

	/**
	 * Getter image
	 * @return {EFile }
	 */
	public get image(): EFile {
		return this._image
	}

	/**
	 * Setter image
	 * @param {EFile } value
	 */
	public set image(value: EFile) {
		this._image = value
	}

	private _unit: EUnit = new EUnit()

	/**
	 * Getter unit
	 * @return {EUnit }
	 */
	public get unit(): EUnit {
		return this._unit
	}

	/**
	 * Setter unit
	 * @param {EUnit } value
	 */
	public set unit(value: EUnit) {
		this._unit = value
	}

	private _user: EUser = new EUser()

	/**
	 * Getter user
	 * @return {EUser }
	 */
	public get user(): EUser {
		return this._user
	}

	/**
	 * Setter user
	 * @param {EUser } value
	 */
	public set user(value: EUser) {
		this._user = value
	}

	public getDataRelation(): any { }

}
