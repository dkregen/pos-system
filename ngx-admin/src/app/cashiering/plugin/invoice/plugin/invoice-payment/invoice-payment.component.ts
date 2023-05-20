import { Component, Input, OnInit } from '@angular/core'
import { ETrxPayment } from '../../../../../@entity/e-trx-payment'
import { ETrxItem } from '../../../../../@entity/e-trx-item'

@Component({
  selector: 'invoice-payment',
  styleUrls: ['./invoice-payment.component.scss'],
  templateUrl: './invoice-payment.component.html',
})
export class InvoicePaymentComponent implements OnInit {
  public products: Array<ETrxItem> = []
  public services: Array<ETrxItem> = []
  public compliments: Array<ETrxItem> = []
  @Input() public manualDiscGlobal: boolean = false
  @Input() public percentManual: boolean = false
  @Input() public class: string = ''
  @Input() public forceEnableState: boolean = false
  private helperBeforeCash = 0

  private _payment: ETrxPayment = new ETrxPayment()

  /**
   * Getter payment
   * @return {ETrxPayment }
   */
  public get payment(): ETrxPayment {
    return this._payment
  }

  /**
   * Setter payment
   * @param {ETrxPayment } value
   */
  public set payment(value: ETrxPayment) {
    this._payment = value
  }

  public isEnabled(): boolean {
    return (!this._payment.hasId() && this._payment.id != '-1') || this.forceEnableState
  }

  public counter() {
    this.payment.discItemTotal = 0
    this.payment.priceTotal = 0
    let items = this.combineItem()
    for (let i = 0; i < items.length; i++) {
      let rightNowPrice = (items[ i ].price * items[ i ].qty)
      let rightNowDiscItemTotal = items[ i ].priceMirror * items[ i ].qty - rightNowPrice
      this.payment.discItemTotal += (rightNowDiscItemTotal > 0 ? rightNowDiscItemTotal : 0)
      this.payment.priceTotal += rightNowPrice + (rightNowDiscItemTotal > 0 ? rightNowDiscItemTotal : 0)
    }
    this.calculateTotal()
  }

  public calculateTotal() {
    this.payment.discGlobalTotal = (this.payment.priceTotal - this.payment.discItemTotal) * this.payment.discGlobalPercent / 100
    this.payment.paymentTotal = (this.hasPr() ? this.payment.prTotal : 0) + (this.hasCash() ? this.payment.cash : 0) + this.payment.cashBeforeTotalCal
    if (!this.manualDiscGlobal && !this.payment.discGlobalState) {
      this.payment.discGlobalTotal = this.payment.priceTotal - this.payment.paymentTotal - this.payment.discItemTotal
      this.payment.discGlobalTotal = (this.payment.discGlobalTotal < 0 ? 0 : this.payment.discGlobalTotal)
      this.calculateGDiscPercent(false)
    }
    this.payment.discTotalCal = this.payment.discItemTotal + (this.hasDiscGlobal() ? this.payment.discGlobalTotal : 0)
    this.payment.taxTotal = (this.payment.taxPercent / 100) *
      (this.payment.priceTotal - this.payment.discTotalCal)
    this.payment.taxTotalCal = (this.payment.taxState ? this.payment.taxTotal : 0)
    this.payment.grandTotalCal = this.payment.priceTotal + this.payment.taxTotalCal - this.payment.discTotalCal
    this.payment.returnCash = this.payment.paymentTotal - this.payment.grandTotalCal
  }

  ngOnInit() {

  }

  protected calculatePr() {
    if (this.payment.prFirst > 0) {
      let calculation = this.payment.prFirst + (this.payment.firstCash - this.payment.cash)
      console.log(calculation)
      if (calculation <= this.payment.prTotal && this.payment.cash >= this.payment.firstCash) {
        this.payment.prTotal = (calculation >= 0 ? calculation : 0)
      } else {
        this.payment.prTotal = this.payment.prFirst
      }
    }
    this.helperBeforeCash = this.payment.cash
  }

  protected hasDiscGlobal() {
    return this.payment.discGlobalState > 0 || null
  }

  protected hasTax() {
    return this.payment.taxState > 0 || null
  }

  protected hasPr() {
    return this.payment.prState > 0 || null
  }

  protected hasCash() {
    return this.payment.cashState > 0 || null
  }

  protected toggleCash() {
    if (this.isEnabled()) {
      this.payment.cashState = this.hasCash() ? 0 : 1
      this.calculateTotal()
    }
  }

  protected togglePr() {
    if (this.isEnabled()) {
      this.payment.prState = this.hasPr() ? 0 : 1
      this.calculateTotal()
    }
  }

  protected toggleDiscGlobal() {
    if (this.isEnabled()) {
      this.payment.discGlobalState = this.hasDiscGlobal() ? 0 : 1
      this.calculateTotal()
      if (this.payment.discGlobalState <= 0) {
        this.manualDiscGlobal = false
      }
    }
  }

  protected toggleTax() {
    if (this.isEnabled()) {
      this.payment.taxState = this.hasTax() ? 0 : 1
      this.calculateTotal()
    }
  }

  protected calculateTaxPercent() {
    console.log((this.payment.taxTotal / this.payment.priceTotal))
    this.payment.taxPercent = (this.payment.taxTotal / this.payment.priceTotal) * 100
    this.payment.taxTotalCal = (this.payment.taxState ? this.payment.taxTotal : 0)
  }

  protected calculateGDiscPercent(manual = true) {
    this.manualDiscGlobal = manual
    this.payment.discGlobalPercent = this.payment.discGlobalTotal / (this.payment.priceTotal - this.payment.discItemTotal) * 100
    this.payment.discTotalCal = this.payment.discItemTotal + (this.hasDiscGlobal ? this.payment.discGlobalTotal : 0)
    if (manual) {
      this.calculateTotal()
    }
  }

  protected calculateGDiscNominal() {
    this.manualDiscGlobal = true
    this.calculateTotal()
  }

  private combineItem() {
    return this.products.concat(this.services).concat(this.compliments)
  }

}
