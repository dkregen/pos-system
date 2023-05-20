import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { ECustomInvoice } from '../@entity/e-custom-invoice'
import { ToasterService } from 'angular2-toaster'
import { Msg } from '../@config/toastr.config'
import { ETrxInvoice } from '../@entity/e-trx-invoice'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) { }

  async search(toast: ToasterService, type = 0, query = ''): Promise<Array<ECustomInvoice>> {
    this.loader.increase()
    let arr = []
    try {
      let r = await this.http.get<any>(environment.api + '/trx/search-invoice?where=' + query + '&type=' + type).toPromise()
      if ('list' in r[ 'data' ]) {
        for (let i = 0; i < r[ 'data' ][ 'list' ].length; i++) {
          let inv: ECustomInvoice = new ECustomInvoice()
          inv.populate(r[ 'data' ][ 'list' ][ i ])
          arr[ i ] = inv
        }
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return arr
  }

  async toggleVoid(toast: ToasterService, id: string): Promise<number> {
    this.loader.increase()
    let n: number
    try {
      let r = await this.http.get<any>(environment.api + '/trx/toggle-void/' + id).toPromise()
      if (!!r[ 'data' ][ 'status' ]) {
        (n = parseInt(r[ 'data' ][ 'status' ]))
        toast.pop(Msg.success('', 'Status berhasil diubah.'))
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return n
  }

  async changeContact(toast: ToasterService, idInvoice: string, idContact: string): Promise<number> {
    this.loader.increase()
    let n: number
    try {
      let r = await this.http.get<any>(environment.api + '/trx/change-contact/' + idInvoice + '/' + idContact).toPromise()
      if (!!r[ 'data' ][ 'status' ]) {
        (n = parseInt(r[ 'data' ][ 'status' ]))
        toast.pop(Msg.success('', 'Kontak berhasil diubah.'))
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return n
  }

  async retrieve(toast: ToasterService, id: string): Promise<ETrxInvoice> {
    this.loader.increase()
    let obj: ETrxInvoice = new ETrxInvoice()
    try {
      let r = await this.http.get<any>(environment.api + '/trx/bring-back/' + id).toPromise()
      if (!!r && 'object' in r[ 'data' ]) {
        obj.populate(r[ 'data' ][ 'object' ])
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return obj
  }

}
