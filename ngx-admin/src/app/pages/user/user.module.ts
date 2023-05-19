import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { routedComponents, UserRoutingModule } from './user-routing.module'
import { ProfileService } from '../../services/profile.service'
import { ToasterModule } from 'angular2-toaster'
import { NbCardModule } from '@nebular/theme'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    UserRoutingModule,
    NbCardModule,
    FormsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProfileService,
  ],
})
export class UserModule {}
