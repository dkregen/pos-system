import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ETrxItem } from '../../../../../@entity/e-trx-item'

@Component({
  selector: 'invoice-stock',
  styleUrls: ['./invoice-stock.component.scss'],
  templateUrl: './invoice-stock.component.html',
  host: { 'class': 'height-full flexbox flexbox-column' },
})
export class InvoiceStockComponent {
  public products: Array<ETrxItem> = []
  @Output() public onChange: EventEmitter<void> = new EventEmitter()
  @Input() public class: string = ''
  @Input() public enabled: boolean = true
  protected currency: Array<Array<any>> = new Array<Array<any>>()

  public hasData(): boolean {
    return this.products.length > 0
  }

  public add(item: ETrxItem) {
    item.qty = 0
    this.hasItem(item) || (this.products[ this.products.length ] = item)
    this.triggerChangesAction()
  }

  delete(type: number, id: string) {
    let sample: ETrxItem = new ETrxItem()

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[ i ].itemId == id && this.enabled) {
        this.products.splice(i, 1)
      }
    }
  }

  public show(p: ETrxItem) {
    alert(JSON.stringify(p))
  }

  protected adjustQty(item: ETrxItem) {
    item.qty = item.newStock - item.oldStock
  }

  protected adjustStock(item: ETrxItem) {
    item.newStock = item.oldStock + item.qty
  }

  protected triggerChangesAction() {
    this.onChange.emit()
  }

  private hasItem(item): boolean {
    let items = this.products
    for (let i = 0; i < items.length; i++) {
      if (items[ i ].itemId == item.itemId) {
        return true
      }
    }
  }
}
