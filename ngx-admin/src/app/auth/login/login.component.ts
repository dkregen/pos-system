/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbAuthSocialLink } from '@nebular/auth'
import { getDeepFromObject } from '../helpers'

@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent {

  redirectDelay: number = 0
  showMessages: any = {}
  strategy: string = ''

  errors: string[] = []
  messages: string[] = []
  user: any = {}
  submitted: boolean = false
  socialLinks: NbAuthSocialLink[] = []
  rememberMe = false

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private route: ActivatedRoute) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay')
    this.showMessages = this.getConfigValue('forms.login.showMessages')
    this.strategy = this.getConfigValue('forms.login.strategy')
    this.socialLinks = this.getConfigValue('forms.login.socialLinks')
    this.route.queryParams.subscribe(params => {
      if (params[ 'origin' ] === 'register') {
        this.messages = ['You\'ve been successfully registered. Please ask the Administrator to verify your account.']
      }
    })

  }

  login(): void {
    this.errors = this.messages = []
    this.submitted = true

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false
      if (result.isSuccess()) {
        this.messages = result.getMessages()
      } else {
        this.errors = result.getErrors()
      }

      const redirect = result.getRedirect()
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect)
        }, this.redirectDelay)
      }
      this.cd.detectChanges()
    })
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null)
  }
}
