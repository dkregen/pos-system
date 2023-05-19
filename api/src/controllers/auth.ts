import { Controller } from "../@cores/controller";
import { MUser } from "../models/user/m-user";
import * as jwt from "jsonwebtoken";
import { EUser } from "../models/user/e-user";

export class Auth extends Controller {
  private key: string = "n6Yu9hej5hey";

  constructor() {
    super();

    //--------------------------------------------------------------------------------------------------
    this.router.route("/sign-in").post((req, res) => {
      (async () => {
        try {
          let mUser: MUser = new MUser();
          const o: EUser = mUser.toObject(req);
          let r: EUser = await mUser.authenticatedUser(o.username, o.password);
          if (!r) {
            console.log("auth.router.route.sign-in: Unauthorized login attemp.");
            return res.sendStatus(401);
          } else if(r.privilege > -1 && r.status > 0) {
            
          }
          console.log(r)
          var token = jwt.sign(
            {
              id: r.id,
              name: r.fullName,
              in: true,
              picture: r.image.filename,
              iat: Math.floor(Date.now() / 1000) - 30,
              privilege: r.privilege
            },
            this.key,
            { expiresIn: "2h" }
          );

          res.json({ data: { token: token } });
        } catch (reason) {
          console.log(reason);
          res.sendStatus(500);
        }
      })();
    });

    //--------------------------------------------------------------------------------------------------
    this.router.route("/sign-out").post((req, res) => {
      res.send({ data: {} });
    });

    //--------------------------------------------------------------------------------------------------
  this.router.route("/sign-up").post((req, res) => {
    (async () => {
      try {
        var mUser: MUser = new MUser();
        var param: EUser = mUser.toObject(req);
        let hash = await mUser.passwordToHash(param.password);

        param.privilege = MUser.PRIV_NOPRIVILEGE;
        param.status = MUser.STATUS_INACTIVE;
        param.password = hash;
        param.idFilePicture = null;

        let r = await mUser.insert(param);

        var token = jwt.sign(
          { in: false, iat: Math.floor(Date.now() / 1000) - 30 },
          this.key
        );

        return res.json({ data: { token: token } });
      } catch (reason) {
        console.log(reason);
        res.sendStatus(500);
      }
    })();
  });
  }
}
