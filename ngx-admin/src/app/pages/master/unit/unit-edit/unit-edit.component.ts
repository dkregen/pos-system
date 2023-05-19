import { Component, EventEmitter, Output } from '@angular/core'
import { UnitService } from '../../../../services/unit.service'
import { EUnit } from '../../../../@entity/e-unit'
import { EAlert } from '../../../../@entity/e-alert'

@Component({
  selector: 'master-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss'],
})

export class UnitEditComponent {
  public savedId: string = ''
  public show: boolean = false
  public ent: EUnit = new EUnit()
  public entBackup: EUnit = new EUnit()
  @Output() public complete = new EventEmitter()

  constructor(
    private unitService: UnitService,
  ) { }

  private saved() {
    return this.savedId === this.ent.id
  }

  public setEntity(o: EUnit) {
    this.ent = o
    this.entBackup = new EUnit()
    this.entBackup.populate(o)
  }

  onSubmit() {
    let mirror: EUnit = (new EUnit()).populate(this.ent)
    var mess: EAlert = mirror.checkForm()
    if (!mess) {
      this.unitService.update(mirror).then(msg => {
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
    this.ent = new EUnit()
    this.entBackup = new EUnit()
    this.savedId = ''
  }

  visible() {
    this.show = true
  }

  hide() {
    this.show = false
  }
}
