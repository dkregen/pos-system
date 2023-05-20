import { Component, OnInit, ViewChild } from '@angular/core'
import { EUser } from '../../../@entity/e-user'
import { RegisteredUserService } from '../../../services/registered-user.service'
import { ToasterService } from 'angular2-toaster'
import { Msg, ToastrConfig } from '../../../@config/toastr.config'
import { EAlert } from '../../../@entity/e-alert'
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserSearchComponent } from './user-search/user-search.component'
import { delay } from 'q'

@Component({
  selector: 'master-user',
  templateUrl: './user.component.html',
  styleUrls: ['./../master.component.scss'],
})

export class UserComponent implements OnInit {
  public showNew: boolean = false
  public showSearch: boolean = false
  public editObj: EUser = new EUser()
  public users: Array<EUser> = new Array<EUser>()
  public count: number = 0
  public sort: string = ''
  public sortType: string = ''
  public oHead: EUser = new EUser()
  public page: number = 1
  public searchQuery: string = ''
  @ViewChild('formEdit') protected formEdit: UserEditComponent
  @ViewChild('formSearch') protected formSearch: UserSearchComponent
  protected config = ToastrConfig
  protected numOfList: number = 10

  constructor(
    private userService: RegisteredUserService,
    private toasterService: ToasterService,
  ) { }

  changeList(index = 1) {
    this.page = index
    if (this.page < 1) {
      this.page = index = 1
    }
    this.userService.list(this.numOfList, (index - 1) * this.numOfList, this.sort, this.sortType, this.searchQuery).then((data: any) => {
      this.users = data[ 'list' ]
      this.count = data[ 'rows' ]
      if (this.users.length <= 0 && this.page > 1) {
        this.page = 1
        this.changeList()
      }
    }).catch(msg => {
      Msg.pop(this.toasterService, msg)
    })
  }

  //Form action
  onSaveCompleted(msg: EAlert) {
    this.toasterService.pop(msg.type, msg.header, msg.body)
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

  async edit(obj: EUser) {
    this.formEdit.hide()
    await delay(null, 300)
    this.formEdit.clear()
    this.formEdit.setEntity(obj)
    this.formEdit.visible()
  }

  toggleStatus(obj: EUser) {
    this.userService.toggleStatus(obj.id).then((msg: EAlert) => {
      Msg.pop(this.toasterService, msg)
      this.changeList(this.page)
    }).catch(msg => {
      Msg.pop(this.toasterService, msg)
    })
  }

  ngOnInit() {
    this.changeList(this.page)
  }

}
