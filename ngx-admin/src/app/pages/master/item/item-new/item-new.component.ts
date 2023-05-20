import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EUnit } from '../../../../@entity/e-unit'
import { EAlert } from '../../../../@entity/e-alert'
import { EItem } from '../../../../@entity/e-item'
import { ItemService } from '../../../../services/item.service'
import { AuthGuard } from '../../../../services/auth-guard.service'
import { ToasterService } from 'angular2-toaster'

@Component({
  selector: 'master-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss'],
})

export class ItemNewComponent implements OnInit {

  public show: boolean = false
  public listUnit: Array<EUnit> = []
  @Output() public complete = new EventEmitter()
  @Input() public toast: ToasterService = null
  protected ent: EItem = null
  protected priceType: number = 1
  private fileData: any = null

  constructor(
    private itemService: ItemService,
    private auth: AuthGuard,
  ) { }

  onFileChange(e) {
    this.fileData = e.target.files[ 0 ]
    console.log(this.fileData)
  }

  onSubmit() {
    (async () => {
      let form = new FormData()
      this.ent.appendUploader(form)
      form.append('pict', this.fileData || {})
      var mess: EAlert = this.ent.checkForm()
      try {
        if (!mess) {
          if (!this.ent.hasId()) {
            let id = await this.itemService.insertWithPicture(this.toast, form)
            this.ent.id = id
          } else {
            await this.itemService.updateWithPicture(this.toast, form, this.ent.id)
          }
        } else {
          this.toast.pop(mess)
        }
      } catch (e) {
        console.log(e)
      }
      this.complete.emit(this.ent)
    })()
  }

  toggle() {
    this.show = !this.show
    if (this.show) {
      this.ent = new EItem()
    }
  }

  visible() {
    this.show = true
  }

  ngOnInit() {
    this.ent = new EItem()
    this.ent.userId = this.auth.getPayloadId()
  }

}
