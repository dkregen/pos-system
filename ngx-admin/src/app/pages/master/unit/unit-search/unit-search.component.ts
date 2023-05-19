import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'master-unit-search',
  templateUrl: './unit-search.component.html',
  styleUrls: ['./unit-search.component.scss'],
})
export class UnitSearchComponent {
  
  public query: string = "";
  public show: boolean = false;
  @Output() public onSubmit = new EventEmitter<string>();

  toggle() {
    this.show =! this.show;
  }
  
  submit() {
    this.onSubmit.emit(this.query);
    this.show = false;
  }
}