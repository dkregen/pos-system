import { Controller } from '../@cores/controller'
import { MItem } from '../models/item/m-item'
import { MFile } from '../models/file/m-file'
import { EItem } from '../models/item/e-item'
import * as Moment from 'moment'

export class Item extends Controller {

	constructor() {
		super(MItem)

		this.router.route('/insertWithPicture').post((req, res) => {
			(async () => {
				try {
					let mFile: MFile = new MFile()
					let mItem: MItem = new MItem()
					mFile.uploadDirCode = MFile.FILE_DIR_PROFILE
					mFile.uploadInput = 'pict'
					mFile.toForm = mItem.FORMS[ mItem.NAMES.idFilePicture ]
					await mFile.upload(req, res)
					let item: EItem = await mItem.populate(req)
					let n = await mItem.count({
						where: mItem.FIELDS[ mItem.NAMES.code ] + ' = ?',
						var: [item.code],
					})
					if (n > 0) {
						this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_ERROR, 'Code sudah terdaftar. Silahkan perbaiki data terlebih dahulu. Code: ' + item.code)
						return res.json(this.json)
					}

					let r: any = await mItem.insert(item)
					this.log(r)
					this.json[ 'id' ] = item.id
					this.json[ 'affected' ] = r.affectedRows
					this.json[ 'status' ] = r.serverStatus
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Data berhasil disimpan.')
					console.log(this.json)
					res.json(this.json)

				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/updateWithPicture/:id?').post((req, res) => {
			(async () => {
				let mFile: MFile = new MFile()
				let mItem: MItem = new MItem()
				mFile.uploadDirCode = MFile.FILE_DIR_PROFILE
				mFile.uploadInput = 'pict'
				mFile.toForm = mItem.FORMS[ mItem.NAMES.idFilePicture ]
				try {
					await mFile.upload(req, res)
					let item: EItem = await mItem.populate(req)
					let n = await mItem.count({
						where: mItem.FIELDS[ mItem.NAMES.code ] + ' = ? AND ' + mItem.FIELDS[ mItem.NAMES.id ] + ' <> ?',
						var: [item.code, item.id],
					})
					if (n > 0) {
						this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_ERROR, 'Code sudah terdaftar. Silahkan perbaiki data terlebih dahulu. Code: ' + item.code)
						return res.json(this.json)
					}

					let r: any = await mItem.update(item)
					this.log(r)
					this.json[ 'id' ] = item.id
					this.json[ 'affected' ] = r.affectedRows
					this.json[ 'status' ] = r.serverStatus
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Data berhasil diubah.')
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/search-price-sell/:limit?/:index?').get((req, res) => {
			(async () => {
				var m = new MItem()
				var query = '%' + (req.params[ 'query' ] || req.query[ 'query' ] || '') + '%'
				var limit = req.params[ 'limit' ] || req.query[ 'limit' ] || -1
				var index = req.params[ 'index' ] || req.query[ 'index' ] || -1
				try {
					this.json[ 'data' ][ 'list' ] = await m.getWithCurrentPriceSell(query, limit, index)
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/search-price-buy/:limit?/:index?').get((req, res) => {
			(async () => {
				var m = new MItem()
				var query = '%' + (req.params[ 'query' ] || req.query[ 'query' ] || '') + '%'
				var limit = req.params[ 'limit' ] || req.query[ 'limit' ] || -1
				var index = req.params[ 'index' ] || req.query[ 'index' ] || -1
				try {
					this.json[ 'data' ][ 'list' ] = await m.getWithCurrentPriceBuy(query, limit, index)
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

		this.router.route('/search-stock/:limit?/:index?').get((req, res) => {
			(async () => {
				var m = new MItem()
				var query = '%' + (req.params[ 'query' ] || req.query[ 'query' ] || '') + '%'
				var limit = req.params[ 'limit' ] || req.query[ 'limit' ] || -1
				var index = req.params[ 'index' ] || req.query[ 'index' ] || -1
				try {
					this.json[ 'data' ][ 'list' ] = await m.getWithCurrentStock(query, Moment(), limit, index)
					res.json(this.json)
				} catch (e) {
					console.log(e)
					res.sendStatus(500)
				}
			})()
		})

	}

}
