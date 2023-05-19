import { Controller } from '../@cores/controller'
import { MUser } from '../models/user/m-user'
import { MFile } from '../models/file/m-file'
import { EUser } from '../models/user/e-user'

export class User extends Controller {

	constructor() {
		super()

		this.router.route('/pass').post((req, res) => {
			var uname = req.body.uname
			var pass = req.body.pass
			var newPass = req.body.new

			let mUser: MUser = new MUser()
			mUser.authenticatedUser(uname, pass).then((eUser: EUser) => {
				this.log(eUser)
				if (eUser && eUser.id) {
					mUser.passwordToHash(newPass).then(p => {
						eUser.password = p
						mUser.update(eUser).then(() => {
							this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Password baru berhasil disimpan')
							res.json(this.json)
						}).catch(e => {
							this.log(e)
							res.sendStatus(500)
						})
					}).catch(e => {
						this.log(e)
						res.sendStatus(500)
					})
				} else {
					this.json.data[ 'message' ] = this.msg(this.MSG_TYPE_WARNING, 'Password yang dimasukkan salah!')
					res.json(this.json)
				}
			}).catch(e => {
				this.log(e)
				res.sendStatus(500)
			})
		})

		this.router.route('/profile').post((req, res) => {
			let mFile: MFile = new MFile()
			let mUser: MUser = new MUser()
			mFile.uploadDirCode = MFile.FILE_DIR_PROFILE
			mFile.uploadInput = 'photo'
			mFile.toForm = mUser.FORMS[ mUser.NAMES.idFilePicture ]
			let msg = this.msg(this.MSG_TYPE_SUCCESS, 'Perubahan berhasil disimpan')

			this.delay(3000)
				.then(() => mFile.upload(req, res))
				.then(() => mUser.populate(req))
				.then((eUser: EUser) => {
					return new Promise((resolve, reject) => {
						mUser.count({
							where: mUser.FIELDS[ mUser.NAMES.id ] + ' <> ? AND ' +
								mUser.FIELDS[ mUser.NAMES.username ] + ' = ?',
							var: [eUser.id, eUser.username],
						}).then(n => {
							if (n > 0) {
								msg = this.msg(this.MSG_TYPE_ERROR, 'Username sudah ada yang pakai.')
								resolve(null)
							} else {
								if (!eUser.password) {
									eUser.password = undefined
								}
								resolve(eUser)
							}
						}).catch(e => {
							reject(e)
						})
					})
				})
				.then((eUser: EUser) => mUser.update(eUser))
				.then((eUser: EUser) => {
					this.json[ 'data' ][ 'message' ] = msg
					res.json(this.json)
				})
				.catch(reason => {
					this.log(reason)
					res.sendStatus(500)
				})
		})

		this.router.route('/get/:id').get((req, res) => {
			var mUser = new MUser()
			mUser.fetchRelation = true
			mUser.populate(req)
				.then((param) => mUser.fetchAsForm(param.id))
				.then((user) => {
					user.password = ''
					this.json[ 'data' ] = user ? user : mUser.toFormObject(new EUser())
					res.send(JSON.stringify(this.json))
				}).catch(reason => {
				console.log(reason)
				res.sendStatus(500)
			})
		})

		this.router.route('/toggle-status/:id').get((req, res) => {
			var mUser = new MUser()
			mUser.populate(req)
				.then((param) => mUser.toggleStatus(param.id))
				.then(() => {
					this.json[ 'data' ][ 'message' ] = this.msg(this.MSG_TYPE_SUCCESS, 'Perubahan berhasil disimpan')
					res.send(JSON.stringify(this.json))
				}).catch(reason => {
				console.log(reason)
				res.sendStatus(500)
			})
		})

		this.router.route('/list/:limit?/:index?/:order?/:orderType?').get((req, res) => {
			var m = new MUser()
			m.fetchRelation = true
			var param = m.populate(req)
			var where = req.params[ 'where' ] || req.query[ 'where' ]
			if (where) {
				var qWhere = m.like(where)
				param = { param, ...qWhere }
			}

			var order = req.params[ 'order' ] || req.query[ 'order' ]
			if (order) {
				let orderType = req.params[ 'orderType' ] || req.query[ 'orderType' ]
				param[ 'orderBy' ] = m.formToField(order)
				param[ 'orderType' ] = orderType
			}

			Promise.all([m.list(param, true), m.count(param)])
				.then((val) => {
					for (let i = 0; i < val[ 0 ].length; i++) {
						val[ 0 ][ i ][ 'pass' ] = ''
					}
					this.json[ 'data' ][ 'list' ] = val[ 0 ]
					this.json[ 'data' ][ 'rows' ] = val[ 1 ]
					res.json(this.json)
				}).catch((reason) => {
				console.log(reason)
				res.sendStatus(500)
			})
		})
	}

	public defaultResponse(req, res): void {
		res.setHeader('Content-Type', 'application/json')
	}

}
