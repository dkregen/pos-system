export class QueryObject {
  private _query: string = "";
  private _value: Array<any> = new Array();

  /**
   * Getter query
   * @return {string }
   */
  public get query(): string {
    return this._query;
  }

  /**
   * Getter value
   * @return {Array<any> }
   */
  public get value(): Array<any> {
    return this._value;
  }

  /**
   * Setter query
   * @param {string } value
   */
  public set query(value: string) {
    this._query = value;
  }

  /**
   * Setter value
   * @param {Array<any> } value
   */
  public set value(value: Array<any>) {
    this._value = value;
  }

}