import { NbMenuItem } from '@nebular/theme'

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Record Transaksi',
    icon: 'nb-e-commerce',
    link: '/cashier',
  },
  {
    title: 'Master Data',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Pengguna',
        link: '/pages/master/user',
      },
      {
        title: 'Barang',
        link: '/pages/master/item',
      },
      {
        title: 'Satuan',
        link: '/pages/master/unit',
      },
      {
        title: 'Kontak',
        link: '/pages/master/contact',
      },
    ],
  },
  {
    title: 'Laporan',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Penjualan',
        link: '/pages/report/sales',
      },
      {
        title: 'Penerimaan',
        link: '/pages/report/receive',
      },
      {
        title: 'Perubahan Stok',
        link: '/pages/report/stock',
      },
    ],
  },
]
