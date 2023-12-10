import {
  chromaticScaleFlats,
  chromaticScaleSharps,
  enharmonics,
} from "../data/musicalNotes";
import { majorScaleSteps, minorScaleSteps } from "../data/scaleTemplates";

export class ScalesService {
  async getMajorScale(key: string): Promise<string[]> {
    try {
      // Convert to uppercase for the first character and lowercase for the second character
      key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      return generateMajorScale(key);
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching major scale.");
    }
  }

  async getMinorScale(key: string): Promise<string[]> {
    try {
      // Convert to uppercase for the first character and lowercase for the second character
      key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      return generateMinorScale(key);
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching minor scale.");
    }
  }
}

function generateMajorScale(key: string): string[] {
  let scaleData: string[] = [];

  // Determine whether to use sharp or flat keys
  const useFlatKeys = Object.keys(enharmonics).includes(key);
  const musicalNotes = useFlatKeys ? chromaticScaleFlats : chromaticScaleSharps;

  // Find the starting index of the tonic
  let startIndex: number = musicalNotes.indexOf(key);
  if (startIndex === -1) {
    throw new Error("Error: Key is not valid");
  }

  for (let i = 0, accumulatedSteps = 0; i < 7; i++) {
    scaleData.push(musicalNotes[(startIndex + accumulatedSteps) % 12]);
    accumulatedSteps += majorScaleSteps[i];
  }

  return scaleData;
}

function generateMinorScale(key: string): string[] {
  let scaleData: string[] = [];

  // Determine whether to use sharp or flat keys
  const useFlatKeys = Object.keys(enharmonics).includes(key);
  const musicalNotes = useFlatKeys ? chromaticScaleFlats : chromaticScaleSharps;

  // Find the starting index of the tonic
  let startIndex: number = musicalNotes.indexOf(key);
  if (startIndex === -1) {
    throw new Error("Error: Key is not valid");
  }

  for (let i = 0, accumulatedSteps = 0; i < 7; i++) {
    scaleData.push(musicalNotes[(startIndex + accumulatedSteps) % 12]);
    accumulatedSteps += minorScaleSteps[i];
  }

  return scaleData;
}
