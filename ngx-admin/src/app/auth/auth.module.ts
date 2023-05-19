import { NgModule } from '@angular/core'
import { ThemeModule } from '../@theme/theme.module'
import { AuthComponent } from './auth.component'

import { NbLoginComponent } from './login/login.component'
import { AuthRoutingModule } from './auth-routing.module'
import { NbAlertModule, NbButtonModule, NbInputModule } from '@nebular/theme'
import { RouterModule } from '@angular/router'
import { NbAuthModule } from '@nebular/auth'
import { FormsModule } from '@angular/forms'

const AUTH_COMPONENTS = [
  AuthComponent,
  NbLoginComponent,
]

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    RouterModule,
    NbAuthModule,
    FormsModule,
    ThemeModule,
  ],
  declarations: [
    ...AUTH_COMPONENTS,
  ],
})
export class AuthModule {
}
