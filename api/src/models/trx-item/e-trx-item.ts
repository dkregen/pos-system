import { Entity } from '../../@cores/entity'
import { MTrxItem } from './m-trx-item'

export class ETrxItem extends Entity {

	constructor() {
		super()
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

	private _idItem: string = ''

	/**
	 * Getter idItem
	 * @return {string }
	 */
	public get idItem(): string {
		return this._idItem
	}

	/**
	 * Setter idItem
	 * @param {string } value
	 */
	public set idItem(value: string) {
		this._idItem = value
	}

	private _idInvoice: string = ''

	/**
	 * Getter idInvoice
	 * @return {string }
	 */
	public get idInvoice(): string {
		return this._idInvoice
	}

	/**
	 * Setter idInvoice
	 * @param {string } value
	 */
	public set idInvoice(value: string) {
		this._idInvoice = value
	}

	private _itemCode: string = ''

	/**
	 * Getter itemCode
	 * @return {string }
	 */
	public get itemCode(): string {
		return this._itemCode
	}

	/**
	 * Setter itemCode
	 * @param {string } value
	 */
	public set itemCode(value: string) {
		this._itemCode = value
	}

	private _itemName: string = ''

	/**
	 * Getter itemName
	 * @return {string }
	 */
	public get itemName(): string {
		return this._itemName
	}

	/**
	 * Setter itemName
	 * @param {string } value
	 */
	public set itemName(value: string) {
		this._itemName = value
	}

	private _price: string = ''

	/**
	 * Getter price
	 * @return {string }
	 */
	public get price(): string {
		return this._price
	}

	/**
	 * Setter price
	 * @param {string } value
	 */
	public set price(value: string) {
		this._price = value
	}

	private _qty: string = ''

	/**
	 * Getter qty
	 * @return {string }
	 */
	public get qty(): string {
		return this._qty
	}

	/**
	 * Setter qty
	 * @param {string } value
	 */
	public set qty(value: string) {
		this._qty = value
	}

	private _discItem: string = ''

	/**
	 * Getter discItem
	 * @return {string }
	 */
	public get discItem(): string {
		return this._discItem
	}

	/**
	 * Setter discItem
	 * @param {string } value
	 */
	public set discItem(value: string) {
		this._discItem = value
	}

	private _productType: number = MTrxItem.TYPE_PRODUCT

	/**
	 * Getter productType
	 * @return {number }
	 */
	public get productType(): number {
		return this._productType
	}

	/**
	 * Setter productType
	 * @param {number } value
	 */
	public set productType(value: number) {
		this._productType = value
	}

}
