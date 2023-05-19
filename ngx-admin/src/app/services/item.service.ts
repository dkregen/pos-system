import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { EItem } from '../@entity/e-item'
import { Msg } from '../@config/toastr.config'
import { ECustomItem } from '../@entity/e-custom-item'
import { ToasterService } from 'angular2-toaster'
import { ETrxInvoice } from '../@entity/e-trx-invoice'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) { }

  insert(item): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>('api/item/insertWithPicture', item)
        .subscribe(
          data => {
            console.log(data)
            data[ 'data' ][ 'message' ][ 'id' ] = data[ 'data' ][ 'id' ]
            resolve(data[ 'data' ][ 'message' ])
          },
          error => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          },
        )
    })
  }

  async insertWithPicture(toast: ToasterService, item): Promise<string> {
    this.loader.increase()
    let id = '0'
    try {
      let r = await this.http.post<any>('api/item/insertWithPicture', item).toPromise()
      if (r[ 'data' ][ 'message' ]) {
        Msg.pop(toast, r[ 'data' ][ 'message' ])
      }
      id = r[ 'id' ]
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return id
  }

  async updateWithPicture(toast: ToasterService, item, id): Promise<string> {
    this.loader.increase()
    let returnId = '0'
    try {
      let r = await this.http.post<any>('api/item/updateWithPicture/' + id, item).toPromise()
      if (r[ 'data' ][ 'message' ]) {
        Msg.pop(toast, r[ 'data' ][ 'message' ])
      }
      returnId = r[ 'id' ]
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return returnId
  }

  update(item, id): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>('api/item/updateWithPicture/' + id, item)
        .subscribe(
          data => {
            console.log(data)
            resolve(data[ 'data' ][ 'message' ])
          },
          error => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          },
        )
    })
  }

  delete(item: EItem): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/item/delete/' + item.id)
        .subscribe(
          data => {
            resolve(data[ 'data' ][ 'message' ])
          },
          error => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          },
        )
    })
  }

  list(limit: number, index: number, orderBy?: string, orderType?: string, query = ''): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/item/list/' + limit + '/' + index + '/' + orderBy + '/' + orderType + '?where=' + query)
        .subscribe(
          data => {
            let arr: Array<EItem> = new Array()
            for (let i = 0; i < data[ 'data' ][ 'list' ].length; i++) {
              arr[ i ] = (new EItem()).populate(data[ 'data' ][ 'list' ][ i ])
            }
            data[ 'data' ][ 'list' ] = arr
            resolve(data[ 'data' ])
          },
          error => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          })
    })
  }

  listItemByType(query: string, invType: number, limit = 0, index = 0): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      let item
      switch (invType) {
        case ETrxInvoice.TYPE_SELLING:
          item = 'search-price-sell'
          break
        case ETrxInvoice.TYPE_RECEIVE:
          item = 'search-price-buy'
          break
        default:
          item = 'search-stock'
          break
      }
      this.http.get<any>('api/item/' + item + '/' + limit + '/' + index + '?query=' + query)
        .subscribe(
          data => {
            console.log('Dari service ...', data[ 'data' ])
            resolve(data[ 'data' ])
          },
          error => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          })
    })
  }

  async listItems(toast: ToasterService, query: string, limit = 0, index = 0): Promise<Array<ECustomItem>> {
    this.loader.increase()
    let items = new Array()
    try {
      let r = await this.http.get<any>('api/item/search-price/' + limit + '/' + index + '?query=' + query).toPromise()
      console.log(r)
      if ('data' in r) {
        let data: Array<any> = r[ 'data' ][ 'list' ]
        for (let i = 0; i < data.length; i++) {
          let item: ECustomItem = new ECustomItem()
          item.populate(data[ i ])
          item.price = 0
          console.log(i, item)
          items[ i ] = item
        }
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }
    this.loader.decrease()
    return items
  }

}
