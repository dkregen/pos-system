import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ETrxInvoice } from '../../../@entity/e-trx-invoice'

@Component({
  selector: 'invoice',
  styleUrls: ['./invoice.component.scss'],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent {
  @Input() public invoice: ETrxInvoice = new ETrxInvoice()
  @Output() public onSave: EventEmitter<void> = new EventEmitter()
  @Input() public hide: boolean = false
  @Input() readonly: boolean = false

  protected title: string = ''
  protected txtType = ETrxInvoice.txtType

  constructor() {
  }

  protected getWindow(): any {
    return window
  }
}
