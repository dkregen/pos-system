import { Entity } from '../../@cores/entity'

export class ETrxPaymentTerm extends Entity {

	constructor() {
		super()
	}

	private _status: string = ''

	/**
	 * Getter status
	 * @return {string }
	 */
	public get status(): string {
		return this._status
	}

	/**
	 * Setter status
	 * @param {string } value
	 */
	public set status(value: string) {
		this._status = value
	}

	private _idInvoice: string = ''

	/**
	 * Getter idInvoice
	 * @return {string }
	 */
	public get idInvoice(): string {
		return this._idInvoice
	}

	/**
	 * Setter idInvoice
	 * @param {string } value
	 */
	public set idInvoice(value: string) {
		this._idInvoice = value
	}

	private _idTrxPaymentTermBefore: string = ''

	/**
	 * Getter idTrxPaymentTermBefore
	 * @return {string }
	 */
	public get idTrxPaymentTermBefore(): string {
		return this._idTrxPaymentTermBefore
	}

	/**
	 * Setter idTrxPaymentTermBefore
	 * @param {string } value
	 */
	public set idTrxPaymentTermBefore(value: string) {
		this._idTrxPaymentTermBefore = value
	}

	private _totalPrice: number = 0

	/**
	 * Getter totalPrice
	 * @return {number }
	 */
	public get totalPrice(): number {
		return this._totalPrice
	}

	/**
	 * Setter totalPrice
	 * @param {number } value
	 */
	public set totalPrice(value: number) {
		this._totalPrice = value
	}

	private _totalDiscountItem: number = 0

	/**
	 * Getter totalDiscountItem
	 * @return {number }
	 */
	public get totalDiscountItem(): number {
		return this._totalDiscountItem
	}

	/**
	 * Setter totalDiscountItem
	 * @param {number } value
	 */
	public set totalDiscountItem(value: number) {
		this._totalDiscountItem = value
	}

	private _totalDiscountGlobal: number = 0

	/**
	 * Getter totalDiscountGlobal
	 * @return {number }
	 */
	public get totalDiscountGlobal(): number {
		return this._totalDiscountGlobal
	}

	/**
	 * Setter totalDiscountGlobal
	 * @param {number } value
	 */
	public set totalDiscountGlobal(value: number) {
		this._totalDiscountGlobal = value
	}

	private _totalTax: number = 0

	/**
	 * Getter totalTax
	 * @return {number }
	 */
	public get totalTax(): number {
		return this._totalTax
	}

	/**
	 * Setter totalTax
	 * @param {number } value
	 */
	public set totalTax(value: number) {
		this._totalTax = value
	}

	private _totalARAP: number = 0

	/**
	 * Getter totalARAP
	 * @return {number }
	 */
	public get totalARAP(): number {
		return this._totalARAP
	}

	/**
	 * Setter totalARAP
	 * @param {number } value
	 */
	public set totalARAP(value: number) {
		this._totalARAP = value
	}

	private _cash: number = 0

	/**
	 * Getter cash
	 * @return {number }
	 */
	public get cash(): number {
		return this._cash
	}

	/**
	 * Setter cash
	 * @param {number } value
	 */
	public set cash(value: number) {
		this._cash = value
	}

	private _cashReturn: number = 0

	/**
	 * Getter cashReturn
	 * @return {number }
	 */
	public get cashReturn(): number {
		return this._cashReturn
	}

	/**
	 * Setter cashReturn
	 * @param {number } value
	 */
	public set cashReturn(value: number) {
		this._cashReturn = value
	}

	private _percentDiscountGlobal: number = 0

	/**
	 * Getter percentDiscountGlobal
	 * @return {number }
	 */
	public get percentDiscountGlobal(): number {
		return this._percentDiscountGlobal
	}

	/**
	 * Setter percentDiscountGlobal
	 * @param {number } value
	 */
	public set percentDiscountGlobal(value: number) {
		this._percentDiscountGlobal = value
	}

	private _percentTax: number = 0

	/**
	 * Getter percentTax
	 * @return {number }
	 */
	public get percentTax(): number {
		return this._percentTax
	}

	/**
	 * Setter percentTax
	 * @param {number } value
	 */
	public set percentTax(value: number) {
		this._percentTax = value
	}

	private _stateOfDiscountGlobal: string = ''

	/**
	 * Getter stateOfDiscountGlobal
	 * @return {string }
	 */
	public get stateOfDiscountGlobal(): string {
		return this._stateOfDiscountGlobal
	}

	/**
	 * Setter stateOfDiscountGlobal
	 * @param {string } value
	 */
	public set stateOfDiscountGlobal(value: string) {
		this._stateOfDiscountGlobal = value
	}

	private _stateOfTax: string = ''

	/**
	 * Getter stateOfTax
	 * @return {string }
	 */
	public get stateOfTax(): string {
		return this._stateOfTax
	}

	/**
	 * Setter stateOfTax
	 * @param {string } value
	 */
	public set stateOfTax(value: string) {
		this._stateOfTax = value
	}

	private _stateOfARAP: string = ''

	/**
	 * Getter stateOfARAP
	 * @return {string }
	 */
	public get stateOfARAP(): string {
		return this._stateOfARAP
	}

	/**
	 * Setter stateOfARAP
	 * @param {string } value
	 */
	public set stateOfARAP(value: string) {
		this._stateOfARAP = value
	}

	private _stateOfCash: string = ''

	/**
	 * Getter stateOfCash
	 * @return {string }
	 */
	public get stateOfCash(): string {
		return this._stateOfCash
	}

	/**
	 * Setter stateOfCash
	 * @param {string } value
	 */
	public set stateOfCash(value: string) {
		this._stateOfCash = value
	}

	private _calcTotalDiscount: number = 0

	/**
	 * Getter calcTotalDiscount
	 * @return {number }
	 */
	public get calcTotalDiscount(): number {
		return this._calcTotalDiscount
	}

	/**
	 * Setter calcTotalDiscount
	 * @param {number } value
	 */
	public set calcTotalDiscount(value: number) {
		this._calcTotalDiscount = value
	}

	private _calcTotalTax: number = 0

	/**
	 * Getter calcTotalTax
	 * @return {number }
	 */
	public get calcTotalTax(): number {
		return this._calcTotalTax
	}

	/**
	 * Setter calcTotalTax
	 * @param {number } value
	 */
	public set calcTotalTax(value: number) {
		this._calcTotalTax = value
	}

	private _calcTotalARAP: number = 0

	/**
	 * Getter calcTotalARAP
	 * @return {number }
	 */
	public get calcTotalARAP(): number {
		return this._calcTotalARAP
	}

	/**
	 * Setter calcTotalARAP
	 * @param {number } value
	 */
	public set calcTotalARAP(value: number) {
		this._calcTotalARAP = value
	}

	private _calcTotalCash: number = 0

	/**
	 * Getter calcTotalCash
	 * @return {number }
	 */
	public get calcTotalCash(): number {
		return this._calcTotalCash
	}

	/**
	 * Setter calcTotalCash
	 * @param {number } value
	 */
	public set calcTotalCash(value: number) {
		this._calcTotalCash = value
	}

	private _calcTotalCashBefore: number = 0

	/**
	 * Getter calcTotalCashBefore
	 * @return {number }
	 */
	public get calcTotalCashBefore(): number {
		return this._calcTotalCashBefore
	}

	/**
	 * Setter calcTotalCashBefore
	 * @param {number } value
	 */
	public set calcTotalCashBefore(value: number) {
		this._calcTotalCashBefore = value
	}

	private _calcGrandTotal: number = 0

	/**
	 * Getter calcGrandTotal
	 * @return {number }
	 */
	public get calcGrandTotal(): number {
		return this._calcGrandTotal
	}

	/**
	 * Setter calcGrandTotal
	 * @param {number } value
	 */
	public set calcGrandTotal(value: number) {
		this._calcGrandTotal = value
	}

	private _dateCommit: string = ''

	/**
	 * Getter dateCommit
	 * @return {string }
	 */
	public get dateCommit(): string {
		return this._dateCommit
	}

	/**
	 * Setter dateCommit
	 * @param {string } value
	 */
	public set dateCommit(value: string) {
		this._dateCommit = value
	}

	public get hasDiscountGlobal(): boolean {
		return this._stateOfDiscountGlobal != '0'
	}

	public get hasTax(): boolean {
		return this._stateOfTax != '0'
	}

	public get hasARAP(): boolean {
		return this._stateOfARAP != '0'
	}

	public get hasCash(): boolean {
		return this._stateOfCash != '0'
	}

}
