import { Model } from "../../@cores/model";
import { EContact } from "./e-contact";

export class MContact extends Model {

  protected readonly TABLE: string = "contacts";
  protected Entity: any = EContact;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<EContact> { return this.p(re, true); }
  public toObject(re: Request | any): EContact { return this.p(re, false); }
  public insert(entity: any): Promise<EContact> { return this.i(entity); }
  public update(entity: any): Promise<EContact> { return this.u(entity); }
  public list(params: any, toForm = false): Promise<Array<EContact>> { return this.l(params, toForm); }
  public fetchWhere(params: any, toForm = false): Promise<EContact> { return this.fW(params, toForm); }
  public fetch(id: string, toForm = false): Promise<EContact> { return this.f(id, toForm); }
  public delete(id: string): Promise<EContact> { return this.d(id); }

  public readonly NAMES = {
    id: 0,
    name: 1,
    phone: 2,
    company: 3,
    tel: 4,
    noKTP: 5
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "NAME",
    "PHONE",
    "COMPANY",
    "TEL",
    "NO_KTP"
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "name",
    "phone",
    "company",
    "tlp",
    "ktp"
  ];
  
  public like(where: string) {
    let like = "%"+where+"%";
    return {
      where: this.FIELDS[this.NAMES.id]+" IN (SELECT u.`ID` FROM `contacts` u WHERE u.`NAME` LIKE ? OR u.`PHONE` LIKE ? OR u.`TEL` LIKE ? OR u.`COMPANY` LIKE ? OR u.`NO_KTP` LIKE ?)",
      var: [like, like, like, like, like]
    }
  }

}