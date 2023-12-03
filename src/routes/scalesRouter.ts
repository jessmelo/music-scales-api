import { Router } from "express";
import { ScalesController } from "../controller/scalesController";
import { ScalesService } from "../services/scalesService";

const scalesRouter = Router();
const scalesService = new ScalesService();
const scalesController = new ScalesController(scalesService);

/**
 * @swagger
 * /modes:
 *   get:
 *     tags: [Scales]
 *     summary: Retrieves a list of greek modes
 *     description: Returns an array of the greek modes, each with a name and its corresponding scale template.
 *     responses:
 *       200:
 *         description: A list of musical modes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the musical mode.
 *                       template:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: The scale template of the musical mode.
 *                   example:
 *                     - name: "Ionian"
 *                       template: ["1", "2", "3", "4", "5", "6", "7"]
 *                     - name: "Dorian"
 *                       template: ["1", "2", "b3", "4", "5", "6", "b7"]
 *       500:
 *         description: Internal Server Error
 */
scalesRouter.get("/modes", scalesController.getModes);

/**
 * @swagger
 * /major_scale/{key}:
 *   get:
 *     tags: [Scales]
 *     summary: Retrieves a major scale based on a key
 *     description: Returns the major scale for a given key.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The tonic for which to get the major scale (e.g., C, D, E).
 *     responses:
 *       200:
 *         description: The major scale for the specified key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scale:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The notes of the major scale.
 *               example:
 *                 scale: ["C", "D", "E", "F", "G", "A", "B"]
 *       400:
 *         description: Bad Request - Key is required or key is not valid.
 *       500:
 *         description: Internal Server Error
 */
scalesRouter.get(
  "/major_scale/:key",
  scalesController.getMajorScale.bind(scalesController)
);

/**
 * @swagger
 * /minor_scale/{key}:
 *   get:
 *     tags: [Scales]
 *     summary: Retrieves a natural minor scale based on key
 *     description: Returns the minor scale for a given key.
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The tonic for which to get the minor scale (e.g., C, D, E).
 *     responses:
 *       200:
 *         description: The minor scale for the specified key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scale:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The notes of the major scale.
 *               example:
 *                 scale: ["C", "D", "Eb", "F", "G", "Ab", "Bb"]
 *       400:
 *         description: Bad Request - Key is required or key is not valid.
 *       500:
 *         description: Internal Server Error
 */
scalesRouter.get(
  "/minor_scale/:key",
  scalesController.getMinorScale.bind(scalesController)
);

// scalesRouter.get(
//   "/harmonic_minor_scale/:key",
//   scalesController.getHarmonicMinorScale.bind(scalesController)
// );

// scalesRouter.get(
//   "/melodic_minor_scale/:key",
//   scalesController.getMelodicMinorScale.bind(scalesController)
// );

export { scalesRouter };
