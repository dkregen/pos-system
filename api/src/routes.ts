import { User } from "./controllers/user";
import { Auth } from "./controllers/auth";
import * as Express from "express";
import { Unit } from "./controllers/unit";
import { Item } from "./controllers/item";

export class Routes {

  private user: User = new User();
  private auth: Auth = new Auth();
  private unit: Unit = new Unit();
  private item: Item = new Item();

  public routes(app): void {
    app.use('/api/images', Express.static('./public/imgs'));
    app.use('/api/unit', this.unit.router);
    app.use('/api/item', this.item.router);
    app.use('/api/user', this.user.router);
    app.use('/api/auth', this.auth.router);

    app.use('*', (req, res) => { res.sendStatus(404) });
  }
}