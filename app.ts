import { Request, Response } from "express";
import { scalesRouter } from "./src/routes/scalesRouter";

const express = require("express");
const app = express();
const port = 3060;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Music Scales API",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Music Scale API!");
});

app.use(scalesRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
  console.log(`Swagger API Docs on http://localhost:${port}/api-docs`);
});
