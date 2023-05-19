import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ETrxItem } from '../../../../../@entity/e-trx-item';
import { ECustomItem } from '../../../../../@entity/e-custom-item';

@Component({
  selector: 'invoice-stock',
  styleUrls: ['./invoice-stock.component.scss'],
  templateUrl: './invoice-stock.component.html',
  host: { 'class': 'height-full flexbox flexbox-column' }
})
export class InvoiceStockComponent {
  protected currency: Array<Array<any>> = new Array<Array<any>>();
  public products: Array<ETrxItem> = new Array();
  @Output() public onChange: EventEmitter<void> = new EventEmitter();
  @Input() public class: string = "";
  @Input() public enabled: boolean = true;

  public hasData(): boolean {
    return this.products.length > 0
  }

  private hasItem(item): boolean {
    let items = this.products;
    for (let i = 0; i < items.length; i++) {
      if (items[i].itemId == item.itemId) {
        return true;
      }
    }
  }

  public add(item: ETrxItem) {
    item.qty = 0;
    this.hasItem(item) || (this.products[this.products.length] = item);
    this.triggerChangesAction();
  }

  delete(type: number, id: string) {
    let sample: ETrxItem = new ETrxItem();

    for(let i=0; i<this.products.length; i++) {
      if(this.products[i].itemId == id && this.enabled) {
        this.products.splice(i, 1);
      }
    }
  }

  protected adjustQty(item: ETrxItem) {
    item.qty = item.newStock - item.oldStock;
  }

  protected adjustStock(item: ETrxItem) {
    item.newStock = item.oldStock + item.qty;
  }

  protected triggerChangesAction() {
    this.onChange.emit();
  }

  public show(p: ETrxItem) {
    alert(JSON.stringify(p));
  }
}