import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ETrxItem } from '../../../../../@entity/e-trx-item'
import { ECustomItem } from '../../../../../@entity/e-custom-item'

@Component({
  selector: 'invoice-receipt',
  styleUrls: ['./invoice-receipt.component.scss'],
  templateUrl: './invoice-receipt.component.html',
  host: { 'class': 'height-full flexbox flexbox-column' },
})
export class InvoiceReceiptComponent {
  public products: Array<ETrxItem> = []
  public services: Array<ETrxItem> = []
  public compliments: Array<ETrxItem> = []
  @Output() public onChange: EventEmitter<void> = new EventEmitter()
  @Input() public class: string = ''
  @Input() public enabled: boolean = true
  protected currency: Array<Array<any>> = new Array<Array<any>>()

  public hasData(): boolean {
    return this.products.length > 0
      || this.services.length > 0
      || this.compliments.length > 0
  }

  public add(item: ETrxItem) {
    switch (item.type) {
      case ECustomItem.TYPE_PRODUCT:
        this.addQty(item, this.products) || (this.products[ this.products.length ] = item)
        break
      case ECustomItem.TYPE_SERVICE:
        this.services[ this.services.length ] = item
        break
      case ECustomItem.TYPE_COMPLIMENT:
        this.addQty(item, this.compliments) || (this.compliments[ this.compliments.length ] = item)
        break
    }
    this.triggerChangesAction()
  }

  delete(type: number, id: string) {
    if (this.enabled) {
      let items: Array<ETrxItem> = null
      let sample: ETrxItem = new ETrxItem()
      switch (type) {
        case sample.TYPE_PRODUCT:
          items = this.products
          break
        case sample.TYPE_SERVICE:
          items = this.services
          break
        case sample.TYPE_COMPLIMIENT:
          items = this.compliments
          break
      }

      for (let i = 0; i < items.length; i++) {
        if (items[ i ].itemId == id) {
          items.splice(i, 1)
        }
      }
    }
  }

  public show(p: ETrxItem) {

  }

  protected triggerChangesAction() {
    this.onChange.emit()
  }

  private addQty(item, items): boolean {
    for (let i = 0; i < items.length; i++) {
      if (items[ i ].itemId == item.itemId) {
        items[ i ].qty++
        return true
      }
    }
  }
}
