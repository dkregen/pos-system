import { Model } from "../../@cores/model";
import { EFile } from "./e-file";
import * as multer from "multer";
import * as path from "path";
import * as Moment from "moment";
import { parse } from "querystring";

export class MFile extends Model {

  protected readonly TABLE: string = "files";
  protected Entity: any = EFile;

  constructor() {
    super();
  }

  public populate(re: Request | any): Promise<EFile> { return this.p(re, true); }
  public toObject(re: Request | any): EFile { return this.p(re, false); }
  public insert(entity: any): Promise<EFile> { return this.i(entity); }
  public update(entity: any): Promise<EFile> { return this.u(entity); }
  public list(params: any, toForm = false): Promise<Array<EFile>> { return this.l(params, toForm); }
  public fetchWhere(params: any, toForm = false): Promise<EFile> { return this.fW(params, toForm); }
  public fetch(id: string, toForm = false): Promise<EFile> { return this.f(id, toForm); }
  public delete(id: string): Promise<EFile> { return this.d(id); }

  static readonly STATUS_INACTIVE = 0;
  static readonly STATUS_ACTIVE = 1;

  public readonly NAMES = {
    id: 0,
    filename: 1,
    type: 2,
    hash: 3,
    extension: 4,
    uploaded: 5,
    status: 6
  };

  public readonly FIELDS: Array<string> = [
    "ID",
    "FILENAME",
    "TYPE",
    "HASH",
    "EXTENSION",
    "UPLOADED",
    "STATUS",
  ];

  public readonly FORMS: Array<string> = [
    "id",
    "file",
    "type",
    "hash",
    "ext",
    "upload_date",
    "status"
  ];

  public static readonly FILE_DIR = [
    { pathDir: "public/imgs/", pathRoute: "api/images/" }
  ];

  public static readonly FILE_DIR_PROFILE: number = 0;

  private _uploadDirCode: number;
  private _uploadFileName: String;
  private _uploadInput: String;
  private _insertedId: String;
  private _toForm: string;
  private _file: EFile = new EFile();

  /**
   * Upload file and return the ID.
   * @return { String }
   */
  public upload(req, res): Promise<EFile> {
    var gFile: EFile = new EFile();
    gFile.req = req;
    return new Promise((resolve, reject) => {
      let upload = multer({
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, MFile.FILE_DIR[this.uploadDirCode].pathDir);
          },
          filename: (req, file, cb) => {
            if (file.originalname) {
              this.insert(gFile).then(() => {
                gFile.extension = path.extname(file.originalname);
                gFile.filename = (this.uploadFileName ? this.uploadFileName : gFile.id) + gFile.extension;
                gFile.status = MFile.STATUS_ACTIVE;
                gFile.type = this.uploadDirCode;
                gFile.uploaded = Moment();
                this.update(gFile).then((f: EFile) => {
                  if (this._toForm) {
                    req["body"][this.toForm] = f.id;
                  } else {
                    req["body"][this.toForm] = req["body"][this.toForm] || "NULL";
                  }
                  cb(null, gFile.filename);
                }).catch((reason) => {
                  this.log(reason);
                  reject(reason);
                });
              }).catch((reason) => {
                cb(null, ".default");
                this.log(reason);
              });
            } else {
              cb(null, ".default");
            }
          }
        })
      }).single(this.uploadInput);

      upload(req, res, (err) => {
        if (err) {
          this.delete(gFile.id);
          reject(err);
        }
        req["body"][this.toForm] = req["body"][this.toForm] || undefined;
        resolve(gFile);
      });
    });
  }

  /**
   * Getter toForm
   * @return {String}
   */
  public get toForm(): string {
    return this._toForm;
  }

  /**
   * Setter toForm
   * @param {String} value
   */
  public set toForm(value: string) {
    this._toForm = value;
  }

  /**
   * Getter uploadDir
   * @return {number}
   */
  public get uploadDirCode(): number {
    return this._uploadDirCode;
  }

  /**
   * Setter uploadDir
   * @param {number} value
   */
  public set uploadDirCode(value: number) {
    this._uploadDirCode = value;
  }

  /**
   * Getter uploadFileName
   * @return {String}
   */
  public get uploadFileName(): String {
    return this._uploadFileName;
  }

  /**
   * Setter uploadFileName
   * @param {String} value
   */
  public set uploadFileName(value: String) {
    this._uploadFileName = (value ? value : "untitled");
  }

  /**
   * Getter uploadInput
   * @return {String}
   */
  public get uploadInput(): String {
    return this._uploadInput;
  }

  /**
   * Setter uploadInput
   * @param {String} value
   */
  public set uploadInput(value: String) {
    this._uploadInput = value;
  }

  /**
   * Getter insertedId
   * @return {String}
   */
  public get insertedId(): String {
    return this._insertedId;
  }

  /**
   * Setter insertedId
   * @param {String} value
   */
  public set insertedId(value: String) {
    this._insertedId = value;
  }

  /**
   * Getter file
   * @return {EFile}
   */
  public get file(): EFile {
    return this._file;
  }

  /**
   * Setter file
   * @param {EFile} value
   */
  public set file(value: EFile) {
    this._file = value;
  }

}