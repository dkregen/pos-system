import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UnitComponent } from './unit/unit.component'
import { MasterComponent } from './master.component'
import { UserComponent } from './user/user.component'
import { ItemComponent } from './item/item.component'
import { UnitNewComponent } from './unit/unit-new/unit-new.component'
import { UnitSearchComponent } from './unit/unit-search/unit-search.component'
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component'
import { ItemNewComponent } from './item/item-new/item-new.component'
import { ItemEditComponent } from './item/item-edit/item-edit.component'
import { ItemSearchComponent } from './item/item-search/item-search.component'
import { ContactComponent } from './contact/contact.component'
import { ContactNewComponent } from './contact/contact-new/contact-new.component'
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component'
import { ContactSearchComponent } from './contact/contact-search/contact-search.component'
import { UserEditComponent } from './user/user-edit/user-edit.component'
import { UserSearchComponent } from './user/user-search/user-search.component'


const routes: Routes = [{
  path: '',
  component: MasterComponent,
  children: [
    {
      path: 'contact',
      component: ContactComponent,
    },
    {
      path: 'item',
      component: ItemComponent,
    },
    {
      path: 'unit',
      component: UnitComponent,
    },
    {
      path: 'user',
      component: UserComponent,
    },
  ],
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}

export const routedComponents = [
  MasterComponent,
  UnitComponent,
  UnitNewComponent,
  UnitEditComponent,
  UnitSearchComponent,
  UserComponent,
  ItemComponent,
  ItemNewComponent,
  ItemEditComponent,
  ItemSearchComponent,
  ContactComponent,
  ContactNewComponent,
  ContactEditComponent,
  ContactSearchComponent,
  UserComponent,
  UserEditComponent,
  UserSearchComponent,
]
