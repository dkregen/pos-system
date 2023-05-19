import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NbWindowService } from '@nebular/theme'
import { ETrxInvoice } from '../../../@entity/e-trx-invoice'
import { ReportingService } from '../../../services/reporting.service'
import { Msg, ToastrConfig } from '../../../@config/toastr.config'
import { ToasterService } from 'angular2-toaster'
import { InvoiceService } from '../../../services/invoice.service'
import { InvoiceComponent } from '../../../cashiering/plugin/invoice/invoice.component'
import {
  InvoicePaymentComponent,
} from '../../../cashiering/plugin/invoice/plugin/invoice-payment/invoice-payment.component'
import {
  InvoiceReceiptComponent,
} from '../../../cashiering/plugin/invoice/plugin/invoice-receipt/invoice-receipt.component'
import { EUser } from '../../../@entity/e-user'
import { RegisteredUserService } from '../../../services/registered-user.service'
import { AuthGuard } from '../../../services/auth-guard.service'
import { TransactionService } from '../../../services/transaction.service'
import { EReportStock } from '../../../@entity/e-report-stock'
import { EReportStockDetail } from '../../../@entity/e-report-stock-detail'
import { delay } from 'q'
import * as Moment from 'moment'

@Component({
  selector: 'report-stock-change',
  templateUrl: './stock-change.component.html',
  styleUrls: ['./stock-change.component.scss'],
})
export class StockChangeComponent implements OnInit {
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>
  @ViewChild('invoice') formInvoice: InvoiceComponent
  @ViewChild('invoiceReceipt') formInvoiceReceipt: InvoiceReceiptComponent
  @ViewChild('invoicePayment') formInvoicePayment: InvoicePaymentComponent
  @ViewChild('invoiceStock') formInvoiceStock: InvoiceComponent
  @ViewChild('invoiceReceiptStock')
  formInvoiceReceiptStock: InvoiceReceiptComponent

  protected config = ToastrConfig
  protected inv: ETrxInvoice = new ETrxInvoice()
  protected result: Array<EReportStock> = new Array()
  protected details: Array<EReportStockDetail> = new Array()
  protected txtStatus = ETrxInvoice.status
  protected txtType = ETrxInvoice.txtType
  protected shownInvoice: boolean = false
  protected shownInvoiceStock: boolean = false
  protected shownContact: boolean = false
  protected pic: EUser = new EUser()
  protected show: boolean = false
  moment = Moment
  isNaN = Number.isNaN

  constructor(
    private windowService: NbWindowService,
    private report: ReportingService,
    private toast: ToasterService,
    private invoice: InvoiceService,
    private userService: RegisteredUserService,
    private auth: AuthGuard,
    private transactionService: TransactionService,
  ) {}

  protected total = {
    bruto: 0,
    tax: 0,
    short: 0,
    discount: 0,
    nett: 0,
    cash: 0,
    arap: 0,
  }

  protected parameter: any = {
    date: Moment().toDate(),
    name: '',
  }

  attachInvoice(invoice: ETrxInvoice) {
    this.inv = invoice
    this.formInvoice.invoice = invoice
    this.formInvoicePayment.products = invoice.products
    this.formInvoicePayment.services = invoice.services
    this.formInvoicePayment.compliments = invoice.compliments
    this.formInvoicePayment.payment = invoice.payment
    this.formInvoiceReceipt.products = invoice.products
    this.formInvoiceReceipt.services = invoice.services
    this.formInvoiceReceipt.compliments = invoice.compliments
    this.formInvoicePayment.manualDiscGlobal = false
  }

  attachInvoiceStock(invoice: ETrxInvoice) {
    this.formInvoiceStock.invoice = invoice
    this.formInvoiceReceiptStock.products = invoice.products
  }

  showSearch() {
    this.windowService.open(this.contentTemplate, { title: 'Form Pencarian' })
  }

  showInvoice() {
    this.shownInvoice = true
  }

  showInvoiceStock() {
    this.shownInvoiceStock = true
  }

  async retrieveInvoice(id: string) {
    let invoice: ETrxInvoice = await this.invoice.retrieve(this.toast, id)
    invoice.pic = this.pic
    invoice.payment.id = '-1'

    this.attachInvoice(invoice)
    this.showInvoice()
  }

  async toggleVoid(item: EReportStockDetail) {
    if (confirm('Apakah Anda ingin mengubah status transaksi ' + item.invoice + ' menjadi ' + (this.txtStatus(item.status * -1)) + '?')) {
      await this.invoice.toggleVoid(this.toast, item.id)
      this.getDetail(null, true)
    }
  }

  async submitSearch() {
    this.result = await this.report.getReportStock(this.toast, this.parameter)
  }

  protected selectedItem: EReportStock = new EReportStock()

  async getDetail(item?: EReportStock, status = false) {
    this.show = status
    await delay(null, 300)
    item = (!item ? this.selectedItem : item)
    let date = Moment(this.parameter.date).format('YYYY-MM-DD HH:mm:ss')
    this.details = await this.report.getReportStockDetails(
      this.toast,
      item.id,
      date,
    )
    this.selectedItem = item
    this.show = true
  }

  async getDetailRecord(item: EReportStockDetail) {
    let invoice: ETrxInvoice = await this.invoice.retrieve(this.toast, item.id)
    invoice.payment.id = '-1'
    if (item.type == ETrxInvoice.TYPE_ADJUSTMENT) {
      this.attachInvoiceStock(invoice)
      this.showInvoiceStock()
    } else {
      this.attachInvoice(invoice)
      this.showInvoice()
    }
  }

  async saveInvoice() {
    if (this.inv.isItemEmpty()) {
      this.toast.pop(Msg.error('', 'Item transaksi masih kosong!'))
    } else if (!this.inv.userId) {
      this.toast.pop(Msg.error('', 'PIC tidak ditemukan'))
    } else if (this.inv.payment.prState && !this.inv.contactId) {
      this.toast.pop(
        Msg.error(
          '',
          'Mohon pilih customer terlebih dahulu untuk melengkapi data hutang/piutang!',
        ),
      )
    } else {
      this.inv.pic = this.pic
      let invoice = await this.transactionService.insert(this.toast, this.inv)
      if (invoice.hasId()) {
        this.inv = invoice
        this.attachInvoice(this.inv)
        this.submitSearch()
      }
    }
  }

  totalStockDetail() {
    let total = 0
    for (let i = 0; i < this.details.length; i++) {
      total += this.details[ i ].qty
    }
    return total
  }

  ngOnInit() {
    (async () => {
      this.pic = await this.userService.get(
        this.toast,
        this.auth.getPayloadId(),
      )
      this.submitSearch()
    })()
  }
}
