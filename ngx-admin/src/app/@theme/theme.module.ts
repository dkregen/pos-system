import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule, NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule,
  NbTooltipModule, NbTreeGridModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme'

import { NbSecurityModule } from '@nebular/security'

import { FooterComponent, HeaderComponent, SearchInputComponent, TinyMCEComponent } from './components'
import { CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe } from './pipes'
import { OneColumnLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent } from './layouts'
import { DEFAULT_THEME } from './styles/theme.default'
import { COSMIC_THEME } from './styles/theme.cosmic'
import { CORPORATE_THEME } from './styles/theme.corporate'
import { SideContainerComponent } from './components/side-container/side-container.component'
import { PopUpComponent } from './components/popup/popup.component'
import { InputCurrencyComponent } from './components/input-currency/input-currency.component'

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule]

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbSecurityModule, // *nbIsGranted directive,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbToastrModule,
  NbInputModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
  NbIconModule,
]

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  SideContainerComponent,
  PopUpComponent,
  InputCurrencyComponent,
]

const ENTRY_COMPONENTS = []

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
]

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDatepickerModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
  ...NbWindowModule.forRoot().providers,
  ...NbToastrModule.forRoot().providers,
  ...NbChatModule.forRoot({
    messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
  }).providers,
]

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, NbTreeGridModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    }
  }
}
