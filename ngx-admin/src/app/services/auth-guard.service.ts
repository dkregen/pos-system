import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { NbAuthService } from '@nebular/auth'
import { tap } from 'rxjs/operators'
import { EUser } from '../@entity/e-user'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private payload: any

  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {
        var params
        var isAuthenticated = !!authenticated
        if (authenticated) {
          this.authService.getToken().subscribe((token: any) => {
            console.log(token)
            var payload = token.getPayload()
            console.log(payload)
            isAuthenticated = !!payload.in
            this.payload = payload
            if (!payload.in) {
              params = { queryParams: { origin: 'register' } }
            }
          })
        }
        isAuthenticated || this.router.navigate(['auth/login'], params)
      }),
    )
  }

  public getPayloadId(): string {
    return this.payload.id
  }

  public hasSell(): boolean {
    let user = new EUser()
    return parseInt(this.payload?.privilege) == user.PRIV_OWNER
      || parseInt(this.payload?.privilege) == user.PRIV_CASHIER
  }

  public hasReceive(): boolean {
    let user = new EUser()
    return parseInt(this.payload?.privilege) == user.PRIV_OWNER
      || parseInt(this.payload?.privilege) == user.PRIV_MASTER
  }

  public hasStockOpname(): boolean {
    let user = new EUser()
    return parseInt(this.payload?.privilege) == user.PRIV_OWNER
      || parseInt(this.payload?.privilege) == user.PRIV_MASTER
  }

  public getMenu(): any {
    let recordTransaksi = {
      title: 'Akses Transaksi',
      icon: 'e-commerce',
      link: '/cashier',
    }

    let master = {
      title: 'Master Data',
      icon: 'keypad',
      children: [],
    }

    let report = {
      title: 'Laporan',
      icon: 'bar-chart',
      children: [],
    }

    let masterChild = {
      pengguna: {
        title: 'Pengguna',
        link: '/pages/master/user',
      },
      barang: {
        title: 'Barang',
        link: '/pages/master/item',
      },
      satuan: {
        title: 'Satuan',
        link: '/pages/master/unit',
      },
      kontak: {
        title: 'Kontak',
        link: '/pages/master/contact',
      },
    }

    let reportChild = {
      sell: {
        title: 'Penjualan',
        link: '/pages/report/sales',
      },
      receive: {
        title: 'Penerimaan',
        link: '/pages/report/receive',
      },
      stock: {
        title: 'Perubahan Stok',
        link: '/pages/report/stock',
      },
    }

    let menu: any = []
    let user = new EUser()
    switch (parseInt(this.payload?.privilege)) {
      case user.PRIV_OWNER:
        menu[ 0 ] = recordTransaksi
        menu[ 1 ] = master
        menu[ 1 ][ 'children' ][ 0 ] = masterChild.kontak
        menu[ 1 ][ 'children' ][ 1 ] = masterChild.barang
        menu[ 1 ][ 'children' ][ 2 ] = masterChild.satuan
        menu[ 1 ][ 'children' ][ 3 ] = masterChild.pengguna
        menu[ 2 ] = report
        menu[ 2 ][ 'children' ][ 0 ] = reportChild.sell
        menu[ 2 ][ 'children' ][ 1 ] = reportChild.receive
        menu[ 2 ][ 'children' ][ 2 ] = reportChild.stock
      case user.PRIV_MASTER:
        menu[ 0 ] = recordTransaksi
        menu[ 1 ] = master
        menu[ 1 ][ 'children' ][ 0 ] = masterChild.kontak
        menu[ 1 ][ 'children' ][ 1 ] = masterChild.barang
        menu[ 1 ][ 'children' ][ 2 ] = masterChild.satuan
      case user.PRIV_CASHIER:
        menu[ 0 ] = recordTransaksi
        menu[ 1 ] = master
        menu[ 1 ][ 'children' ][ 0 ] = masterChild.kontak
        break
      case user.PRIV_ADMIN:
        menu[ 0 ] = master
        menu[ 0 ][ 'children' ][ 0 ] = masterChild.kontak
        menu[ 0 ][ 'children' ][ 1 ] = masterChild.barang
        menu[ 0 ][ 'children' ][ 2 ] = masterChild.satuan
        menu[ 0 ][ 'children' ][ 3 ] = masterChild.pengguna
        menu[ 1 ] = report
        menu[ 1 ][ 'children' ][ 0 ] = reportChild.sell
        menu[ 1 ][ 'children' ][ 1 ] = reportChild.receive
        menu[ 1 ][ 'children' ][ 2 ] = reportChild.stock
        break
    }

    return menu
  }
}
