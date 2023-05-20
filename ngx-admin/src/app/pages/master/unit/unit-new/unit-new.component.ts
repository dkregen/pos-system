import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UnitService } from '../../../../services/unit.service'
import { EUnit } from '../../../../@entity/e-unit'
import { EAlert } from '../../../../@entity/e-alert'

@Component({
  selector: 'master-unit-new',
  templateUrl: './unit-new.component.html',
  styleUrls: ['./unit-new.component.scss'],
})

export class UnitNewComponent implements OnInit {

  public show: boolean = false
  @Output() public complete = new EventEmitter()
  protected ent: EUnit = new EUnit()

  constructor(
    private unitService: UnitService,
  ) { }

  onSubmit() {
    var mess: EAlert = this.ent.checkForm()
    if (!mess) {
      this.unitService.insert(this.ent).then(msg => {
        this.complete.emit(msg)
      }).catch(msg => {
        this.complete.emit(msg)
      })
    } else {
      this.complete.emit(mess)
    }
  }

  toggle() {
    this.show = !this.show
    if (this.show) {
      this.ent = new EUnit()
    }
  }

  visible() {
    this.show = true
  }

  ngOnInit() {

  }
}
