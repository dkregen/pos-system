import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component'

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  }, {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  }, {
    path: 'master',
    loadChildren: () => import('./master/master.module').then(m => m.MasterModule),
  }, {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
  }, {
    path: '',
    redirectTo: 'user/profile',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
