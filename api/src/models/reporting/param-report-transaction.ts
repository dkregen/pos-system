import { Entity } from '../../@cores/entity'
import * as Moment from 'moment'

export class ParamReportTransaction extends Entity {
	constructor(params = null) {
		super()
		if (params) {
			this.arap = params.arap
			this.contact = params.contact
			this.dateStart = params.dateStart
			this.dateEnd = params.dateEnd
			this.invNo = params.invNo
			this.pic = params.pic
			this.status = params.status
			this.useDateBetween = (params.useDateBetween === 'true')
		}
	}

	private _arap: string = ''

	/**
	 * Getter arap
	 * @return {string }
	 */
	public get arap(): string {
		return this._arap
	}

	/**
	 * Setter arap
	 * @param {string } value
	 */
	public set arap(value: string) {
		this._arap = value
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

	private _date: string = ''

	/**
	 * Getter date
	 * @return {string }
	 */
	public get date(): string {
		return this._date
	}

	/**
	 * Setter date
	 * @param {string } value
	 */
	public set date(value: string) {
		this._date = value
	}

	private _dateStart: Moment.Moment = null

	/**
	 * Getter dateStart
	 * @return {string }
	 */
	public get dateStart(): string {
		return this._dateStart.format(Entity.MOMENT_PATTERN_MYSQL)
	}

	/**
	 * Setter dateStart
	 * @param {string } value
	 */
	public set dateStart(value: string) {
		this._dateStart = this.toMoment(value)
	}

	private _dateEnd: Moment.Moment = null

	/**
	 * Getter dateEnd
	 * @return {string }
	 */
	public get dateEnd(): string {
		return this._dateEnd.format(Entity.MOMENT_PATTERN_MYSQL)
	}

	/**
	 * Setter dateEnd
	 * @param {string } value
	 */
	public set dateEnd(value: string) {
		this._dateEnd = this.toMoment(value)
	}

	private _invNo: string = ''

	/**
	 * Getter invNo
	 * @return {string }
	 */
	public get invNo(): string {
		return this._invNo
	}

	/**
	 * Setter invNo
	 * @param {string } value
	 */
	public set invNo(value: string) {
		this._invNo = value
	}

	private _pic: string = ''

	/**
	 * Getter pic
	 * @return {string }
	 */
	public get pic(): string {
		return this._pic
	}

	/**
	 * Setter pic
	 * @param {string } value
	 */
	public set pic(value: string) {
		this._pic = value
	}

	private _status: string = ''

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

	private _useDateBetween: boolean = true

	/**
	 * Getter useDateBetween
	 * @return {boolean }
	 */
	public get useDateBetween(): boolean {
		return this._useDateBetween
	}

	/**
	 * Setter useDateBetween
	 * @param {boolean } value
	 */
	public set useDateBetween(value: boolean) {
		this._useDateBetween = value
	}

	public get hasPic(): boolean {
		return !!this._pic
	}

	public get hasStatus(): boolean {
		return !this._status
	}

	public get hasArap(): boolean {
		return (
			!!this._arap && !isNaN(parseInt(this._arap)) && parseInt(this._arap) > -1
		)
	}

	public get hasContact(): boolean {
		return !!this.contact
	}

	public get hasDate(): boolean {
		return !!this.dateStart && !!this.dateEnd
	}

	public get hasInvNo(): boolean {
		return !!this.invNo
	}
}
