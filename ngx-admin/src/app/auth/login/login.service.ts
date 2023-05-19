import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Msg } from '../../@config/toastr.config'
import { LoaderService } from '../../services/loader.service'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    public http: HttpClient,
    public loader: LoaderService,
  ) { }

  public doLogin() {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>('api/unit/update/' + unit.id, unit.objectToJson())
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
}
