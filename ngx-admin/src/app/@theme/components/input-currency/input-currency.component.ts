import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'input-currency',
  styleUrls: ['./input-currency.component.scss'],
  templateUrl: './input-currency.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class InputCurrencyComponent implements OnInit {
  private static smallestNumber = -999999999999999
  private static biggestNumber = 999999999999999
  private static maxFraction = 17
  @Output() modelChange = new EventEmitter<number>() //Dipakai untuk over data pada [(model)]
  @Output() onFocusout = new EventEmitter<void>() //Ketika keluar dari input
  @Output() onPresEnter = new EventEmitter<void>() //Ketika enter ditekan.
  @Output() onKeyUp = new EventEmitter<void>()
  @Input() allowNegative: boolean = true //Memperbolehkan nilai minus untuk ditampilkan. (Tidak berpengaruh ke model)
  @Input() locale: string = 'id' //Lokalosasi kurensi
  @Input() readonly: boolean = false //Tag attribut readonly
  @Input() disabled: boolean = false //Tag attribut disabled
  @Input() id: string = '' //Tag attribut id
  @Input() class: string = '' //Tag attribut class
  @Input() tabindex: string = null //Tag attribut tabindex
  @Input() strictFraction: boolean = false //Angka di belakang koma tetap ditampilkan meskipun 0. (Tidak berpengaruh ke model)
  @Input() autoCheck: boolean = true //Update ke model saat onFocus & onBlur.
  @Input() autoChange: boolean = false //Update ke model saat nilai diubah
  @Input() asInput: boolean = true //T: input, F: div
  @Input() changeOnPressEnter: boolean = true
  protected number: string = ''
  private isActive: boolean = false
  private first: boolean = true

  constructor() { }

  private _model: number = 0

  //Model yang masuk ke variabel sebenarnya
  @Input()
  public set model(a: number) {
    this._model = this.toNumber(a)
    if (!this.isActive) {
      this.number = this.toLocale(this._model)
    } else {
      this.number = this._model + ''
    }
  }

  private _min: number = InputCurrencyComponent.smallestNumber //Angka terkecil yang diperbolehkan

  public get min(): number {
    return this._min
  }

  @Input()
  public set min(value: number) {
    if (value < InputCurrencyComponent.smallestNumber) {
      value = InputCurrencyComponent.smallestNumber
    } else if (value > InputCurrencyComponent.biggestNumber) {
      value = InputCurrencyComponent.biggestNumber
    }

    this._min = value
  }

  private _max: number = InputCurrencyComponent.biggestNumber //Angka terbesar yang diperbolehkan

  public get max(): number {
    return this._max
  }

  @Input()
  public set max(value: number) {
    if (value < InputCurrencyComponent.smallestNumber) {
      value = InputCurrencyComponent.smallestNumber
    } else if (value > InputCurrencyComponent.biggestNumber) {
      value = InputCurrencyComponent.biggestNumber
    }

    this._max = value
  }

  private _fractionSizeDisplay: number = InputCurrencyComponent.maxFraction //Jumlah angka dibelakang koma

  public get fractionSizeDisplay(): number {
    return this._fractionSizeDisplay
  }

  @Input()
  public set fractionSizeDisplay(value: number) {
    if (value < 0) {
      value = 0
    } else if (value > InputCurrencyComponent.maxFraction) {
      value = InputCurrencyComponent.maxFraction
    }

    this._fractionSizeDisplay = value
  }

  private _fractionSizeValue: number = InputCurrencyComponent.maxFraction //Jumlah angka dibelakang koma

  public get fractionSizeValue(): number {
    return this._fractionSizeValue
  }

  @Input()
  public set fractionSizeValue(value: number) {
    if (value < 0) {
      value = 0
    } else if (value > InputCurrencyComponent.maxFraction) {
      value = InputCurrencyComponent.maxFraction
    }

    this._fractionSizeValue = value
  }

  //Fraction size universal
  @Input()
  public set fractionSize(a: number) {
    this.fractionSizeDisplay = a
    this.fractionSizeValue = a
  }

  onFocus() {
    this.isActive = true
    this.number = (this._model * 1) + ''
  }

  onBlur() {
    this.isActive = false
    this._model = this.toNumber(this.number)
    this.number = this.toLocale(this._model) || '0'
    if (this.autoCheck) {
      this.modelChange.emit(this._model)
    }
    if (!this.first) {
      this.onFocusout.emit()
    } else {
      this.first = false
    }
  }

  toggleInputDisplay() {
    if (this.isActive) {
      this.number = this.toLocale(this._model) || '0'
    } else {
      this.number = (this._model * 1) + ''
    }
    this.isActive = !this.isActive
  }

  onChange(event?: any) {
    this.autoChangeHelper()
    if (event && event.keyCode == 13) {
      if (this.changeOnPressEnter && !this.autoChange) {
        this.autoChangeHelper(true)
        this.onFocusout.emit()
      }
      this.onPresEnter.emit()
    }
  }

  toLocale(value: any): string {
    value = (!this.allowNegative && this._model < 0) ? 0 : value
    var prefix = this.asInput ? ' ' : '\u00A0'
    var suffix = prefix
    if (this._model < 0 && this.allowNegative) {
      prefix = '('
      suffix = ')'
    }
    /*console.log(1, this.fractionSizeDisplay);
    console.log(2, parseFloat(parseFloat(Math.abs(value) + "").toFixed(this.fractionSizeDisplay)));
    console.log(3, parseFloat(parseFloat(Math.abs(value) + "").toFixed(this.fractionSizeDisplay)).toLocaleString(this.locale, { maximumFractionDigits: this.fractionSizeDisplay }))*/
    return prefix + parseFloat(parseFloat(Math.abs(value) + '').toFixed(this.fractionSizeDisplay)).toLocaleString(this.locale, {
      minimumFractionDigits: (this.strictFraction ? this.fractionSizeDisplay : 0),
      maximumFractionDigits: this.fractionSizeDisplay,
    }) + suffix
  }

  toNumber(x) {
    var regex = new RegExp('[^01234567890.-]', 'g')
    var newVal = (x + '').replace(regex, '')
    if (isNaN(parseFloat(newVal)) && this.min > this.max) {
      return 0
    } else {
      var a = parseFloat(parseFloat(newVal).toFixed(this.fractionSizeValue))
      if (a > this.max) {
        a -= (a - this.max)
      } else if (a < this.min) {
        a += (this.min - a)
      }

      return !isNaN(a) ? a : 0
    }
  }

  ngOnInit() {
    this.onFocus()
    this.onBlur()
  }

  private autoChangeHelper(forceTrue?: boolean) {
    if (this.autoChange || forceTrue) {
      var a = !isNaN(parseFloat(this.number)) ? parseFloat(this.number) : 0
      if (this.isActive) {
        if (this.min > this.max) {
          this.modelChange.emit(0)
        } else {
          if (a > this.max) {
            a -= (a - this.max)
            this.number = a + ''
          } else if (a < this.min) {
            a += (this.min - a)
            this.number = a + ''
          }
          this.modelChange.emit(a)
        }
      }
    }
  }

}
