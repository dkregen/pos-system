import { Entity } from '../../@cores/entity'

export class EContact extends Entity {
	constructor() {
		super()
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

	private _tel: string = ''

	/**
	 * Getter tel
	 * @return {string }
	 */
	public get tel(): string {
		return this._tel
	}

	/**
	 * Setter tel
	 * @param {string } value
	 */
	public set tel(value: string) {
		this._tel = value
	}

	private _noKtp: string = ''

	/**
	 * Getter noKtp
	 * @return {string }
	 */
	public get noKtp(): string {
		return this._noKtp
	}

	/**
	 * Setter noKtp
	 * @param {string } value
	 */
	public set noKtp(value: string) {
		this._noKtp = value
	}
}
