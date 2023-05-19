import { Model } from '../../@cores/model'
import { ETrxPaymentTerm } from './e-trx-payment-term'
import { QueryObject } from '../../@cores/query-object'

export class MTrxPaymentTerm extends Model {

	public readonly NAMES = {
		id: 0,
		status: 1,
		idInvoice: 2,
		idTrxPaymentTermBefore: 3,
		totalPrice: 4,
		totalDiscountItem: 5,
		totalDixcountGlobal: 6,
		totalTax: 7,
		totalARAP: 8,
		cash: 9,
		cashReturn: 10,
		percentDiscountGlobal: 11,
		percentTax: 12,
		stateOfDiscountGlobal: 13,
		stateOfTax: 14,
		stateOfARAP: 15,
		stateOfCash: 16,
		calcTotalDiscount: 17,
		calcTotalTax: 18,
		calcTotalARAP: 19,
		calcTotalCash: 20,
		calcGrandTotal: 21,
		dateCommit: 22,
	}
	public readonly FIELDS: Array<string> = [
		'ID',
		'STATUS',
		'ID_INVOICE',
		'ID_TRX_PAYMENT_TERM_BEFORE',
		'TOTAL_PRICE',
		'TOTAL_DISCOUNT_ITEM',
		'TOTAL_DISCOUNT_GLOBAL',
		'TOTAL_TAX',
		'TOTAL_ARAP',
		'CASH',
		'CASH_RETURN',
		'PERCENT_DISCOUNT_GLOBAL',
		'PERCENT_TAX',
		'STATE_OF_DISCOUNT_GLOBAL',
		'STATE_OF_TAX',
		'STATE_OF_ARAP',
		'STATE_OF_CASH',
		'CALC_TOTAL_DISCOUNT',
		'CALC_TOTAL_TAX',
		'CALC_TOTAL_ARAP',
		'CALC_TOTAL_CASH',
		'CALC_GRAND_TOTAL',
		'DATE_COMMIT',
	]
	public readonly FORMS: Array<string> = [
		'id',
		'status',
		'invoiceId',
		'paymentBeforeId',
		'priceTotal',
		'discItemTotal',
		'discGlobalTotal',
		'taxTotal',
		'prTotal',
		'cash',
		'returnCash',
		'discGlobalPercent',
		'taxPercent',
		'discGlobalState',
		'taxState',
		'prState',
		'cashState',
		'discTotalCal',
		'taxTotalCal',
		'prTotalCal',
		'cashTotalCal',
		'grandTotalCal',
		'date',
	]
	protected readonly TABLE: string = 'trx_payment_term'
	protected Entity: any = ETrxPaymentTerm

	constructor() {
		super()
	}

	public static async getPayment(invoiceId: string): Promise<ETrxPaymentTerm> {
		let mPayment: MTrxPaymentTerm = new MTrxPaymentTerm()
		let payment: ETrxPaymentTerm = new ETrxPaymentTerm()
		let q: QueryObject = new QueryObject()
		q.query = 'SELECT p1.*, '
			+ 'p2.`STATUS`, '
			+ 'p2.`ID_INVOICE`, '
			+ 'p2.`ID_TRX_PAYMENT_TERM_BEFORE`, '
			+ 'p2.`STATE_OF_DISCOUNT_GLOBAL`, '
			+ 'p2.`STATE_OF_TAX`, '
			+ 'p2.`STATE_OF_ARAP`, '
			+ 'p2.`STATE_OF_CASH` FROM (SELECT '
			+ 'MAX(p.`ID`) `ID`, '
			+ 'p.`ID_INVOICE`, '
			+ 'SUM(p.`TOTAL_PRICE`) `TOTAL_PRICE`, '
			+ 'SUM(p.`TOTAL_DISCOUNT_ITEM`) `TOTAL_DISCOUNT_ITEM`, '
			+ 'SUM(p.`TOTAL_DISCOUNT_GLOBAL`) `TOTAL_DISCOUNT_GLOBAL`, '
			+ 'SUM(p.`TOTAL_TAX`) `TOTAL_TAX`, '
			+ 'SUM(p.`TOTAL_ARAP`) `TOTAL_ARAP`, '
			+ 'SUM(p.`CASH`) `CASH`, '
			+ 'SUM(p.`CASH_RETURN`) `CASH_RETURN`, '
			+ 'SUM(p.`PERCENT_DISCOUNT_GLOBAL`) `PERCENT_DISCOUNT_GLOBAL`, '
			+ 'SUM(p.`PERCENT_TAX`) `PERCENT_TAX`, '
			+ 'SUM(p.`CALC_TOTAL_DISCOUNT`) `CALC_TOTAL_DISCOUNT`, '
			+ 'SUM(p.`CALC_TOTAL_TAX`) `CALC_TOTAL_TAX`, '
			+ 'SUM(p.`CALC_TOTAL_ARAP`) `CALC_TOTAL_ARAP`, '
			+ 'SUM(p.`CALC_TOTAL_CASH`) `CALC_TOTAL_CASH`, '
			+ 'SUM(p.`CALC_GRAND_TOTAL`) `CALC_GRAND_TOTAL` '
			+ 'FROM `trx_payment_term` p '
			+ 'WHERE p.`ID_INVOICE` = ? '
			+ 'GROUP BY p.`ID_INVOICE`) AS `p1` '
			+ 'JOIN (SELECT * FROM `trx_payment_term` p WHERE p.`ID_INVOICE` = ? ORDER BY p.`DATE_COMMIT` DESC LIMIT 0, 1) p2 ON p1.`ID_INVOICE` = p2.`ID_INVOICE`'
		q.value = [invoiceId, invoiceId]
		let r = await Model.exec(q)
		if (r.length > 0) {
			payment = await mPayment.populate(r[ 0 ])
			if (!!payment.stateOfARAP && parseInt(payment.stateOfARAP) > 0) {
				payment.stateOfCash = '1'
			}
		}
		return payment
	}

	public static async getMovementPayment(payment: ETrxPaymentTerm): Promise<ETrxPaymentTerm> {
		let current = await this.getPayment(payment.idInvoice)
		if (current.hasId()) {
			payment.totalPrice -= current.totalPrice
			payment.totalDiscountItem -= current.totalDiscountItem
			payment.totalDiscountGlobal -= current.totalDiscountGlobal
			payment.totalTax -= current.totalTax
			payment.totalARAP -= current.totalARAP
			payment.cash -= current.cash
			payment.cashReturn -= current.cashReturn
			payment.percentDiscountGlobal -= current.percentDiscountGlobal
			payment.percentTax -= current.percentTax
			payment.calcTotalDiscount -= current.calcTotalDiscount
			payment.calcTotalTax -= current.calcTotalTax
			payment.calcTotalARAP -= current.calcTotalARAP
			payment.calcTotalCash -= current.calcTotalCash
			payment.calcGrandTotal -= current.calcGrandTotal
		}
		return payment
	}

	public populate(re: Request | any): Promise<ETrxPaymentTerm> { return this.p(re, true) }

	public toObject(re: Request | any): ETrxPaymentTerm { return this.p(re, false) }

	public insert(entity: any): Promise<ETrxPaymentTerm> { return this.i(entity) }

	public update(entity: any): Promise<ETrxPaymentTerm> { return this.u(entity) }

	public list(params: any, toForm = false): Promise<Array<ETrxPaymentTerm>> { return this.l(params, toForm) }

	public fetchWhere(params: any, toForm = false): Promise<ETrxPaymentTerm> { return this.fW(params, toForm) }

	public fetch(id: string, toForm = false): Promise<ETrxPaymentTerm> { return this.f(id, toForm) }

	public delete(id: string): Promise<ETrxPaymentTerm> { return this.d(id) }

	public like(where: string) {
		let like = '%' + where + '%'
		return {
			where: this.FIELDS[ this.NAMES.id ] + ' IN (SELECT u.`ID` FROM `units` u WHERE u.`NAME` LIKE ?)',
			var: [like],
		}
	}

}
