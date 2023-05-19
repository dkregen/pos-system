import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CashieringComponent } from './cashiering.component'

const routes: Routes = [{
  path: '',
  component: CashieringComponent,
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashieringRoutingModule {
}
