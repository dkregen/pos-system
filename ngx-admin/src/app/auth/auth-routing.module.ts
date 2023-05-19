import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { AuthComponent } from './auth.component'
import { NbLoginComponent } from './login/login.component'

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: NbLoginComponent,
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
  ],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}