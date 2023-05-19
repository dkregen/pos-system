import { Model } from '../../@cores/model'
import { EReportTransaction } from './e-report-transaction'
import { ParamReportTransaction } from './param-report-transaction'
import { QueryObject } from '../../@cores/query-object'
import { MTrxPaymentTerm } from '../trx-payment-term/m-trx-payment-term'
import { Entity } from '../../@cores/entity'
import { EReportStock } from './e-report-stock'
import { ParamReportStock } from './param-report-stock'
import { ParamReportStockDetails } from './param-report-stock-details'
import { EReportStockDetails } from './e-report-stock-details'

export class MReporting extends Model {
	public static readonly INVOICE_ARAP = 0
	public static readonly INVOICE_NON_ARAP = 1

	public static async getDataReport(
		param: ParamReportTransaction,
		type: number,
	): Promise<Array<EReportTransaction>> {
		let arr: Array<EReportTransaction> = new Array()
		try {
			let q: QueryObject = new QueryObject()

			q.query =
				'SELECT tin.`ID`, tin.`CODE_INVOICE`, tin.`DATE`, c.`NAME`, c.`PHONE`, c.`COMPANY`, c.`TEL`, tin.`STATUS` ' +
				'FROM `trx_invoice` tin ' +
				'JOIN `users` u ON u.`ID` = tin.`ID_USER` ' +
				'LEFT JOIN `contacts` c ON c.`ID` = tin.`ID_CONTACT` ' +
				'WHERE tin.`TYPE` = ? ' +
				(param.hasDate && param.useDateBetween
					? 'AND DATE(tin.`DATE`) BETWEEN DATE(?) AND DATE(?) '
					: param.hasDate && !param.useDateBetween
						? 'AND DATE(tin.`DATE`) <= DATE(?) '
						: '') +
				(param.hasInvNo ? 'AND tin.`CODE_INVOICE` LIKE ? ' : '') +
				(param.hasContact
					? 'AND (c.`NAME` LIKE ? OR c.`COMPANY` LIKE ? OR c.`PHONE` LIKE ? OR c.`TEL` LIKE ?) '
					: '') +
				(param.hasPic
					? 'AND (u.`USERNAME` LIKE ? OR u.`EMAIL` LIKE ? OR u.`FULL_NAME` LIKE ?) '
					: '')

			q.value[ q.value.length ] = type
			if (param.hasDate) {
				q.value[ q.value.length ] = param.dateStart
				q.value[ q.value.length ] = param.dateEnd
			}

			if (param.hasInvNo) {
				q.value[ q.value.length ] = '%' + param.invNo + '%'
			}

			for (let n = 0; n < 4 && param.hasContact; n++) {
				q.value[ q.value.length ] = '%' + param.contact + '%'
			}

			for (let n = 0; n < 3 && param.hasPic; n++) {
				q.value[ q.value.length ] = '%' + param.pic + '%'
			}

			let r = await Model.exec(q)
			for (let i = 0; i < r.length; i++) {
				let tmp = r[ i ]
				let o: EReportTransaction = new EReportTransaction()
				o.id = tmp[ 'ID' ]
				o.invoice = tmp[ 'CODE_INVOICE' ]
				o.date = tmp[ 'DATE' ]
				o.status = tmp[ 'STATUS' ]
				let tel = Entity.isVal(tmp[ 'PHONE' ])
					? tmp[ 'PHONE' ]
					: Entity.isVal(tmp[ 'TEL' ])
						? tmp[ 'TEL' ]
						: ''
				let name = Entity.isVal(tmp[ 'NAME' ])
					? tmp[ 'NAME' ]
					: Entity.isVal(tmp[ 'COMPANY' ])
						? tmp[ 'COMPANY' ]
						: ''
				o.contact =
					name.substring(0, 9) +
					(Entity.isVal(name) && Entity.isVal(name) ? ' / ' : '') +
					tel
				o.contact = Entity.isVal(o.contact) ? o.contact : '-'
				if (o.status > -1) {
					let payment = await MTrxPaymentTerm.getPayment(o.id)
					o.amount = payment.totalPrice
					o.discount = payment.calcTotalDiscount
					o.taxIncluded = payment.calcTotalTax
					o.shortCost =
						payment.cashReturn > 0 ? 0 : Math.abs(payment.cashReturn)
					o.arap = payment.hasARAP ? payment.totalARAP : 0
					o.cash = payment.hasCash ? payment.cash : 0
				}
				let result = o.removeUnderscore()
				if (param.hasArap) {
					if (param.arap == MReporting.INVOICE_ARAP + '' && o.arap > 0) {
						arr[ arr.length ] = result
					} else if (
						param.arap == MReporting.INVOICE_NON_ARAP + '' &&
						o.arap == 0
					) {
						arr[ arr.length ] = result
					} else if (
						param.arap != MReporting.INVOICE_ARAP + '' &&
						param.arap != MReporting.INVOICE_NON_ARAP + ''
					) {
						arr[ arr.length ] = result
					}
				} else {
					arr[ arr.length ] = result
				}
			}
		} catch (e) {
			console.log(e)
		}

		return arr
	}

	public static async getDataReportStock(
		param: ParamReportStock,
	): Promise<Array<EReportStock>> {
		let arr = new Array()
		try {
			let q: QueryObject = new QueryObject()
			q.query =
				'SELECT * FROM (SELECT i.`ID`, u.`NAME` AS `UNIT_NAME`, MAX(tin.`DATE`) AS `DATE`, i.`NAME`, SUM(IF(tin.`STATUS` < 0, 0, IF(tin.`TYPE`=0, tit.`QTY`*-1, IF(tin.`ID` IS NULL, 0, COALESCE(tit.`QTY`))))) AS `STOCK` FROM items i ' +
				'JOIN `units` u ON u.`ID` = i.`ID_UNIT` ' +
				'LEFT JOIN `trx_item` tit ON i.`ID` = tit.`ID_ITEM` ' +
				'LEFT JOIN `trx_invoice` tin ON tit.`ID_INVOICE` = tin.`ID` ' +
				'AND DATE(tin.`DATE`) <= DATE(?) ' +
				'WHERE i.`NAME` LIKE ? ' +
				'GROUP BY i.`ID`) AS `t` ' +
				'ORDER BY `DATE` DESC, `UNIT_NAME` ' +
				'LIMIT 500'

			q.value = [param.date, '%' + param.name + '%']
			let r = await Model.exec(q)
			for (let i = 0; i < r.length; i++) {
				let tmp = r[ i ]
				let o: EReportStock = new EReportStock()
				o.id = tmp.ID
				o.name = tmp.NAME
				o.stock = tmp.STOCK
				o.unit = tmp.UNIT_NAME
				let result = o.removeUnderscore()
				arr[ arr.length ] = result
			}
		} catch (e) {
			console.log(e)
		}
		return arr
	}

	public static async getStockByIdAndBeforeDate(
		id: string,
		date: string,
	): Promise<number> {
		let num: number = 0
		try {
			let q: QueryObject = new QueryObject()
			q.query =
				'SELECT i.`ID`, i.`NAME`, SUM(IF(tin.`STATUS` < 0, 0, IF(tin.`TYPE`=0, tit.`QTY`*-1, IF(tin.`ID` IS NULL, 0, COALESCE(tit.`QTY`))))) AS `STOCK` FROM items i ' +
				'LEFT JOIN `trx_item` tit ON i.`ID` = tit.`ID_ITEM` ' +
				'LEFT JOIN `trx_invoice` tin ON tit.`ID_INVOICE` = tin.`ID` ' +
				'AND DATE(tin.`DATE`) < DATE(?) ' +
				'WHERE i.`ID` = ? ' +
				'GROUP BY i.`ID`'
			q.value = [date, id]
			let r = await Model.exec(q)
			for (let i = 0; i < r.length; i++) {
				num = r[ i ][ 'STOCK' ]
				break
			}
		} catch (e) {
			console.log(e)
		}

		return num
	}

	public static async getDataReportStockDetails(
		param: ParamReportStockDetails,
	): Promise<Array<EReportStockDetails>> {
		let arr = new Array()
		try {
			let first: EReportStockDetails = new EReportStockDetails()
			first.invoice = 'Periode Bulan Lalu'
			first.qty = await MReporting.getStockByIdAndBeforeDate(
				param.id,
				param.firstPeriod,
			)
			arr[ 0 ] = first.removeUnderscore()

			let q: QueryObject = new QueryObject()
			q.query =
				'SELECT tin.`ID`, tin.`STATUS`, tin.`TYPE`, tin.`CODE_INVOICE`, IF(tin.`STATUS`>-1, IF(tin.`TYPE`=0, tit.`QTY`*-1, tit.`QTY`), 0) AS `QTY` FROM trx_item tit ' +
				'JOIN `trx_invoice` tin ON tin.`ID` = tit.`ID_INVOICE` ' +
				'WHERE tit.`ID_ITEM` = ? ' +
				'AND DATE(tin.`DATE`) BETWEEN ? AND ?'
			q.value = [param.id, param.firstPeriod, param.date]
			let r = await Model.exec(q)
			for (let i = 0; i < r.length; i++) {
				let tmp = r[ i ]
				let o: EReportStockDetails = new EReportStockDetails()
				o.id = tmp.ID
				o.invoice = tmp.CODE_INVOICE
				o.qty = tmp.QTY
				o.type = tmp.TYPE
				o.status = tmp.STATUS
				let result = o.removeUnderscore()
				arr[ arr.length ] = result
			}
		} catch (e) {
			console.log(e)
		}
		return arr
	}
}
