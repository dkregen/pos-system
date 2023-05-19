import { Entity } from '../../@cores/entity'

export class ECustomItem extends Entity {
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

	private _price: number = 0

	/**
	 * Getter price
	 * @return {number }
	 */
	public get price(): number {
		return this._price
	}

	/**
	 * Setter price
	 * @param {number } value
	 */
	public set price(value: number) {
		this._price = value
	}

	private _stock: number = 0

	/**
	 * Getter stock
	 * @return {number }
	 */
	public get stock(): number {
		return this._stock
	}

	/**
	 * Setter stock
	 * @param {number } value
	 */
	public set stock(value: number) {
		this._stock = value
	}

}
