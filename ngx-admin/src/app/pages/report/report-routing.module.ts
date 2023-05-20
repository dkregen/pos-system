import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ReportComponent } from './report.component'
import { SalesComponent } from './sales/sales.component'
import { ReceiveComponent } from './receive/receive.component'
import { StockChangeComponent } from './stock-change/stock-change.component'


const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [{
    path: 'sales',
    component: SalesComponent,
  },
    {
      path: 'receive',
      component: ReceiveComponent,
    },
    {
      path: 'stock',
      component: StockChangeComponent,
    }],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}

export const routedComponents = [
  ReportComponent,
  SalesComponent,
  ReceiveComponent,
  StockChangeComponent,
]
