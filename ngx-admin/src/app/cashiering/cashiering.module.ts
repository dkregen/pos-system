import { NgModule } from '@angular/core'
import { CashieringComponent } from './cashiering.component'
import { CashieringRoutingModule } from './cashiering-routing.module'
import { ThemeModule } from '../@theme/theme.module'
import { SearchInvoiceComponent } from './plugin/search-invoice/search-invoice.component'
import { SearchContactComponent } from './plugin/search-contact/search-contact.component'
import { SearchItemComponent } from './plugin/search-item/search-item.component'
import { InvoiceComponent } from './plugin/invoice/invoice.component'
import { InvoiceReceiptComponent } from './plugin/invoice/plugin/invoice-receipt/invoice-receipt.component'
import { InvoicePaymentComponent } from './plugin/invoice/plugin/invoice-payment/invoice-payment.component'
import { InvoiceStockComponent } from './plugin/invoice/plugin/invoice-stock/invoice-stock.component'
import { ContactService } from '../services/contact.service'
import { ItemService } from '../services/item.service'
import { TransactionService } from '../services/transaction.service'
import { ToasterModule } from 'angular2-toaster'
import { RegisteredUserService } from '../services/registered-user.service'
import { InvoiceService } from '../services/invoice.service'

const PAGES_COMPONENTS = []

@NgModule({
  declarations: [
    CashieringComponent,
    SearchInvoiceComponent,
    SearchItemComponent,
    SearchContactComponent,
    InvoiceComponent,
    InvoiceReceiptComponent,
    InvoicePaymentComponent,
    InvoiceStockComponent,
  ],
  imports: [
    CashieringRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
  ],
  providers: [
    ContactService,
    ItemService,
    TransactionService,
    RegisteredUserService,
    InvoiceService,
  ],
  exports: [
    SearchContactComponent,
    InvoiceComponent,
    InvoiceReceiptComponent,
    InvoicePaymentComponent,
    InvoiceStockComponent,
  ],
})
export class CashieringModule {
}
