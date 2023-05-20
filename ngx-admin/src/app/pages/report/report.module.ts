import { NgModule } from '@angular/core'
import { NbMomentDateModule } from '@nebular/moment'

import { ThemeModule } from '../../@theme/theme.module'
import { ProfileService } from '../../services/profile.service'
import { ToasterModule } from 'angular2-toaster'
import { ReportRoutingModule, routedComponents } from './report-routing.module'
import { InvoiceService } from '../../services/invoice.service'
import { TransactionService } from '../../services/transaction.service'
import { CashieringModule } from '../../cashiering/cashiering.module'
import { NbCardModule } from '@nebular/theme'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    ThemeModule,
    ReportRoutingModule,
    ToasterModule.forRoot(),
    CashieringModule,
    NbMomentDateModule,
    NbCardModule,
    RouterModule,
  ],
  providers: [
    ProfileService,
    InvoiceService,
    TransactionService,
  ],
})
export class ReportModule {}
