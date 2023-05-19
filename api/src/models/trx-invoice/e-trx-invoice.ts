import { Entity } from '../../@cores/entity'
import { ETrxPaymentTerm } from '../trx-payment-term/e-trx-payment-term'
import { ETrxItem } from '../trx-item/e-trx-item'
import * as Moment from 'moment'
import { MTrxInvoice } from './m-trx-invoice'

export class ETrxInvoice extends Entity {

	constructor() {
		super()
	}

	private _status: number = 1

	/**
	 * Getter status
	 * @return {string }
	 */
	public get status(): string {
		return this._status + ''
	}

	/**
	 * Setter status
	 * @param {string } value
	 */
	public set status(value: string) {
		this._status = parseInt(value)
	}

	private _idContact: string = ''

	/**
	 * Getter idContact
	 * @return {string }
	 */
	public get idContact(): string {
		return this._idContact
	}

	/**
	 * Setter idContact
	 * @param {string } value
	 */
	public set idContact(value: string) {
		this._idContact = value
	}

	private _idUser: string = ''

	/**
	 * Getter idUser
	 * @return {string }
	 */
	public get idUser(): string {
		return this._idUser
	}

	/**
	 * Setter idUser
	 * @param {string } value
	 */
	public set idUser(value: string) {
		this._idUser = value
	}

	private _date: Moment.Moment = Moment()

	/**
	 * Getter date
	 * @return {string }
	 */
	public get date(): any {
		return this._date.format('YYYY-MM-DD HH:mm:ss')
	}

	/**
	 * Setter date
	 * @param {string } value
	 */
	public set date(value: any) {
		let pattern = ((value + '')).indexOf('T') > -1 ? 'YYYY-MM-DDTHH:mm:ss.SSSSZ' : 'YYYY-MM-DD HH:mm:ss'
		this._date = (!!value ? Moment(value, pattern) : Moment())
	}

	private _codeInvoice: string = ''

	/**
	 * Getter codeInvoice
	 * @return {string }
	 */
	public get codeInvoice(): string {
		return this._codeInvoice
	}

	/**
	 * Setter codeInvoice
	 * @param {string } value
	 */
	public set codeInvoice(value: string) {
		this._codeInvoice = value
	}

	private _type: number = MTrxInvoice.TYPE_SELL

	/**
	 * Getter type
	 * @return {string }
	 */
	public get type(): number {
		return this._type
	}

	/**
	 * Setter type
	 * @param {string } value
	 */
	public set type(value: number) {
		this._type = value
	}

	private _products: Array<ETrxItem> = new Array<ETrxItem>()

	/**
	 * Getter products
	 * @return {Array<ETrxItem> }
	 */
	public get products(): Array<ETrxItem> {
		return this._products
	}

	/**
	 * Setter products
	 * @param {Array<ETrxItem> } value
	 */
	public set products(value: Array<ETrxItem>) {
		this._products = value
	}

	private _compliments: Array<ETrxItem> = new Array<ETrxItem>()

	/**
	 * Getter compliments
	 * @return {Array<ETrxItem> }
	 */
	public get compliments(): Array<ETrxItem> {
		return this._compliments
	}

	/**
	 * Setter compliments
	 * @param {Array<ETrxItem> } value
	 */
	public set compliments(value: Array<ETrxItem>) {
		this._compliments = value
	}

	private _services: Array<ETrxItem> = new Array<ETrxItem>()

	/**
	 * Getter services
	 * @return {Array<ETrxItem> }
	 */
	public get services(): Array<ETrxItem> {
		return this._services
	}

	/**
	 * Setter services
	 * @param {Array<ETrxItem> } value
	 */
	public set services(value: Array<ETrxItem>) {
		this._services = value
	}

	private _payment: ETrxPaymentTerm = new ETrxPaymentTerm()

	/**
	 * Getter payment
	 * @return {ETrxPaymentTerm }
	 */
	public get payment(): ETrxPaymentTerm {
		return this._payment
	}

	/**
	 * Setter payment
	 * @param {ETrxPaymentTerm } value
	 */
	public set payment(value: ETrxPaymentTerm) {
		this._payment = value
	}

}
