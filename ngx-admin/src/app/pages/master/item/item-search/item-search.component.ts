import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'master-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss'],
})
export class ItemSearchComponent {

  @Input() public query: string = ''
  @Input() public show: boolean = false
  @Output() public hidding = new EventEmitter<boolean>()
  @Output() public onSubmit = new EventEmitter<string>()

  toggle() {
    this.show = !this.show
    this.hidding.emit(this.show)
  }

  submit() {
    this.onSubmit.emit(this.query)
    this.show = false
  }
}
