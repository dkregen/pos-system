import { Component, OnInit, ViewChild } from '@angular/core';
import { EUnit } from '../../../@entity/e-unit';
import { UnitService } from '../../../services/unit.service';
import { ToasterService } from 'angular2-toaster';
import { ToastrTypes, ToastrConfig, Msg } from '../../../@config/toastr.config';
import { EAlert } from '../../../@entity/e-alert';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitNewComponent } from './unit-new/unit-new.component';
import { UnitSearchComponent } from './unit-search/unit-search.component';
import { delay } from 'q';

@Component({
  selector: 'master-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./../master.component.scss'],
})

export class UnitComponent implements OnInit {
  @ViewChild('formNew') protected formNew: UnitNewComponent;
  @ViewChild('formEdit') protected formEdit: UnitEditComponent;
  @ViewChild('formSearch') protected formSearch: UnitSearchComponent;

  protected config = ToastrConfig;
  public showNew: boolean = false;
  public showSearch: boolean = false;
  public editObj: EUnit = new EUnit();

  public units: Array<EUnit> = new Array<EUnit>();
  public count: number = 0;
  protected numOfList: number = 10;
  public sort: string = "";
  public sortType: string = "";
  public oHead: EUnit = new EUnit();
  public page: number = 1;
  public searchQuery: string = '';

  constructor(
    private unitService: UnitService,
    private toasterService: ToasterService
  ) { }

  changeList(index = 1) {
    this.page = index;
    if (this.page < 1) {
      this.page = index = 1;
    }
    this.unitService.list(this.numOfList, (index - 1) * this.numOfList, this.sort, this.sortType, this.searchQuery).then((data: any) => {
      this.units = data['list'];
      this.count = data['rows'];
      if (this.units.length <= 0 && this.page > 1) {
        this.page = 1;
        this.changeList();
      }
    }).catch(msg => {
      Msg.pop(this.toasterService, msg);
    });
  }

  //Form action
  onSaveCompleted(msg: EAlert) {
    this.toasterService.pop(msg.type, msg.header, msg.body);
    this.changeList(this.page);
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.changeList();
  }

  //Sorting
  doSort(name: string): void {
    if (this.isSort(name)) {
      this.sortType = (this.isDesc() ? "" : "desc");
    } else {
      this.sort = this.oHead.objects[name];
      this.sortType = "";
    }
    this.changeList();
  }

  isDesc() {
    return this.sortType === 'desc';
  }

  isSort(name: string) {
    return this.oHead.objects[name] === this.sort;
  }

  resetData() {
    this.sort = "";
    this.sortType = "";
    this.searchQuery = "";
    this.changeList();
  }

  async edit(obj: EUnit) {
    this.formEdit.hide();
    await delay(null, 300);
    this.formEdit.clear();
    this.formEdit.setEntity(obj);
    this.formEdit.visible();
  }

  delete(obj: EUnit) {
    if (confirm("Anda yakin akan menghapus?")) {
      this.unitService.delete(obj).then(msg => {
        Msg.pop(this.toasterService, msg);
        if (obj.id === this.formEdit.savedId) {
          this.formEdit.hide();
        }
        if (this.units.length <= 1) {
          this.page--;
        }
        this.changeList(this.page);
      }).catch(msg => {
        Msg.pop(this.toasterService, msg);
      });
    }
  }

  ngOnInit() {
    this.changeList(this.page);
  }

}
