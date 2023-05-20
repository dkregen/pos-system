import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'master-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss'],
})
export class ContactSearchComponent {

  public query: string = ''
  public show: boolean = false
  @Output() public onSubmit = new EventEmitter<string>()

  toggle() {
    this.show = !this.show
  }

  submit() {
    this.onSubmit.emit(this.query)
    this.show = false
  }
}
