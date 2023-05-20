import { ThemeModule } from '../../@theme/theme.module'
import { NgxEchartsModule } from 'ngx-echarts'
import { NgModule } from '@angular/core'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule {}
