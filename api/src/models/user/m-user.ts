import { Model } from "../../@cores/model";
import { EUser } from "./e-user";
import * as bcrypt from "bcryptjs";
import { MFile } from "../file/m-file";

export class MUser extends Model {
  protected readonly TABLE: string = "users";
  protected Entity: any = EUser;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<EUser> {
    return this.p(re, true);
  }
  public toObject(re: Request | any): EUser {
    return this.p(re, false);
  }
  public insert(entity: any): Promise<EUser> {
    return this.i(entity);
  }
  public update(entity: any): Promise<EUser> {
    return this.u(entity);
  }
  public list(params: any, toForm = false): Promise<Array<EUser>> {
    return this.l(params, toForm);
  }
  public fetchWhere(params: any, toForm = false): Promise<EUser> {
    return this.fW(params, toForm);
  }
  public fetch(id: string, toForm = false): Promise<EUser> {
    return this.f(id, toForm);
  }
  public delete(id: string): Promise<EUser> {
    return this.d(id);
  }

  static readonly STATUS_INACTIVE = 0;
  static readonly STATUS_ACTIVE = 1;

  static readonly PRIV_NOPRIVILEGE = -1;
  static readonly PRIV_ADMIN = 0;
  static readonly PRIV_CASHIER = 1;
  static readonly PRIV_MASTER = 2;
  static readonly PRIV_OWNER = 3;

  static readonly PERM_ALWAYS_ASK = 0;
  static readonly PERM_ASK_ONCE = 1;
  static readonly PERM_GRANT_ALL = 2;
  static readonly PERM_DENY_ALL = 3;

  public readonly NAMES = {
    id: 0,
    status: 1,
    username: 2,
    email: 3,
    password: 4,
    idFilePicture: 5,
    fullName: 6,
    privilege: 7,
    permission: 8
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "STATUS",
    "USERNAME",
    "EMAIL",
    "PASSWORD",
    "ID_FILE_PICTURE",
    "FULL_NAME",
    "PRIVILEGE",
    "PERMISSION"
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "status",
    "uname",
    "mail",
    "pass",
    "picture",
    "name",
    "priv",
    "perm"
  ];

  public readonly RELATIONS: Object = {
    image: {
      model: MFile,
      relation: this.RELATION_ONE,
      fk: this.NAMES.idFilePicture,
      autoFetch: true
    }
  };

  public getByAuth(username: string, onlyActive?: true): Promise<EUser> {
    return this.fetchWhere({
      where:
        this.FIELDS[this.NAMES.username] +
        " = ? " +
        (onlyActive
          ? " AND " +
            this.FIELDS[this.NAMES.status] +
            " = " +
            MUser.STATUS_ACTIVE
          : ""),
      var: [username]
    });
  }

  public authenticatedUser(username: string, password: string): Promise<EUser> {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        return resolve(null);
      }

      this.getByAuth(username)
        .then((r: EUser) => {
          if (!!r && r.password) {
            bcrypt.compare(password, r.password, (err, isPasswordMatch) => {
              if (err) {
                throw err;
              }

              if (isPasswordMatch) {
                this.getDataRelation(r)
                  .then((eUser: EUser) => {
                    resolve(eUser);
                  })
                  .catch(err => {
                    reject(err);
                  });
              } else {
                resolve(null);
              }
            });
          } else {
            resolve(null);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public isUsername(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.count({
        where: this.FIELDS[this.NAMES.username] + " = ? ",
        var: [username]
      })
        .then(r => {
          resolve(!!r && r > 0);
        })
        .catch(reason => {
          return reject(reason);
        });
    });
  }

  public toggleStatus(id: string): void {
    new Promise((resolve, reject) => {
      this.fetch(id)
        .then((user: EUser) => {
          user.status =
            user.status == MUser.STATUS_ACTIVE
              ? MUser.STATUS_INACTIVE
              : MUser.STATUS_ACTIVE;

          this.update(user)
            .then(() => {
              resolve();
            })
            .catch(reason => {
              reject(reason);
            });
        })
        .catch(reason => {
          reject(reason);
        });
    });
  }

  public passwordToHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return reject(err);

        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return reject(err);

          resolve(hash);
        });
      });
    });
  }

  public getDataRelation(eUser: EUser): Promise<EUser> {
    return new Promise((resolve, reject) => {
      let file: MFile = new MFile();
      Promise.all([file.fetch(eUser.idFilePicture)])
        .then(values => {
          values[0].filename =
            MFile.FILE_DIR[MFile.FILE_DIR_PROFILE].pathRoute +
            values[0].filename;
          eUser.image = values[0];
          resolve(eUser);
        })
        .catch(e => reject(e));
    });
  }
}
