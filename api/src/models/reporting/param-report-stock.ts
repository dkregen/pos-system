import { Entity } from '../../@cores/entity'
import * as Moment from 'moment'

export class ParamReportStock extends Entity {
	constructor(params = null) {
		super()
		if (params) {
			this.date = params.date
			this.name = params.name
		}
	}

	private _date: Moment.Moment = Moment()

	/**
	 * Getter date
	 * @return {Moment.Moment }
	 */
	public get date(): string {
		return this._date.format(Entity.MOMENT_PATTERN_MYSQL)
	}

	/**
	 * Setter date
	 * @param {Moment.Moment } value
	 */
	public set date(value: string) {
		if (value) {
			this._date = this.toMoment(value)
		}
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
}
