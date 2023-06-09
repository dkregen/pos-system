export class QueryObject {
	private _query: string = ''

	/**
	 * Getter query
	 * @return {string }
	 */
	public get query(): string {
		return this._query
	}

	/**
	 * Setter query
	 * @param {string } value
	 */
	public set query(value: string) {
		this._query = value
	}

	private _value: Array<any> = new Array()

	/**
	 * Getter value
	 * @return {Array<any> }
	 */
	public get value(): Array<any> {
		return this._value
	}

	/**
	 * Setter value
	 * @param {Array<any> } value
	 */
	public set value(value: Array<any>) {
		this._value = value
	}

}
