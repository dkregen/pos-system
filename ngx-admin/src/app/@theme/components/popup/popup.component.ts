import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'popup',
  styleUrls: ['./popup.component.scss'],
  templateUrl: './popup.component.html',
})
export class PopUpComponent implements OnInit {
  @Input() public show: boolean = false
  @Output() public hidding = new EventEmitter<boolean>()

  hide() {
    this.show = false
    this.hidding.emit(this.show)
  }

  ngOnInit() {

  }
}
