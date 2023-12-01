import { scalesRouter } from "./src/routes/scalesRouter";

// @ts-ignore
const express = require("express");
const app = express();
const port = 3060;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(scalesRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
