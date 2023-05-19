import { ToasterConfig, ToasterService } from 'angular2-toaster'
import { EAlert } from '../@entity/e-alert'

export const ToastrTypes: any = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
}

export const ToastrConfig: ToasterConfig = new ToasterConfig({
  positionClass: 'toast-top-right',
  timeout: 5000,
  newestOnTop: true,
  tapToDismiss: true,
  preventDuplicates: true,
  animation: 'fade',
  limit: 8,
  showCloseButton: true,
})

export class Msg {
  public static error(head: string, body: string): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.error
    msg.header = head
    msg.body = body

    return msg
  }

  public static warning(head: string, body: string): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.warning
    msg.header = head
    msg.body = body

    return msg
  }

  public static success(head: string, body: string): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.success
    msg.header = head
    msg.body = body

    return msg
  }

  public static info(head: string, body: string): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.info
    msg.header = head
    msg.body = body

    return msg
  }

  public static default(head: string, body: string): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.default
    msg.header = head
    msg.body = body

    return msg
  }

  public static errorStatus(error: any): EAlert {
    const msg: EAlert = new EAlert()
    msg.type = ToastrTypes.error
    msg.header = 'Error ' + (error.status && String(error.status) !== '0' ? error.status : '')
    msg.body = error.statusText

    return msg
  }

  public static pop(svc: ToasterService, alert: EAlert): void {
    svc.pop(alert.type, alert.header, alert.body)
  }
}
