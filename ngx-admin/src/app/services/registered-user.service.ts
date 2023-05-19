import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoaderService } from './loader.service'
import { Msg } from '../@config/toastr.config'
import { EUser } from '../@entity/e-user'
import { ToasterService } from 'angular2-toaster'

@Injectable({
  providedIn: 'root',
})
export class RegisteredUserService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) { }

  update(form: FormData): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>('/api/user/profile', form)
        .subscribe(
          data => {
            console.log(data)
            resolve(data[ 'data' ][ 'message' ])
          },
          (error) => {
            reject(Msg.errorStatus(error))
            this.loader.decrease()
          },
          () => {
            this.loader.decrease()
          })
    })
  }

  async get(toaster: ToasterService, idUser: string): Promise<EUser> {
    let user: EUser = new EUser()
    this.loader.increase()
    try {
      let r = await this.http.get('api/user/get/' + idUser).toPromise()
      user.populate(r[ 'data' ])
      console.log('test', r)
    } catch (e) {
      console.log(e)
      toaster.pop(Msg.errorStatus(e))
    }
    this.loader.decrease()
    return user
  }

  list(limit: number, index: number, orderBy?: string, orderType?: string, query = ''): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/user/list/' + limit + '/' + index + '/' + orderBy + '/' + orderType + '?where=' + query)
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

  toggleStatus(id: string): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.get<any>('api/user/toggle-status/' + id)
        .subscribe(
          data => {
            this.loader.decrease()
            resolve(data[ 'data' ][ 'message' ])
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
