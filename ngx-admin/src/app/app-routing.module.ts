import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { AuthGuard } from './services/auth-guard.service'

export const routes: Routes = [
  {
    path: 'ngx',
    loadChildren: () => import('./ngx-pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cashier',
    loadChildren: () => import('./cashiering/cashiering.module').then(m => m.CashieringModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
]

const config: ExtraOptions = {
  useHash: false,
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
