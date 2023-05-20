import { Component, OnInit } from '@angular/core'
import { EUser } from '../../../@entity/e-user'
import { ProfileService } from '../../../services/profile.service'
import { HttpClient } from '@angular/common/http'
import { ToasterService } from 'angular2-toaster'
import { ToastrConfig, ToastrTypes } from '../../../@config/toastr.config'

import { LoaderService } from '../../../services/loader.service'
import { UserService } from '../../../@core/mock/users.service'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'page-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
  protected user: EUser = new EUser()
  protected config = ToastrConfig
  protected pass = {
    current: '',
    new: '',
    confirm: '',
  }
  private fileData: any = null

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private loader: LoaderService,
  ) { }

  onFileChange(e) {
    this.fileData = e.target.files[ 0 ]
    console.log(this.fileData)
  }

  onSubmit(): void {
    this.loader.increase()
    let form = new FormData()
    this.user.appendUploader(form)
    form.append('photo', this.fileData)
    this.httpClient.post<any>(environment.api + '/user/profile', form)
      .subscribe(
        data => {
          let msg = data[ 'data' ][ 'message' ]
          this.toasterService.pop(msg)
        },
        (error) => {
          this.toasterService.pop(ToastrTypes.error, 'Error ' + error.status, error.statusText)
        },
        () => {
          this.loader.decrease()
        })
  }

  onChangePassword() {
    if (this.pass.current.length < 4) {
      this.toasterService.pop(ToastrTypes.error, 'Error', 'Password belum benar')
    } else if (this.pass.new.length < 4) {
      this.toasterService.pop(ToastrTypes.error, 'Error', 'Password baru kurang dari 4 karakter.')
    } else if (!(/^[a-zA-Z0-9!@#$&()\\-`.+,/_\"\'\!\~\@\#\$\%\^\&\*\(\=\|\}\{\[\]]*$/.test(this.pass.new))) {
      this.toasterService.pop(ToastrTypes.error, 'Error', 'Password tidak boleh mengandung spasi.')
    } else if (this.pass.new !== this.pass.confirm) {
      this.toasterService.pop(ToastrTypes.error, 'Error', 'Password baru dan konfirmasinya belum sama.')
    } else {
      this.profileService.changePassword(this.user.uname, this.pass.current, this.pass.new).then(msg => {
        this.toasterService.pop(msg.type, msg.header, msg.body)
      }).catch(msg => {
        this.toasterService.pop(ToastrTypes.error, msg.header, msg.body)
      })
    }
  }

  ngOnInit() {
    this.profileService.getUser(this.user.id).subscribe((user) => {
      this.user.populate(user)
      console.log(this.user)
    })
  }

}
