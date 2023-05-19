import * as Express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";

export class App {

    private e: any = Express();
    private router: Routes = new Routes();

    constructor() {
        this.config();
        this.router.routes(this.e);
    }

    private config(): void {
        this.e.use(bodyParser.urlencoded({ extended: false }));
        this.e.use(bodyParser.json());
    }

    public listen(port: number, callback: any) {
        this.e.listen(port, callback);
    }

}
