import { Injectable } from '@angular/core'
import { LoaderService } from './loader.service'
import { ToasterService } from 'angular2-toaster'
import { EReportTransaction } from '../@entity/e-report-transaction'
import { Msg } from '../@config/toastr.config'
import { HttpClient } from '@angular/common/http'
import { EReportStock } from '../@entity/e-report-stock'
import { EReportStockDetail } from '../@entity/e-report-stock-detail'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  constructor(
    private http: HttpClient,
    private loader: LoaderService,
  ) { }

  public async getReportSelling(toast: ToasterService, param: any): Promise<Array<EReportTransaction>> {
    return this.getReport(toast, param)
  }

  public async getReportReceiving(toast: ToasterService, param: any): Promise<Array<EReportTransaction>> {
    return this.getReport(toast, param, 'receiving')
  }

  public async getReportStock(toast: ToasterService, param: any): Promise<Array<EReportStock>> {
    this.loader.increase()
    let arr = []
    try {
      let r: any = await this.http.get<any>(environment.api + '/reporting/stock', { params: JSON.parse(JSON.stringify(param)) }).toPromise()
      if (!!r && 'list' in r[ 'data' ]) {
        for (let i = 0; i < r[ 'data' ][ 'list' ].length; i++) {
          arr[ i ] = (new EReportStock()).populate(r[ 'data' ][ 'list' ][ i ])
        }
      }
      console.log(arr)
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return arr
  }

  public async getReportStockDetails(toast: ToasterService, id: string, date: string): Promise<Array<EReportStockDetail>> {
    this.loader.increase()
    let arr = []
    try {
      let r: any = await this.http.get<any>(environment.api + '/reporting/stock-details', {
        params: {
          id: id,
          date: date,
        },
      }).toPromise()
      if (!!r && 'list' in r[ 'data' ]) {
        for (let i = 0; i < r[ 'data' ][ 'list' ].length; i++) {
          arr[ i ] = (new EReportStockDetail()).populate(r[ 'data' ][ 'list' ][ i ])
        }
      }
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }
    this.loader.decrease()
    return arr
  }

  private async getReport(toast: ToasterService, param: any, type = 'selling'): Promise<Array<EReportTransaction>> {
    this.loader.increase()
    let arr = []
    try {
      let r: any = await this.http.get<any>(environment.api + '/reporting/' + type, { params: param }).toPromise()
      if (!!r && 'list' in r[ 'data' ]) {
        for (let i = 0; i < r[ 'data' ][ 'list' ].length; i++) {
          arr[ i ] = (new EReportTransaction()).populate(r[ 'data' ][ 'list' ][ i ])
        }
      }
      console.log(arr)
    } catch (e) {
      console.log(e)
      toast.pop(Msg.errorStatus(e))
    }

    this.loader.decrease()
    return arr
  }

}
