import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  constructor() { }

  private _count: number = 0

  public increase(): void {
    this._count++
  }

  public decrease(): void {
    if (this._count <= 0) {
      this._count = 0
    } else {
      this._count--
    }
  }

  public isLoading(): boolean {
    return this._count > 0
  }

}
