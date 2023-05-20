import { Component, EventEmitter, Output } from '@angular/core'
import { ContactService } from '../../../../services/contact.service'
import { EContact } from '../../../../@entity/e-contact'
import { EAlert } from '../../../../@entity/e-alert'

@Component({
  selector: 'master-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})

export class ContactEditComponent {
  public savedId: string = ''
  public show: boolean = false
  public ent: EContact = new EContact()
  public entBackup: EContact = new EContact()
  @Output() public complete = new EventEmitter()

  constructor(
    private contactService: ContactService,
  ) { }

  public setEntity(o: EContact) {
    this.ent = o
    this.entBackup = new EContact()
    this.entBackup.populate(o)
  }

  onSubmit() {
    let mirror: EContact = (new EContact()).populate(this.ent)
    var mess: EAlert = mirror.checkForm()
    if (!mess) {
      this.contactService.update(mirror).then(msg => {
        this.complete.emit(msg)
        this.savedId = mirror.id
      }).catch(msg => {
        this.complete.emit(msg)
      })
    } else {
      this.complete.emit(mess)
    }
  }

  toggle() {
    this.show = !this.show
    if (!this.show) {
      this.clear()
    }
  }

  clear() {
    if (!this.saved()) {
      this.entBackup.copyTo(this.ent)
    }
    this.ent = new EContact()
    this.entBackup = new EContact()
    this.savedId = ''
  }

  visible() {
    this.show = true
  }

  hide() {
    this.show = false
  }

  private saved() {
    return this.savedId === this.ent.id
  }
}
