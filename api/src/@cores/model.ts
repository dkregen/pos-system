import { DB } from './db'
import { RowDataPacket } from 'mysql/lib/protocol/packets'
import * as Moment from 'moment'
import { QueryObject } from './query-object'

export class Model extends DB {

	public readonly FORMS: Array<string> = []
	public readonly FIELDS: Array<string> = []
	public readonly NAMES: any = {}
	public readonly RELATIONS: Object = {}
	public fetchRelation: boolean = false
	public fetchRelationChildren: boolean = false
	protected Entity: any
	protected readonly RELATION_ONE = 0
	protected readonly RELATION_MANY = 1
	protected readonly PK: string = 'ID'
	protected readonly TABLE: string = ''

	constructor() {
		super()
	}

	public static async exec(o: QueryObject): Promise<any> {
		let obj: any = null
		console.log('model.exec: query: ' + o.query)
		console.log('model.exec: values: ' + JSON.stringify(o.value))
		await (new Promise((res, rej) => {
			let model = new Model()
			model.connection((c) => {
				c.query(o.query, o.value, (err, result) => {
					if (err) return rej(err)
					res(result)
				})
			})
		})).then((r) => {
			obj = r
			console.log('model.exec: result lenght: ' + obj.length)
		})

		return obj
	}

	public static generateDigitNumber(digit: number, no: any): string {
		no += ''
		let zero: string = ''
		for (let i = 0; i < digit; i++) zero += '0'
		return zero.substr(0, digit - no.length) + no
	}

	public like(where: string) {
		return null
	}

	public count(params?: any): Promise<number> {
		return new Promise((resolve, reject) => {
			this.connection((c) => {
				var q = 'SELECT COUNT(0) AS `0` FROM (' + this.query(params.where,
					params.join, '', '', '', 'none') + ') as `table`'
				console.log('model.count: query: ' + q)
				console.log('model.count: var: ' + params.var)
				c.query(q, params.var, (err, result) => {
					if (err) return reject(err)
					console.log('model.count: count result is ' + result[ 0 ][ 0 ])
					resolve(result[ 0 ][ 0 ])
				})
			})
		})
	}

	// -- LIST
	public l(params?: any, toForm = false): Promise<any> {
		return new Promise((resolve, reject) => {
			this.connection((c, e) => {
				if (e) return reject(e)
				var q = this.query(params.where, params.join, params.groupBy,
					params.orderBy, params.orderType, params.limit, params.index)

				console.log('model.list: query:', q)
				console.log('model.list: values:', params.var)
				c.query(q, params.var, (err, result) => {
					if (err) return reject(err)
					var promises = []
					for (let i = 0; i < result.length; i++) {
						promises.push(new Promise((resolve, reject) => {
							let re = this.p(result[ i ], false, toForm)
							this.getRelation(re, toForm).then((r) => {
								resolve(r)
							}).catch((e) => {
								reject(e)
							})
						}))
					}

					if (promises.length > 0) {
						Promise.all(promises).then(rs => {
							resolve(rs)
						}).catch((e) => {
							reject(e)
						})
					} else {
						resolve([])
					}
				})
			})
		})
	}

	// -- FETCH WHERE
	public fW(params: any, toForm = false): Promise<any> {
		return new Promise((resolve, reject) => {
			var q = this.query(params.where)
			console.log('model.fetchWhere: query: ', q)
			console.log('model.fetchWhere: values:', params.var)
			params[ 'limit' ] = 1
			params[ 'index' ] = 0
			this.l(params, toForm).then(result => {
				resolve((result.length > 0 ? result[ 0 ] : {}))
			})
		})
	}

	public fetchAsForm(id: string): Promise<any> {
		return this.f(id, true)
	}

	public toFormObject(e: any): Object {
		var o = {}
		var fi = Object.keys(this.NAMES)
		for (let i = 0; i < this.FORMS.length; i++) {
			o[ this.FORMS[ i ] ] = e[ fi[ i ] ]
		}
		return o
	}

	public formToField(form: string): string {
		for (let i = 0; i < this.FORMS.length; i++) {
			if (this.FORMS[ i ] === form) {
				return this.FIELDS[ i ]
			}
		}

		return ''
	}

	// -- PARSE TO OBJECT a.k.a POPULATE
	protected p(re: any, compare = false, toForm = false): Promise<any> | any {
		if (!re) {
			return null
		}

		var fo, r
		var v: any = []
		var withCompare: boolean = true
		if (!(re instanceof RowDataPacket)) {
			let useParam: boolean = 'params' in re
			let useBody: boolean = 'body' in re
			fo = this.FORMS
			withCompare = compare

			if (useBody) {
				r = re.body
			}

			if (useParam) {
				r = { ...r, ...re.params }
			}

			v = {}
			v[ 'limit' ] = useParam && 'limit' in re.params ? re.params[ 'limit' ] : useBody && 'limit' in re.body ? re.body[ 'limit' ] : 100
			v[ 'index' ] = useParam && 'index' in re.params ? re.params[ 'index' ] : useBody && 'index' in re.body ? re.body[ 'index' ] : 0
		} else {
			fo = this.FIELDS
			r = re
			withCompare = false
		}

		if (r == null) {
			if (!!re) {
				if (re instanceof this.Entity) {
					r = re
					fo = Object.keys(this.NAMES)
					return this.populator(r, fo, v, withCompare, toForm)
				}
			}

			return toForm ? {} : new this.Entity()
		}

		return this.populator(r, fo, v, withCompare, toForm)
	}

	protected query(
		where?: string,
		join?: string,
		groupBy?: string,
		orderBy?: string,
		orderType?: string,
		limit?: any,
		index?: number): string {
		orderType = (!orderType ? '' : orderType)
		limit = (limit === 'none' ? 0 : !isNaN(limit) ? limit : 100)
		var query = 'SELECT * FROM `' + this.TABLE + '`'
		query += (join ? ' ' + join + ' ' : '')
		query += (where ? ' WHERE ' + where : '')
		query += (groupBy ? ' GROUP BY ' + groupBy : '')
		query += (orderBy ? ' ORDER BY ' + orderBy + ' ' + orderType : '')
		query += (limit > 0 ? ' LIMIT ' + (index > 0 ? index + ', ' : '') + limit : '')

		return query
	}

	// -- INSERT
	protected i(entity: any): Promise<any> {
		return new Promise((resolve, reject) => {
			var f = ''
			var p = ''
			var v = []
			var fields = this.FIELDS
			var names = Object.keys(this.NAMES)
			let n = 0
			for (let i = 1; i < fields.length; i++) {
				let value: any = (Moment.isMoment(entity[ names[ i ] ])
					? entity[ names[ i ] ].format('YYYY-MM-DD HH:mm:ss')
					: entity[ names[ i ] ])

				if (value !== null) {
					p += ((p ? ', ' : '') + '?')
					f += (f ? ', ' : '')
					f += ('`' + fields[ i ] + '`')
					v[ n ] = value
					n++
				} else {
					p += ((p ? ', ' : '') + 'NULL')
					f += (f ? ', ' : '')
					f += ('`' + fields[ i ] + '`')
				}
			}

			var q = 'INSERT INTO `' + this.TABLE + '` (' + f + ') VALUES (' + p + ')'
			console.log('model.list: query: ' + q)
			console.log('model.list: values: ' + JSON.stringify(v))
			this.connection((c) => {
				c.query(q, v, (err, result) => {
					if (err) return reject(err)
					entity.id = result.insertId
					resolve(this.p(result))
				})
			})
		})
	}

	// -- UPDATE
	protected u(entity: any): Promise<any> {
		return new Promise((resolve, reject) => {
			if (entity) {
				var f = ''
				var v = []
				var fields = this.FIELDS
				var names = Object.keys(this.NAMES)
				for (let i = 1; i < fields.length; i++) {
					let value: any = (Moment.isMoment(entity[ names[ i ] ])
						? entity[ names[ i ] ].format('YYYY-MM-DD HH:mm:ss')
						: entity[ names[ i ] ])

					if (typeof value !== 'undefined') {
						f += (f ? ', ' : '')
						f += ('`' + fields[ i ] + '` = ?')
						v[ v.length ] = value
					}
				}
				var q = 'UPDATE `' + this.TABLE + '` SET ' + f + ' WHERE `' + this.PK + '` = ?'
				v[ v.length ] = entity[ names[ 0 ] ]

				console.log('model.list: query: ' + q)
				console.log('model.list: values: ' + JSON.stringify(v))
				this.connection((c) => {
					c.query(q, v, (err, result) => {
						if (err) return reject(err)
						resolve(entity)
					})
				})
			} else {
				resolve(entity)
			}
		})
	}

	// -- FETCH
	protected f(id: string, toForm = false): Promise<any> {
		return this.fW({
			where: this.PK + ' = ?',
			var: [id],
		}, toForm)
	}

	// -- DELETE
	protected d(id: string): Promise<any> {
		var that = this
		return new Promise((resolve, reject) => {
			var q = 'DELETE FROM `' + this.TABLE + '` WHERE `' + this.PK + '` = ?'
			console.log('model.list: query: ' + q)
			console.log('model.list: values: ' + id)
			this.connection((c) => {
				c.query(q, [id], (err, result) => {
					if (err) return reject(err)
					resolve(result)
				})
			})
		})
	}

	private populationProcess(r, fo, defaultOjb, toForm): any {
		var v = (!toForm) ? new this.Entity() : {}
		var fi = (!toForm) ? Object.keys(this.NAMES) : this.FORMS
		var names: Array<string> = Object.keys(this.NAMES)
		for (let i = 0; i < fi.length; i++) {
			if ((fo[ i ] in r)) {
				v[ fi[ i ] ] = r[ fo[ i ] ]
			} else if (('_' + fo[ i ] in r)) {
				v[ fi[ i ] ] = r[ '_' + fo[ i ] ]
			} else {
				v[ fi[ i ] ] = defaultOjb[ names[ i ] ]
			}
		}
		if ('limit' in r) {
			v[ 'limit' ] = r[ 'limit' ]
		}
		if ('index' in r) {
			v[ 'index' ] = r[ 'index' ]
		}
		return v
	}

	private populator(r, fo, v, compare, toForm): Promise<any> | any {
		if (compare) {
			return new Promise((resolve, reject) => {
				if (r instanceof Array) {
					for (let i = 0; i < r.length; i++) {
						var id: string = (('id' in r) ? (r[ 'id' ]) : (('_id' in r) ? (r[ '_id' ]) : null))
						if (id !== null) {
							this.f(id).then((ent) => {
								v[ i ] = this.populationProcess(r, fo, ent, toForm)
							}).catch(reason => {
								this.log(reason)
								reject(reason)
							})
						} else {
							v[ i ] = this.populationProcess(r, fo, new this.Entity(), toForm)
						}
					}
					resolve(v)
				} else {
					var id: string = (('_id' in r) ? (r[ '_id' ]) : (('id' in r) ? (r[ 'id' ]) : null))
					if (id !== null) {
						this.f(id).then((ent) => {
							resolve(this.populationProcess(r, fo, ent, toForm))
						}).catch(reason => {
							this.log(reason)
							reject(reason)
						})
					} else {
						resolve(this.populationProcess(r, fo, new this.Entity(), toForm))
					}
				}
			})
		} else {
			if (r instanceof Array) {
				for (let i = 0; i < r.length; i++) {
					v[ i ] = this.populationProcess(r, fo, new this.Entity(), toForm)
				}
				return v
			} else {
				return this.populationProcess(r, fo, new this.Entity(), toForm)
			}
		}
	}

	private getRelation(e, toForm: boolean): Promise<any> {
		return new Promise((response, reject) => {
			var r = {}
			var name = Object.keys(this.RELATIONS)
			var promises = []
			var promised = []

			for (let i = 0; i < name.length; i++) {
				var o = this.RELATIONS[ name[ i ] ]
				if (this.fetchRelation || o.autoFetch) {
					promised.push(name[ i ])
					let model = new o.model()
					let pk = (toForm ? this.FORMS[ o.fk ] : Object.keys(this.NAMES)[ o.fk ])
					let par = { where: model.PK + ' = ? ', var: [e[ pk ]] }
					model.fetchRelation = this.fetchRelationChildren
					model.fetchRelationChildren = this.fetchRelationChildren
					promises.push(o.relation === this.RELATION_MANY ?
						model.l(par, toForm) :
						model.fW(par, toForm))
				}
			}

			if (promises.length > 0) {
				Promise.all(promises)
					.then((rs) => {
						for (let i = 0; i < promised.length; i++) {
							e[ name[ i ] ] = rs[ i ]
						}
						response(e)
					})
					.catch((e) => {
						reject(e)
					})
			} else {
				response(e)
			}
		})
	}

}
