import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../../../services/contact.service';
import { EContact } from '../../../../@entity/e-contact';
import { EAlert } from '../../../../@entity/e-alert';

@Component({
  selector: 'master-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss'],
})

export class ContactNewComponent implements OnInit {

  protected ent: EContact = new EContact();
  public show: boolean = false;
  @Output() public complete = new EventEmitter();

  constructor(
    private contactService: ContactService
  ) { }

  onSubmit() {
    var mess: EAlert = this.ent.checkForm();
    if (!mess) {
      this.contactService.insert(this.ent).then(msg => {
        this.complete.emit(msg);
      }).catch(msg => {
        this.complete.emit(msg);
      });
    } else {
      this.complete.emit(mess);
    }
  }

  toggle() {
    this.show = !this.show;
    if(this.show) {
      this.ent = new EContact();
    }
  }

  visible() {
    this.show = true;
  }

  hidden() {
    this.show = false;
  }

  clear() {
    this.ent = new EContact();
  }

  ngOnInit() {

  }
}
