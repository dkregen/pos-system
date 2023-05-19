import * as Moment from 'moment'

export class Entity {

	public static readonly MOMENT_PATTERN_STANDARD: string = 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
	public static readonly MOMENT_PATTERN_MYSQL: string = 'YYYY-MM-DD HH:mm:ss'

	constructor() {
	}

	private _id: string

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): string {
		return this._id
	}

	/**
	 * Setter id
	 * @param {string} value
	 */
	public set id(value: string) {
		this._id = value
	}

	public static moment(date: string): Moment.Moment {
		let e = new Entity()
		return e.toMoment(date)
	}

	public static isVal(value: any) {
		return !!value && value != 'null'
	}

	public removeUnderscore(): any {
		var names = Object.keys(this)
		var obj = {}
		for (let i = 0; i < names.length; i++) {
			var name = (names[ i ][ 0 ] == '_' ? names[ i ].substring(1, names[ i ].length) : names[ i ])
			obj[ name ] = this[ names[ i ] ]
		}

		return obj
	}

	public hasId(): boolean {
		return (this.id && this.id != '0')
	}

	public toMoment(date: string): Moment.Moment {
		if (date) {
			let pattern = ((date + '')).indexOf('T') > -1 ? 'YYYY-MM-DDTHH:mm:ss.SSSSZ' : 'YYYY-MM-DD HH:mm:ss'
			return Moment(date, pattern)
		} else {
			return null
		}
	}

}
