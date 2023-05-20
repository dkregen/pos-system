import { Entity } from '../@core/entity'
import { EAlert } from './e-alert'
import { Msg } from '../@config/toastr.config'

export class EUnit extends Entity {

  public readonly NAMES = {
    id: 0,
    name: 1,
  }
  public objects: Array<any> = [
    'id',
    'name',
  ]

  constructor() {
    super()
  }

  private _name: String = ''

  /**
   * Getter name
   * @return {String }
   */
  public get name(): String {
    return this._name
  }

  /**
   * Setter name
   * @param {String } value
   */
  public set name(value: String) {
    this._name = value
  }

  public checkForm(): EAlert {
    if (!this.name) {
      return Msg.error('Kesalahan Form', 'Nama satuan tidak boleh kosong.')
    }

    return null
  }

}
