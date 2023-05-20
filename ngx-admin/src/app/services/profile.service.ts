import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { EUser } from '../@entity/e-user'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LoaderService } from './loader.service'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) {}

  getUser(id: string): Observable<EUser> {
    return this.http.get(environment.api + '/user/get/' + id)
      .pipe(map(r => r[ 'data' ]))
  }

  changePassword(uname: string, pass: string, newPass: string): Promise<any> {
    this.loader.increase()
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.api + '/user/pass', {
        uname: uname,
        pass: pass,
        new: newPass,
      }).subscribe(
        data => {
          console.log(data)
          resolve(data[ 'data' ][ 'message' ])
        },
        error => {
          let msg = {
            header: 'Error ' + error.status,
            body: error.statusText,
          }
          reject(msg)
          this.loader.decrease()
        },
        () => {
          this.loader.decrease()
        },
      )
    })
  }

}
