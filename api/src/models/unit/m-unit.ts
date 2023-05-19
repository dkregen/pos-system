import { Model } from "../../@cores/model";
import { EUnit } from "./e-unit";

export class MUnit extends Model {

  protected readonly TABLE: string = "units";
  protected Entity: any = EUnit;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<EUnit> { return this.p(re, true); }
  public toObject(re: Request | any): EUnit { return this.p(re, false); }
  public insert(entity: any): Promise<EUnit> { return this.i(entity); }
  public update(entity: any): Promise<EUnit> { return this.u(entity); }
  public list(params: any, toForm = false): Promise<Array<EUnit>> { return this.l(params, toForm); }
  public fetchWhere(params: any, toForm = false): Promise<EUnit> { return this.fW(params, toForm); }
  public fetch(id: string, toForm = false): Promise<EUnit> { return this.f(id, toForm); }
  public delete(id: string): Promise<EUnit> { return this.d(id); }

  public readonly NAMES = {
    id: 0,
    name: 1
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "NAME"
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "name"
  ];
  
  public like(where: string) {
    let like = "%"+where+"%";
    return {
      where: this.FIELDS[this.NAMES.id]+" IN (SELECT u.`ID` FROM `units` u WHERE u.`NAME` LIKE ?)",
      var: [like]
    }
  }

}