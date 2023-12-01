import { Router } from "express";
import { ScalesController } from "../controller/scalesController";
import { ScalesService } from "../services/scalesService";

const scalesRouter = Router();
const scalesController = new ScalesController(new ScalesService());

scalesRouter.get("/modes", scalesController.getModes);

export { scalesRouter };
