import { Model } from '../../@cores/model'
import { ETrxItem } from './e-trx-item'

export class MTrxItem extends Model {

	public static readonly TYPE_PRODUCT: number = 0
	public static readonly TYPE_SERVICE: number = 1
	public static readonly TYPE_COMPLIMIENT: number = 2
	public readonly NAMES = {
		id: 0,
		status: 1,
		idItem: 2,
		idInvoice: 3,
		itemCode: 4, //
		itemName: 5, //
		price: 6,
		qty: 7,
		discItem: 8,
		productType: 9, //
	}
	public readonly FIELDS: Array<string> = [
		'ID',
		'STATUS',
		'ID_ITEM',
		'ID_INVOICE',
		'ITEM_CODE',
		'ITEM_NAME',
		'PRICE',
		'QTY',
		'DISC_ITEM',
		'PRODUCT_TYPE',
	]
	public readonly FORMS: Array<string> = [
		'id',
		'status',
		'itemId',
		'invoiceId',
		'code',
		'name',
		'price',
		'qty',
		'itemDisc',
		'type',
	]
	protected readonly TABLE: string = 'trx_item'
	protected Entity: any = ETrxItem

	constructor() {
		super()
	}

	public populate(re: Request | any): Promise<ETrxItem> { return this.p(re, true) }

	public toObject(re: Request | any): ETrxItem { return this.p(re, false) }

	public insert(entity: any): Promise<ETrxItem> { return this.i(entity) }

	public update(entity: any): Promise<ETrxItem> { return this.u(entity) }

	public list(params: any, toForm = false): Promise<Array<ETrxItem>> { return this.l(params, toForm) }

	public fetchWhere(params: any, toForm = false): Promise<ETrxItem> { return this.fW(params, toForm) }

	public fetch(id: string, toForm = false): Promise<ETrxItem> { return this.f(id, toForm) }

	public delete(id: string): Promise<ETrxItem> { return this.d(id) }

	public like(where: string) {
		let like = '%' + where + '%'
		return {
			where: this.FIELDS[ this.NAMES.id ] + ' IN (SELECT u.`ID` FROM `units` u WHERE u.`NAME` LIKE ?)',
			var: [like],
		}
	}

}
