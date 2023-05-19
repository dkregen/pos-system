import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'side-container',
  styleUrls: ['./side-container.component.scss'],
  templateUrl: './side-container.component.html',
})
export class SideContainerComponent implements OnInit {
  @Input() public show: boolean = false;
  @Input() public width: number = 350;

  constructor() { }

  ngOnInit() {
  }
}
