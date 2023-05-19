/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CoreModule } from './@core/core.module'
import { ThemeModule } from './@theme/theme.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme'
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth'
import { NbEvaIconsModule } from '@nebular/eva-icons'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '',
          token: {
            class: NbAuthJWTToken,
          },
          login: {
            endpoint: '/api/auth/sign-in',
            method: 'post',
          },
          register: {
            endpoint: '/api/auth/sign-up',
            method: 'post',
          },
          logout: {
            endpoint: '/api/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/api/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/api/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
