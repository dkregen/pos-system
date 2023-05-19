import { Component } from '@angular/core'
import { AuthGuard } from '../services/auth-guard.service'
import { MENU_ITEMS } from './pages-menu'

@Component({
  selector: 'ngx-pages',
  template: `
	  <ngx-one-column-layout>
		  <nb-menu [items]="menu"></nb-menu>
		  <router-outlet></router-outlet>
	  </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  constructor(
    private auth: AuthGuard,
  ) {}

  menu = this.auth.getMenu()
}
