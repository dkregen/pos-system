import { Component, OnInit, ViewChild } from '@angular/core'
import { Msg, ToastrConfig } from '../../../@config/toastr.config'
import { ItemNewComponent } from './item-new/item-new.component'
import { ItemEditComponent } from './item-edit/item-edit.component'
import { ItemSearchComponent } from './item-search/item-search.component'
import { EItem } from '../../../@entity/e-item'
import { EAlert } from '../../../@entity/e-alert'
import { ToasterService } from 'angular2-toaster'
import { ItemService } from '../../../services/item.service'
import { UnitService } from '../../../services/unit.service'
import { EUnit } from '../../../@entity/e-unit'
import { delay } from 'q'

@Component({
  selector: 'master-item',
  templateUrl: './item.component.html',
  styleUrls: ['./../master.component.scss'],
})

export class ItemComponent implements OnInit {
  public showNew: boolean = false
  public showSearch: boolean = false
  public editObj: EItem = new EItem()
  public list: Array<EItem> = new Array<EItem>()
  public count: number = 0
  public sort: string = ''
  public sortType: string = ''
  public oHead: EItem = new EItem()
  public page: number = 1
  public searchQuery: string = ''
  @ViewChild('formNew') protected formNew: ItemNewComponent
  @ViewChild('formEdit') protected formEdit: ItemEditComponent
  @ViewChild('formSearch') protected formSearch: ItemSearchComponent
  protected config = ToastrConfig
  protected numOfList: number = 10
  protected listUnit: Array<EUnit> = []

  constructor(
    private itemService: ItemService,
    private unitService: UnitService,
    protected toasterService: ToasterService,
  ) { }

  changeList(index = 1) {
    this.page = index
    if (this.page < 1) {
      this.page = index = 1
    }
    this.itemService.list(this.numOfList, (index - 1) * this.numOfList, this.sort, this.sortType, this.searchQuery).then((data: any) => {
      this.list = data[ 'list' ]
      this.count = data[ 'rows' ]
      if (this.list.length <= 0 && this.page > 1) {
        this.page = 1
        this.changeList()
      }
      console.log(this.list)
    }).catch(msg => {
      Msg.pop(this.toasterService, msg)
    })
  }

  //Form action
  onSaveCompleted(msg: EAlert) {
    this.changeList(this.page)
  }

  onSearch(query: string) {
    this.searchQuery = query
    this.changeList()
  }

  //Sorting
  doSort(name: string): void {
    if (this.isSort(name)) {
      this.sortType = (this.isDesc() ? '' : 'desc')
    } else {
      this.sort = this.oHead.objects[ name ]
      this.sortType = ''
    }
    this.changeList()
  }

  isDesc() {
    return this.sortType === 'desc'
  }

  isSort(name: string) {
    return this.oHead.objects[ name ] === this.sort
  }

  resetData() {
    this.sort = ''
    this.sortType = ''
    this.searchQuery = ''
    this.changeList()
  }

  async edit(obj: EItem) {
    this.formEdit.hide()
    await delay(null, 300)
    this.formEdit.clear()
    this.formEdit.setEntity(obj)
    this.formEdit.visible()
  }

  delete(obj: EItem) {
    if (confirm('Anda yakin akan menghapus?')) {
      this.itemService.delete(obj).then(msg => {
        Msg.pop(this.toasterService, msg)
        if (obj.id === this.formEdit.savedId) {
          this.formEdit.hide()
        }
        if (this.list.length <= 1) {
          this.page--
        }
        this.changeList(this.page)
      }).catch(msg => {
        Msg.pop(this.toasterService, msg)
      })
    }
  }

  ngOnInit() {
    this.changeList(1)
    this.unitService.list(-1, 0, 'name', 'asc').then((r) => {
      this.formNew.listUnit = r.list
      this.formEdit.listUnit = r.list
    })
  }

}
