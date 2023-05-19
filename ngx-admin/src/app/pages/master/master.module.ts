import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { ProfileService } from '../../services/profile.service'
import { ToasterModule } from 'angular2-toaster'
import { MasterRoutingModule, routedComponents } from './master-routing.module'
import { UnitService } from '../../services/unit.service'
import { NgxPaginationModule } from 'ngx-pagination'
import { ItemService } from '../../services/item.service'
import { ContactService } from '../../services/contact.service'
import { RegisteredUserService } from '../../services/registered-user.service'
import { FormsModule } from '@angular/forms'
import { NbCardModule } from '@nebular/theme'

@NgModule({
	imports: [
		ThemeModule,
		ToasterModule.forRoot(),
		MasterRoutingModule,
		NgxPaginationModule,
		FormsModule,
		NbCardModule,
	],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProfileService,
    UnitService,
    ItemService,
    ContactService,
    RegisteredUserService,
  ],
})
export class MasterModule {}
