import { Component, OnInit, ViewChild } from '@angular/core'
import { ETrxInvoice } from '../@entity/e-trx-invoice'
import { InvoiceComponent } from './plugin/invoice/invoice.component'
import { InvoiceReceiptComponent } from './plugin/invoice/plugin/invoice-receipt/invoice-receipt.component'
import { InvoicePaymentComponent } from './plugin/invoice/plugin/invoice-payment/invoice-payment.component'
import { TransactionService } from '../services/transaction.service'
import { EContact } from '../@entity/e-contact'
import { AuthGuard } from '../services/auth-guard.service'
import { ToasterService } from 'angular2-toaster'
import { Msg, ToastrConfig } from '../@config/toastr.config'
import { RegisteredUserService } from '../services/registered-user.service'
import { EUser } from '../@entity/e-user'
import { ETrxItem } from '../@entity/e-trx-item'
import { SearchInvoiceComponent } from './plugin/search-invoice/search-invoice.component'
import { SearchContactComponent } from './plugin/search-contact/search-contact.component'
import { SearchItemComponent } from './plugin/search-item/search-item.component'

@Component({
  selector: 'cashiering',
  styleUrls: ['./cashiering.component.scss'],
  templateUrl: './cashiering.component.html',
})
export class CashieringComponent implements OnInit {
  @ViewChild('searchInvoice') protected searchInvoice: SearchInvoiceComponent
  @ViewChild('searchContact') protected searchContact: SearchContactComponent
  @ViewChild('searchItem') protected searchItem: SearchItemComponent

  @ViewChild('formInvoiceSell') protected invSell: InvoiceComponent
  @ViewChild('formInvoiceSellReceipt')
  protected invSellReceipt: InvoiceReceiptComponent
  @ViewChild('formInvoiceSellPayment')
  protected invSellPayment: InvoicePaymentComponent

  @ViewChild('formInvoiceReceive') protected invReceive: InvoiceComponent
  @ViewChild('formInvoiceReceiveReceipt')
  protected invReceiveReceipt: InvoiceReceiptComponent
  @ViewChild('formInvoiceReceivePayment')
  protected invReceivePayment: InvoicePaymentComponent

  @ViewChild('formInvoiceAdjustment') protected invAdjustment: InvoiceComponent
  @ViewChild('formInvoiceAdjustmentStock')
  protected invAdjustmentStock: InvoiceReceiptComponent

  protected sell: ETrxInvoice = new ETrxInvoice()
  protected adjustment: ETrxInvoice = new ETrxInvoice()
  protected receive: ETrxInvoice = new ETrxInvoice()

  protected hasAdjustment: boolean = true
  protected toastrConfig = ToastrConfig
  private pic: EUser = new EUser()
  protected invoiceType: number = ETrxInvoice.TYPE_SELLING

  constructor(
    private transactionService: TransactionService,
    protected auth: AuthGuard,
    private userService: RegisteredUserService,
    protected toast: ToasterService,
  ) {}

  protected activeClass() {
    if (this.invoiceType === ETrxInvoice.TYPE_SELLING) {
      return 'first'
    } else if (this.invoiceType === ETrxInvoice.TYPE_RECEIVE && !this.auth.hasSell()) {
      return 'first'
    } else if (this.invoiceType === ETrxInvoice.TYPE_ADJUSTMENT && !this.auth.hasSell() && !this.auth.hasReceive()) {
      return 'first'
    } else if (this.invoiceType === ETrxInvoice.TYPE_RECEIVE) {
      return 'second'
    } else if (this.invoiceType === ETrxInvoice.TYPE_ADJUSTMENT && !this.auth.hasSell()) {
      return 'second'
    } else if (this.invoiceType === ETrxInvoice.TYPE_ADJUSTMENT && !this.auth.hasReceive()) {
      return 'second'
    } else if (this.invoiceType === ETrxInvoice.TYPE_ADJUSTMENT) {
      return 'third'
    }
  }

  protected changeModule(type: number) {
    !this.searchInvoice || (this.searchInvoice.list = [])
    !this.searchItem || (this.searchItem.items = [])
    this.invoiceType = type
    if (type == ETrxInvoice.TYPE_ADJUSTMENT) {
      this.searchItem.onlyEnableProduct()
      this.toast.pop(
        Msg.info(
          '',
          'Mohon seluruh transaksi dihentikan ketika melakukan stock opname.',
        ),
      )
    } else {
      this.searchItem.enableAll()
    }
  }

  onSave(inv: ETrxInvoice) {
    (async () => {
      if (inv.isItemEmpty()) {
        this.toast.pop(Msg.error('', 'Item transaksi masih kosong!'))
      } else if (!inv.userId) {
        this.toast.pop(Msg.error('', 'PIC tidak ditemukan'))
      } else if (inv.payment.prState && !inv.contactId) {
        this.toast.pop(
          Msg.error(
            '',
            'Mohon pilih customer terlebih dahulu untuk melengkapi data hutang/piutang!',
          ),
        )
      } else {
        let invoice = await this.transactionService.insert(this.toast, inv)
        if (invoice.hasId()) {
          !this.searchItem || (this.searchItem.items = [])
          inv.populate(invoice)
          this.attachInvoice(inv)
        }
      }
    })()
  }

  onChooseItem(item: ETrxItem) {
    let inv: ETrxInvoice = null
    let formList: any = null
    switch (this.invoiceType) {
      case ETrxInvoice.TYPE_SELLING:
        inv = this.sell
        formList = this.invSellReceipt
        break
      case ETrxInvoice.TYPE_RECEIVE:
        inv = this.receive
        formList = this.invReceiveReceipt
        break
      case ETrxInvoice.TYPE_ADJUSTMENT:
        inv = this.adjustment
        formList = this.invAdjustmentStock
        break
    }

    if (!inv.hasId()) {
      formList.add(item)
    } else {
      this.toast.pop(
        Msg.error('', 'Tidak dapat merubah receipt yang sudah tersimpan!'),
      )
    }
  }

  attachInvoice(invoice: ETrxInvoice) {
    switch (invoice.type) {
      case ETrxInvoice.TYPE_SELLING:
        this.sell = invoice
        this.invSell.invoice = invoice
        this.invSellPayment.products = invoice.products
        this.invSellPayment.services = invoice.services
        this.invSellPayment.compliments = invoice.compliments
        this.invSellPayment.payment = invoice.payment
        this.invSellReceipt.products = invoice.products
        this.invSellReceipt.services = invoice.services
        this.invSellReceipt.compliments = invoice.compliments
        this.invSellPayment.manualDiscGlobal = false
        break
      case ETrxInvoice.TYPE_RECEIVE:
        this.receive = invoice
        this.invReceive.invoice = invoice
        this.invReceivePayment.products = invoice.products
        this.invReceivePayment.services = invoice.services
        this.invReceivePayment.compliments = invoice.compliments
        this.invReceivePayment.payment = invoice.payment
        this.invReceiveReceipt.products = invoice.products
        this.invReceiveReceipt.services = invoice.services
        this.invReceiveReceipt.compliments = invoice.compliments
        this.invReceivePayment.manualDiscGlobal = false
        break
      case ETrxInvoice.TYPE_ADJUSTMENT:
        this.adjustment = invoice
        this.invAdjustment.invoice = invoice
        this.invAdjustmentStock.products = invoice.products
        break
    }
  }

  newInvoice(invType?: number, invoice?: ETrxInvoice, ask = true) {
    let exec: boolean = true
    if (ask) {
      exec = confirm('Apakah Anda ingin membuat record baru?')
    }

    if (exec) {
      if (!invoice) {
        invoice = new ETrxInvoice()
        invoice.type = invType ? invType : this.invoiceType
        invoice.userId = this.pic.id
        invoice.pic = this.pic
      }
      this.attachInvoice(invoice)
    }
  }

  attachContact(contact: EContact) {
    let invoice: ETrxInvoice = null
    switch (this.invoiceType) {
      case ETrxInvoice.TYPE_SELLING:
        invoice = this.sell
        break
      case ETrxInvoice.TYPE_RECEIVE:
        invoice = this.receive
        break
      case ETrxInvoice.TYPE_ADJUSTMENT:
        invoice = this.adjustment
        break
    }

    if (!invoice.hasId()) {
      invoice.contactId = contact.id
      invoice.contact = new EContact().populate(contact)
    } else {
      this.toast.pop(
        Msg.error(
          '',
          'Kontak tidak dapat dirubah karena invoice sudah tersimpan!',
        ),
      )
    }
  }

  recall(payment: InvoicePaymentComponent) {
    payment.counter()
  }

  ngOnInit() {
    (async () => {
      this.toastrConfig.positionClass = 'toast-bottom-left'
      this.pic = await this.userService.get(
        this.toast,
        this.auth.getPayloadId(),
      )
      this.newInvoice(ETrxInvoice.TYPE_SELLING, null, false)
      this.newInvoice(ETrxInvoice.TYPE_RECEIVE, null, false)
      this.newInvoice(ETrxInvoice.TYPE_ADJUSTMENT, null, false)
    })()
  }
}
