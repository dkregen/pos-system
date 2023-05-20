import { EAlert } from '../@entity/e-alert'
import * as Moment from 'moment'

export class Entity {

  public static readonly MOMENT_PATTERN_STANDARD: string = 'YYYY-MM-DDTHH:mm:ss.SSSSZ'
  public static readonly MOMENT_PATTERN_MYSQL: string = 'YYYY-MM-DD HH:mm:ss'
  public static readonly MOMENT_PATTERN_DATE_HUMAN: string = 'DD/MM/YY'
  public static readonly MOMENT_PATTERN_DATETIME_HUMAN: string = Entity.MOMENT_PATTERN_DATE_HUMAN + ' HH:mm:ss'
  public objects: Array<any> = []

  constructor() {
  }

  private _id: string = '0'

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value
  }

  public static toMoment(date: string): Moment.Moment {
    if (date) {
      let pattern = ((date + '')).indexOf('T') > -1 ? Entity.MOMENT_PATTERN_STANDARD : Entity.MOMENT_PATTERN_MYSQL
      return Moment(date, pattern)
    } else {
      return null
    }
  }

  public checkForm(): EAlert {
    return null
  }

  public hasId(): boolean {
    return this.id !== undefined && !!this.id && this.id !== '0'
  }

  public populate(o) {
    for (let i = 0; i < this.objects.length; i++) {
      if ('string' === typeof this.objects[ i ]) {
        if (o[ this.objects[ i ] ] || o[ this.objects[ i ] ] === 0) {
          this[ this.objects[ i ] ] = o[ this.objects[ i ] ]
        }
      } else if (this.objects[ i ] instanceof Moment) {
        this[ this.objects[ i ] ] = o[ this.objects[ i ] ].format('YYYY-MM-DDTHH:mm:ss.SSSSZ')
      } else {
        if (this.objects[ i ].name in o) {
          if (!this.objects[ i ].many) {
            this[ this.objects[ i ].name ] = new this.objects[ i ].o()
            this[ this.objects[ i ].name ].populate(o[ this.objects[ i ].name ])
          } else {
            this[ this.objects[ i ].name ] = []
            var arr = o[ this.objects[ i ].name ]
            for (let j = 0; j < arr.length; j++) {
              let temp = new this.objects[ i ].o()
              temp.populate(arr[ j ])
              this[ this.objects[ i ].name ][ j ] = temp
            }
          }
        }
      }
    }
    return this
  }

  public objectToJson() {
    var json = {}
    for (let i = 0; i < this.objects.length; i++) {
      if ('string' === typeof this.objects[ i ]) {
        json[ this.objects[ i ] ] = this[ this.objects[ i ] ]
      }
    }
    return json
  }

  public copyTo(o: any): void {
    for (let i = 0; i < this.objects.length; i++) {
      o[ this.objects[ i ] ] = this[ this.objects[ i ] ]
    }
  }

  public empty() {
    var cloneObj = new (<any>this.constructor())
    this.populate(cloneObj)
  }

  public searchFromArray(arr: Array<any>, id) {
    for (let item in arr) {
      if (id === item[ 'id' ]) {
        return item
      }
    }

    return new (<any>this.constructor())
  }

  public appendUploader(form: any) {
    for (let i = 0; i < this.objects.length; i++) {
      if ('string' === typeof this.objects[ i ]) {
        form.append(this.objects[ i ], this[ this.objects[ i ] ])
      }
    }
  }

  public clone(): any {
    var cloneObj = new (<any>this.constructor())
    for (var attribut in this) {
      if (typeof this[ attribut ] === 'object') {
        cloneObj[ attribut ] = this.clone()
      } else {
        cloneObj[ attribut ] = this[ attribut ]
      }
    }
    return cloneObj
  }
}
