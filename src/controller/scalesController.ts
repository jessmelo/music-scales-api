import { chromaticScaleAll, musicalNotes } from "../data/musicalNotes";
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

  async getMajorScale(req: Request, res: Response) {
    try {
      const { key } = req.params;

      if (!key) res.status(400).json({ error: "Key is required" });

      if (key.length > 2 || !chromaticScaleAll.includes(key))
        res.status(400).json({ error: "Key is not valid" });

      const scaleData = await this.scalesService.getMajorScale(key);
      res.status(200).json({
        scale: scaleData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching major scale." });
    }
  }

  async getMinorScale(req: Request, res: Response) {
    try {
      const { key } = req.params;

      if (!key) res.status(400).json({ error: "Key is required" });

      if (key.length > 2 || !chromaticScaleAll.includes(key))
        res.status(400).json({ error: "Key is not valid" });

      const scaleData = await this.scalesService.getMinorScale(key);
      res.status(200).json({
        scale: scaleData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching minor scale." });
    }
  }

  async getModes(req: Request, res: Response) {
    try {
      const modes = {
        modes: [
          { name: "Ionian", template: ["1", "2", "3", "4", "5", "6", "7"] },
          { name: "Dorian", template: ["1", "2", "b3", "4", "5", "6", "b7"] },
          {
            name: "Phrygian",
            template: ["1", "b2", "b3", "4", "5", "b6", "b7"],
          },
          { name: "Lydian", template: ["1", "2", "3", "#4", "5", "6", "7"] },
          {
            name: "Mixolydian",
            template: ["1", "2", "3", "4", "5", "6", "b7"],
          },
          { name: "Aeolian", template: ["1", "2", "b3", "4", "5", "b6", "b7"] },
          {
            name: "Locrian",
            template: ["1", "b2", "b3", "4", "b5", "b6", "b7"],
          },
        ],
      };

      res.status(200).json(modes);
    } catch (error) {
      res.status(500).json({ error: "Error fetching modes." });
    }
  }
}
