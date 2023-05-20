import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { EUnit } from '../@entity/e-unit'
import { Msg } from '../@config/toastr.config'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) {}

  insert(unit: EUnit): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.api + '/unit/insert', unit.objectToJson())
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

  update(unit: EUnit): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.api + '/unit/update/' + unit.id, unit.objectToJson())
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

  delete(unit: EUnit): Promise<any> {
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
      this.http.get<any>(environment.api + '/unit/list/' + limit + '/' + index + '/' + orderBy + '/' + orderType + '?where=' + query)
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
