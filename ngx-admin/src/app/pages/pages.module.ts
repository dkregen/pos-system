import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'
import { PagesRoutingModule } from './pages-routing.module'
import { ThemeModule } from '../@theme/theme.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module'
import { HomeModule } from './home/home.module'
import { MasterModule } from './master/master.module'
import { CashieringModule } from '../cashiering/cashiering.module'
import { NbIconModule, NbMenuModule } from '@nebular/theme'

const PAGES_COMPONENTS = [
  PagesComponent,
]

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    HomeModule,
    MiscellaneousModule,
    MasterModule,
    CashieringModule,
    NbMenuModule,
    NbIconModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
