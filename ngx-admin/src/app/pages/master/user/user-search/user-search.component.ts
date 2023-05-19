import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'master-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {

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
