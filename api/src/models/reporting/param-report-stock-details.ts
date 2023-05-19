import { Entity } from '../../@cores/entity'
import * as Moment from 'moment'

export class ParamReportStockDetails extends Entity {
	constructor(params = null) {
		super()
		if (params) {
			this.id = params.id
			this.date = params.date
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

	public get firstPeriod(): string {
		return this.date.substr(0, 8) + '01'
	}

}
