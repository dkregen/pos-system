import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { Msg } from '../@config/toastr.config'
import { EContact } from '../@entity/e-contact'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) {}

  insert(contact: EContact): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.api + '/contact/insert', contact.objectToJson())
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

  update(contact: EContact): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.api + '/contact/update/' + contact.id, contact.objectToJson())
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

  delete(unit: EContact): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.get<any>(environment.api + '/unit/delete/' + unit.id)
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
      this.http.get<any>(environment.api + '/contact/list/' + limit + '/' + index + '/' + orderBy + '/' + orderType + '?where=' + query)
        .subscribe(
          data => {
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
}
