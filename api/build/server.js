"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.listen(8000, () => console.log("Server running on 8000!"));
app.get("/", (req, res) => {
    res.send("Awesome! We're live debugging this!");
});
//# sourceMappingURL=server.js.map