import { Request, Response } from "express";
import { scalesRouter } from "./src/routes/scalesRouter";
import "dotenv/config";
import * as express from "express";

const app = express();
const port = process.env.PORT || 3060;

import * as swaggerUi from "swagger-ui-express";
import * as swaggerJSDoc from "swagger-jsdoc";

const apiUrl = process.env.API_URL || `http://localhost:${port}`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Music Scales API",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
  },
  servers: [] as { url: string; description: string }[],
};

if (process.env.NODE_ENV !== "production") {
  swaggerDefinition.servers.push({
    url: `http://localhost:${port}`,
    description: "Local Server",
  });
}

swaggerDefinition.servers.push({
  url: apiUrl,
  description: "Production Server",
});

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
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Swagger API Docs on http://localhost:${port}/api-docs`);
});
