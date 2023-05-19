import * as express from 'express'
import { Profiler } from './profiler'

export class Controller extends Profiler {

	public MSG_TYPE_DEFAULT = 0
	public MSG_TYPE_INFO = 1
	public MSG_TYPE_SUCCESS = 2
	public MSG_TYPE_WARNING = 3
	public MSG_TYPE_ERROR = 4
	protected json: any
	private msgType: any = [
		'default',
		'info',
		'success',
		'warning',
		'error',
	]
	private headerType: any = [
		'Informasi',
		'Informasi',
		'Sukses',
		'Peringatan',
		'Error',
	]

	constructor(Model?: any) {
		super()
		this.json = {
			data: {},
		}
		this.router = express.Router()

		// -- GLOBAL -------------------------------------------------------------------
		this.router.use((req, res, next) => {
			this.defaultResponse(req, res)
			this.json[ 'login' ] = '1'
			next()
		})

		if (Model) {
			// -- INSERT -----------------------------------------------------------------
			this.router.route('/insert').post((req, res) => {
				var m = new Model()
				var param = m.toObject(req)
				m.insert(param).then((r) => {
					this.log(r)
					this.json[ 'id' ] = r.insertId
					this.json[ 'affected' ] = r.affectedRows
					this.json[ 'status' ] = r.serverStatus
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Data berhasil disimpan.')
					res.json(this.json)
				}).catch(reason => {
					this.errorHandlerInsert(reason, res)
				})
			})

			// -- UPDATE -----------------------------------------------------------------
			this.router.route('/update/:id?').post((req, res) => {
				var m = new Model()
				var param = m.toObject(req)
				m.update(param).then((r) => {
					this.json[ 'affected' ] = r.affectedRows
					this.json[ 'status' ] = r.serverStatus
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Data berhasil diubah.')
					res.json(this.json)
				}).catch(reason => {
					this.errorHandlerUpdate(reason, res)
				})
			})

			// -- DELETE -----------------------------------------------------------------
			this.router.route('/delete/:id').get((req, res) => {
				var m = new Model()
				var param = m.toObject(req)
				m.delete(param.id).then((r) => {
					this.json[ 'affected' ] = r.affectedRows
					this.json[ 'status' ] = r.serverStatus
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Data berhasil dihapus.')
					console.log(m)
					res.json(this.json)
				}).catch(reason => {
					this.errorHandlerDelete(reason, res)
				})
			})

			// -- GET --------------------------------------------------------------------
			this.router.route('/get/:id').get((req, res) => {
				var m = new Model()
				var param = m.toObject(req)
				m.fetch(param.ID).then((r) => {
					this.json[ 'data' ] = r[ 0 ] ? m.toObject(r)[ 0 ] : null
					res.json(this.json)
				}).catch(reason => {
					console.log(reason)
					res.sendStatus(500)
				})
			})

			// -- LIMIT ------------------------------------------------------------------
			this.router.route('/list/:limit?/:index?/:order?/:orderType?').get((req, res) => {
				var m = new Model()
				m.fetchRelation = true
				var param = m.p(req)
				var where = req.params[ 'where' ] || req.query[ 'where' ]
				if (where) {
					var qWhere = m.like(where)
					param = { param, ...qWhere }
				}

				var order = req.params[ 'order' ] || req.query[ 'order' ]
				if (order) {
					let orderType = req.params[ 'orderType' ] || req.query[ 'orderType' ]
					param.orderBy = m.formToField(order)
					param.orderType = orderType
				}

				Promise.all([m.list(param, true), m.count(param)])
					.then((val) => {
						this.json[ 'data' ][ 'list' ] = val[ 0 ]
						this.json[ 'data' ][ 'rows' ] = val[ 1 ]
						res.json(this.json)
					}).catch((reason) => {
					console.log(reason)
					res.sendStatus(500)
				})
			})
		}

	}

	private _router: any

	/**
	 * Getter router
	 * @return {core.Router}
	 */
	public get router(): any {
		return this._router
	}

	/**
	 * Setter router
	 * @param {core.Router} value
	 */
	public set router(value: any) {
		this._router = value
	}

	public set404(): void {
		this.router.route('*').get((req, res) => { res.sendStatus(404) })
	}

	public msg(type: number, body: string, header?: string) {
		return {
			type: this.msgType[ type ],
			header: (header ? header : this.headerType[ type ]),
			body: body,
		}
	}

	public delay(milisecond: number): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(null)
				if (false) {
					reject(null)
				}
			}, milisecond)
		})
	}

	protected defaultResponse(req, res): void {

	}

	protected errorHandler(reason: any, res: any) {
		console.log(reason)
		res.sendStatus(500)
	}

	protected errorHandlerInsert(reason: any, res: any) {
		this.errorHandler(reason, res)
	}

	protected errorHandlerUpdate(reason: any, res: any) {
		this.errorHandler(reason, res)
	}

	protected errorHandlerDelete(reason: any, res: any) {
		this.errorHandler(reason, res)
	}

}
