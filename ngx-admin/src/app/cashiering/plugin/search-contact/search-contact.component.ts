import { Component, EventEmitter, Input, Output } from '@angular/core'
import { EContact } from '../../../@entity/e-contact'
import { ContactService } from '../../../services/contact.service'

@Component({
  selector: 'cashiering-search-contact',
  styleUrls: ['./search-contact.component.scss'],
  templateUrl: './search-contact.component.html',
})
export class SearchContactComponent {
  @Input() public alwaysOn: boolean = false
  @Output() public onChose: EventEmitter<EContact> = new EventEmitter<EContact>()
  protected isActive: boolean = false
  protected contacts: Array<EContact> = []
  protected query: string = ''
  private obj: EContact = new EContact()

  constructor(private contactService: ContactService) { }

  activate() {
    this.isActive = true
  }

  deactivate() {
    this.isActive = false
  }

  choose(c: EContact) {
    this.onChose.emit(c)
    this.deactivate()
  }

  checkSubmition(event: any): void {
    if (event.keyCode == 13) {
      this.contactService.list(100, 0, this.obj.NAMES[ this.obj.name ], 'asc', this.query)
        .then((data: any) => {
          this.contacts = this.contacts = data[ 'list' ]
        }).catch(e => {
        console.log(e)
      })
    }
  }
}
