import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { ECustomItem } from '../../../@entity/e-custom-item';
import { ETrxItem } from '../../../@entity/e-trx-item';
import { ToasterService } from 'angular2-toaster';
import { Msg } from '../../../@config/toastr.config';

@Component({
  selector: 'cashiering-search-item',
  styleUrls: ['./search-item.component.scss'],
  templateUrl: './search-item.component.html',
  host: { 'class': 'height-full flexbox flexbox-column' }
})
export class SearchItemComponent implements OnInit {
  protected isActive: boolean = false;
  public items: Array<ECustomItem> = new Array();
  protected query: string = "";
  protected choosen: string = "products";
  protected service: ETrxItem = new ETrxItem();
  protected onlyProduct: boolean = false;
  @Output() public onChosen: EventEmitter<ETrxItem> = new EventEmitter();
  @Input() public isServiceDisabled: boolean = false;
  @Input() public toast: ToasterService = null;
  @Input() public invoiceType: number = 0;

  constructor(private itemService: ItemService) { }

  protected moveTo(part: string) {
    if(!this.onlyProduct || part == "products") {
      this.choosen = part;
    }
  }

  public onlyEnableProduct() {
    this.choosen = "products";
    this.onlyProduct = true;
  }

  public enableAll() {
    this.onlyProduct = false;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  chooseAsProduct(e: any) {
    let custom = new ECustomItem().populate(e);
    let item: ETrxItem = new ETrxItem();
    item.itemId = custom.id;
    item.qty = 1;
    item.name = custom.name;
    item.code = custom.code;
    item.price = custom.price;
    item.type = item.TYPE_PRODUCT;
    item.newStock = custom.stock;
    item.oldStock = custom.stock;
    this.onChosen.emit(item);
  }

  chooseAsCompliment(e: any) {
    let custom = new ECustomItem().populate(e);
    let item: ETrxItem = new ETrxItem();
    item.itemId = custom.id;
    item.qty = 1;
    item.name = custom.name;
    item.code = custom.code;
    item.price = 0;
    item.type = item.TYPE_COMPLIMIENT;
    this.onChosen.emit(item);
  }

  chooseAsService() {
    if(this.service.name) {
      this.onChosen.emit((new ETrxItem()).populate(this.service));
    } else {
      this.toast.pop(Msg.error("", "Nama layanan tidak boleh kosong!"));
    }
  }

  checkSubmition(event: any): void {
    if (event.keyCode == 13) {
      this.list();
    }
  }

  list(): void {
    this.itemService.listItemByType(this.query, this.invoiceType).then((data: any) => {
      this.items = data["list"];
    }).catch(e => {
      console.log(e);
    });
  }

  ngOnInit() {
    this.service.type = this.service.TYPE_SERVICE;
    this.service.itemId = null;
    this.service.qty = 1;
  }
}