import { Controller } from '../@cores/controller'
import { MTrxInvoice } from '../models/trx-invoice/m-trx-invoice'

export class Transaction extends Controller {

	constructor() {
		super()

		this.router.route('/insert').post((req, res) => {
			var json = this.json;
			(async () => {
				try {
					let invoice = await MTrxInvoice.buildInvoice(req)
					let msg = !!invoice ? await MTrxInvoice.insertNewInvoice(invoice) : 'Terjadi kesalahan, invoice tidak terbentuk.'
					if (msg !== undefined && !!msg) {
						let ctrl = new Controller()
						json[ 'data' ][ 'message' ] = this.msg(this.MSG_TYPE_ERROR, msg)
					} else {
						json[ 'data' ][ 'object' ] = await MTrxInvoice.getInvoiceObject(invoice.id)
					}
					res.json(json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/toggle-void/:id').get((req, res) => {
			(async () => {
				try {
					let id = req.body.id || req.params.id
					let mtrxInvoice: MTrxInvoice = new MTrxInvoice()
					let invoice = await mtrxInvoice.fetch(id)
					invoice.status = ((parseInt(invoice.status) <= -1) ? '1' : '-1')
					await mtrxInvoice.update(invoice)
					this.json[ 'data' ][ 'status' ] = invoice.status
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/change-contact/:idInvoice/:idContact').get((req, res) => {
			(async () => {
				try {
					let idInvoice = req.body.idInvoice || req.params.idInvoice
					let idContact = req.body.idContact || req.params.idContact
					let mtrxInvoice: MTrxInvoice = new MTrxInvoice()
					let invoice = await mtrxInvoice.fetch(idInvoice)
					invoice.idContact = idContact
					await mtrxInvoice.update(invoice)
					this.json[ 'data' ][ 'status' ] = invoice.id
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/bring-back/:id').get((req, res) => {
			(async () => {
				try {
					let id = req.body.id || req.params.id
					let invoice = await MTrxInvoice.getInvoiceObject(id)
					invoice[ 'payment' ].id = '-1'
					this.json[ 'data' ][ 'object' ] = invoice
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/search-invoice').get((req, res) => {
			(async () => {
				try {
					let where = req.params[ 'where' ] || req.query[ 'where' ]
					let type = req.params[ 'type' ] || req.query[ 'type' ]
					this.json[ 'data' ][ 'list' ] = await MTrxInvoice.searchInvoice(type, where)
					res.json(this.json)
				} catch (e) {
					res.sendStatus(500)
				}
			})()
		})

	}

}
