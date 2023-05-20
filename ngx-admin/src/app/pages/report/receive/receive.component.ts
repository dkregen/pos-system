import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NbWindowService } from '@nebular/theme'
import { ETrxInvoice } from '../../../@entity/e-trx-invoice'
import * as Moment from 'moment'
import { ReportingService } from '../../../services/reporting.service'
import { Msg, ToastrConfig } from '../../../@config/toastr.config'
import { ToasterService } from 'angular2-toaster'
import { Entity } from '../../../@core/entity'
import { EReportTransaction } from '../../../@entity/e-report-transaction'
import { InvoiceService } from '../../../services/invoice.service'
import { EUser } from '../../../@entity/e-user'
import { RegisteredUserService } from '../../../services/registered-user.service'
import { AuthGuard } from '../../../services/auth-guard.service'
import { TransactionService } from '../../../services/transaction.service'
import { EContact } from '../../../@entity/e-contact'
import { InvoiceComponent } from '../../../cashiering/plugin/invoice/invoice.component'
import {
  InvoiceReceiptComponent,
} from '../../../cashiering/plugin/invoice/plugin/invoice-receipt/invoice-receipt.component'
import {
  InvoicePaymentComponent,
} from '../../../cashiering/plugin/invoice/plugin/invoice-payment/invoice-payment.component'

@Component({
  selector: 'report-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss'],
})
export class ReceiveComponent implements OnInit {
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>
  @ViewChild('invoice') formInvoice: InvoiceComponent
  @ViewChild('invoiceReceipt') formInvoiceReceipt: InvoiceReceiptComponent
  @ViewChild('invoicePayment') formInvoicePayment: InvoicePaymentComponent

  protected config = ToastrConfig
  protected inv: ETrxInvoice = new ETrxInvoice()
  protected result: Array<EReportTransaction> = []
  protected txtStatus = ETrxInvoice.status
  protected shownInvoice: boolean = false
  protected shownContact: boolean = false
  protected pic: EUser = new EUser()
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
    arap: -1,
    contact: '',
    date: {},
    dateStart: '',
    dateEnd: '',
    invNo: '',
    pic: '',
    status: '',
    useDateBetween: true,
  }
  private selectedInvoiceId: string = ''
  private formSearch: any

  constructor(
    private windowService: NbWindowService,
    private report: ReportingService,
    private toast: ToasterService,
    private invoice: InvoiceService,
    private userService: RegisteredUserService,
    private auth: AuthGuard,
    private transactionService: TransactionService,
  ) {}

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

  async saveNewContact(contact: EContact) {
    alert(contact.id)
    this.shownContact = false
    await this.invoice.changeContact(
      this.toast,
      this.selectedInvoiceId,
      contact.id,
    )
    this.selectedInvoiceId = ''
    this.submitSearch()
  }

  showSearch() {
    this.formSearch = this.windowService.open(this.contentTemplate, { title: 'Form Pencarian' })
  }

  showInvoice() {
    this.shownInvoice = true
  }

  showContact(id) {
    this.shownContact = true
    this.selectedInvoiceId = id
  }

  async retrieveInvoice(id: string) {
    let invoice: ETrxInvoice = await this.invoice.retrieve(this.toast, id)
    invoice.pic = this.pic
    invoice.payment.id = '-1'

    this.attachInvoice(invoice)
    this.showInvoice()
  }

  async toggleVoid(id: string) {
    await this.invoice.toggleVoid(this.toast, id)
    this.submitSearch()
  }

  async submitSearch() {
    let tempDateEnd = this.parameter.date.end
    this.parameter.useDateBetween = !!this.parameter.date.end
    this.parameter.date.start = this.parameter.date.start
      ? this.parameter.date.start
      : new Date()
    this.parameter.date.end = this.parameter.date.end
      ? this.parameter.date.end
      : this.parameter.date.start
    this.parameter.dateStart = Moment(this.parameter.date.start).format(
      Entity.MOMENT_PATTERN_MYSQL,
    )
    this.parameter.dateEnd = Moment(this.parameter.date.end).format(
      Entity.MOMENT_PATTERN_MYSQL,
    )
    this.result = await this.report.getReportReceiving(
      this.toast,
      this.parameter,
    )
    this.parameter.date.end = tempDateEnd
    !this.formSearch || this.formSearch.close()
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
      let invoice = await this.transactionService.insert(this.toast, this.inv)
      if (invoice.hasId()) {
        this.inv = invoice
        this.attachInvoice(this.inv)
        this.submitSearch()
      }
    }
  }

  ngOnInit() {
    (async () => {
      this.pic = await this.userService.get(
        this.toast,
        this.auth.getPayloadId(),
      )
      this.parameter.date.end = new Date()
      this.parameter.date.start = Moment(this.parameter.date.end).startOf('month').toDate()
      this.submitSearch()
    })()
  }

  protected setTotalEmpty() {
    this.total = {
      bruto: 0,
      tax: 0,
      short: 0,
      discount: 0,
      nett: 0,
      cash: 0,
      arap: 0,
    }
  }

  protected addTotal(i: number, item: EReportTransaction) {
    if (i == 0) {
      this.setTotalEmpty()
    }

    this.total.bruto += item.amount
    this.total.tax += item.taxIncluded
    this.total.short += item.shortCost
    this.total.discount += item.discount
    this.total.nett += item.nettWorth
    this.total.cash += item.cash
    this.total.arap += item.arap

    return i + 1
  }
}
