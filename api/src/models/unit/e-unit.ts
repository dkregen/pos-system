import { Entity } from '../../@cores/entity'

export class EUnit extends Entity {

	constructor() {
		super()
	}

	private _name: String = ''

	/**
	 * Getter name
	 * @return {String }
	 */
	public get name(): String {
		return this._name
	}

	/**
	 * Setter name
	 * @param {String } value
	 */
	public set name(value: String) {
		this._name = value
	}


}
