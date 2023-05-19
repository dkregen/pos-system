import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EAlert } from '../../../../@entity/e-alert';
import { EItem } from '../../../../@entity/e-item';
import { ItemService } from '../../../../services/item.service';
import { EUnit } from '../../../../@entity/e-unit';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'master-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})

export class ItemEditComponent {

  private fileData: any = null;
  public savedId: string = "";
  public show: boolean = false;
  public ent: EItem = new EItem();
  public entBackup: EItem = new EItem();
  public listUnit: Array<EUnit> = new Array();
  @Output() public complete = new EventEmitter();
  @Input() public toast: ToasterService = null;

  constructor(
    private itemService: ItemService
  ) { }

  private saved() {
    return this.savedId === this.ent.id;
  }

  public setEntity(o: EItem) {
    this.ent.populate(o);
    this.entBackup = new EItem();
    this.entBackup.populate(o);
  }

  onFileChange(e) {
    this.fileData = e.target.files[0];
    console.log(this.fileData);
  }

  onSubmit() {
    (async () => {
      try {
        let mirror: EItem = (new EItem()).populate(this.ent);
        let form = new FormData();
        mirror.appendUploader(form);
        form.append("pict", this.fileData || {});
        var mess: EAlert = mirror.checkForm();
        if (!mess) {
          let id = await this.itemService.updateWithPicture(this.toast, form, mirror.id);
          this.savedId = id;
        } else {
          this.toast.pop(mess);
        }
      } catch (e) {
        console.log(e);
      }
      this.complete.emit(this.ent);
    })();
  }

  toggle() {
    this.show = !this.show;
    if (!this.show) {
      this.clear();
    }
  }

  clear() {
    if (!this.saved()) {
      this.entBackup.copyTo(this.ent);
    }
    this.ent = new EItem();
    this.entBackup = new EItem();
    this.savedId = "";
  }

  visible() {
    this.show = true;
  }

  hide() {
    this.show = false;
  }
}