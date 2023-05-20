import { Component, OnInit, ViewChild } from '@angular/core'
import { EContact } from '../../../@entity/e-contact'
import { ContactService } from '../../../services/contact.service'
import { ToasterService } from 'angular2-toaster'
import { Msg, ToastrConfig } from '../../../@config/toastr.config'
import { EAlert } from '../../../@entity/e-alert'
import { ContactEditComponent } from './contact-edit/contact-edit.component'
import { ContactNewComponent } from './contact-new/contact-new.component'
import { ContactSearchComponent } from './contact-search/contact-search.component'
import { delay } from 'q'

@Component({
  selector: 'master-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./../master.component.scss'],
})

export class ContactComponent implements OnInit {
  public showNew: boolean = false
  public showSearch: boolean = false
  public editObj: EContact = new EContact()
  public contacts: Array<EContact> = new Array<EContact>()
  public count: number = 0
  public sort: string = ''
  public sortType: string = ''
  public oHead: EContact = new EContact()
  public page: number = 1
  public searchQuery: string = ''
  @ViewChild('formNew') protected formNew: ContactNewComponent
  @ViewChild('formEdit') protected formEdit: ContactEditComponent
  @ViewChild('formSearch') protected formSearch: ContactSearchComponent
  protected config = ToastrConfig
  protected numOfList: number = 10

  constructor(
    private contactService: ContactService,
    private toasterService: ToasterService,
  ) { }

  changeList(index = 1) {
    this.page = index
    if (this.page < 1) {
      this.page = index = 1
    }
    this.contactService.list(this.numOfList, (index - 1) * this.numOfList, this.sort, this.sortType, this.searchQuery).then((data: any) => {
      this.contacts = data[ 'list' ]
      this.count = data[ 'rows' ]
      if (this.contacts.length <= 0 && this.page > 1) {
        this.page = 1
        this.changeList()
      }
    }).catch(msg => {
      Msg.pop(this.toasterService, msg)
    })
  }

  // Form action
  onSaveCompleted(msg: EAlert) {
    this.toasterService.pop(msg.type, msg.header, msg.body)
    this.changeList(this.page)
    this.formNew.hidden()
    this.formNew.clear()
  }

  onSearch(query: string) {
    this.searchQuery = query
    this.changeList()
  }

  // Sorting
  doSort(name: number | string): void {
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

  isSort(name: number | string) {
    return this.oHead.objects[ name ] === this.sort
  }

  resetData() {
    this.sort = ''
    this.sortType = ''
    this.searchQuery = ''
    this.changeList()
  }

  async edit(obj: EContact) {
    this.formEdit.hide()
    await delay(null, 300)
    this.formEdit.clear()
    this.formEdit.setEntity(obj)
    this.formEdit.visible()
  }

  delete(obj: EContact) {
    if (confirm('Anda yakin akan menghapus?')) {
      this.contactService.delete(obj).then(msg => {
        Msg.pop(this.toasterService, msg)
        if (obj.id === this.formEdit.savedId) {
          this.formEdit.hide()
        }
        if (this.contacts.length <= 1) {
          this.page--
        }
        this.changeList(this.page)
      }).catch(msg => {
        Msg.pop(this.toasterService, msg)
      })
    }
  }

  ngOnInit() {
    this.changeList(this.page)
  }

}
