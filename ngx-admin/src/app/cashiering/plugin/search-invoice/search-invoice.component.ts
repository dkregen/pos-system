import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ETrxInvoice } from '../../../@entity/e-trx-invoice';
import { InvoiceService } from '../../../services/invoice.service';
import { ToasterService } from 'angular2-toaster';
import { ECustomInvoice } from '../../../@entity/e-custom-invoice';

@Component({
  selector: 'cashiering-search-invoice',
  styleUrls: ['./search-invoice.component.scss'],
  templateUrl: './search-invoice.component.html',
})
export class SearchInvoiceComponent {
  @Output() public onChose: EventEmitter<ETrxInvoice> = new EventEmitter<ETrxInvoice>();
  @Input() public toast: ToasterService = null;
  @Input() public type: number = 0;
  public list: Array<ECustomInvoice> = new Array();
  protected isActive: boolean = false;
  protected query: string = "";

  constructor(
    private invoiceService: InvoiceService
  ){}

  public activate() {
    this.isActive = true;
  }

  checkSubmition(event: any): void {
    if (event.keyCode == 13) {
      (async () => {
        this.list = await this.invoiceService.search(this.toast, this.type, this.query);
      })();
    }
  }

  choose(id: string) {
    (async () => {
      let invoice = await this.invoiceService.retrieve(this.toast, id);
      invoice.payment.id = "-1";
      this.onChose.emit(invoice);
      this.deactivate();
    })();
  }

  deactivate() {
    this.isActive = false;
  }
}