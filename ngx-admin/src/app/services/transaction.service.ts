import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { Injectable } from '@angular/core'
import { ETrxInvoice } from '../@entity/e-trx-invoice'
import { Msg } from '../@config/toastr.config'
import { ToasterService } from 'angular2-toaster'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient, private loader: LoaderService) {}

  async insert(
    toaster: ToasterService,
    inv: ETrxInvoice,
  ): Promise<ETrxInvoice> {
    let invoice: ETrxInvoice = new ETrxInvoice()
    this.loader.increase()
    try {
      let json = JSON.parse(JSON.stringify(inv))
      let r = await this.http.post(environment.api + '/trx/insert', json).toPromise()
      console.log('dariService', r)
      let obj = r[ 'data' ][ 'object' ]
      if (obj != undefined && !!obj) {
        invoice.populate(obj)
        console.log('Invoice dari transaksi', obj, invoice)
        if (invoice.hasId()) {
          toaster.pop(Msg.success('', 'Data berhasil disimpan.'))
        }
      } else if (r[ 'data' ][ 'message' ] != undefined) {
        r[ 'data' ][ 'message' ][ 'body' ] = r[ 'data' ][ 'message' ][ 'body' ].replace(/\n/g, '<br/>')
        toaster.pop(r[ 'data' ][ 'message' ])
      } else {
        toaster.pop(Msg.error('', 'Terjadi kesalahan ketika menyimpan.'))
      }
    } catch (e) {
      console.log(e)
      toaster.pop(Msg.errorStatus(e))
    }
    this.loader.decrease()
    return invoice
  }
}
