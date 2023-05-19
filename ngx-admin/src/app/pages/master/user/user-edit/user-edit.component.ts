import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegisteredUserService } from '../../../../services/registered-user.service';
import { EUser } from '../../../../@entity/e-user';
import { EAlert } from '../../../../@entity/e-alert';

@Component({
  selector: 'master-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})

export class UserEditComponent {
  protected oHead: EUser = new EUser();
  public savedId: string = "";
  public show: boolean = false;
  public ent: EUser = new EUser();
  public entBackup: EUser = new EUser();
  @Output() public complete = new EventEmitter();

  constructor(
    private userService: RegisteredUserService
  ) { }

  private saved() {
    return this.savedId === this.ent.id;
  }

  public setEntity(o: EUser) {
    this.ent = o;
    this.entBackup = new EUser();
    this.entBackup.populate(o);
  }

  onSubmit() {
    let mirror: EUser = (new EUser()).populate(this.ent);
    var mess: EAlert = mirror.checkForm();
    if (!mess) {
      let form = new FormData();
      mirror.appendUploader(form);
      this.userService.update(form).then(msg => {
        this.complete.emit(msg);
        this.savedId = mirror.id;
      }).catch(msg => {
        this.complete.emit(msg);
      });
    } else {
      this.complete.emit(mess);
    }
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
    this.ent = new EUser();
    this.entBackup = new EUser();
    this.savedId = "";
  }
  
  visible() {
    this.show = true;
    console.log(this.ent)
  }
  
  hide() {
    this.show = false;
  }
}