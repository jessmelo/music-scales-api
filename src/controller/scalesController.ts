import { ScalesService } from "../services/scalesService";
import { Request, Response } from "express";

export class ScalesController {
  constructor(private scalesService: ScalesService) {
    this.scalesService = scalesService;
  }

  async getScale(req: Request, res: Response) {
    const { scale, key } = req.params;
    const scaleData = { scale, key };
    res.status(200).json(scaleData);
  }

  async getModes(req: Request, res: Response) {
    const modes = {
      modes: [
        { name: "Ionian", notes: ["1", "2", "3", "4", "5", "6", "7"] },
        { name: "Dorian", notes: ["1", "2", "b3", "4", "5", "6", "b7"] },
        { name: "Phrygian", notes: ["1", "b2", "b3", "4", "5", "b6", "b7"] },
        { name: "Lydian", notes: ["1", "2", "3", "#4", "5", "6", "7"] },
        { name: "Mixolydian", notes: ["1", "2", "3", "4", "5", "6", "b7"] },
        { name: "Aeolian", notes: ["1", "2", "b3", "4", "5", "b6", "b7"] },
        { name: "Locrian", notes: ["1", "b2", "b3", "4", "b5", "b6", "b7"] },
      ],
    };

    res.status(200).json(modes);
  }
}
