import { chromaticScale, chromaticScaleSharps } from "../data/musicalNotes";
import { majorScale, minorScale } from "../data/scaleTemplates";

export class ScalesService {
  async getMajorScale(key: string) {
    try {
      const scalesWithSharps = ["C", "D", "E", "G", "A", "B"];

      // generating the scale with the proper accidentals
      if (key.endsWith("#") || scalesWithSharps.includes(key)) {
        return generateMajorScale(key, chromaticScaleSharps);
      } else {
        return generateMajorScale(key, chromaticScale);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error creating major scale object.");
    }
  }

  async getMinorScale(key: string) {
    const scaleData: string[] = new Array(7);

    // setting the tonic to the first note in the array
    scaleData[0] = key;

    for (let i = 1; i <= 6; i++) {
      // get the tonic position in the musicalNotesWithIndex object
      const note = chromaticScale[key];
      // get the interval to the next note from the majorScale object
      const distance = minorScale[i];
      // calculatig the next note position
      const nextNotePosition = note + distance;
      // get the next note of the scale
      if (nextNotePosition > 11) {
        // if the next note is greater than 11, we need to go back to the beginning
        const nextNote = Object.keys(chromaticScale).find(
          (key) => chromaticScale[key] === nextNotePosition - 12
        );
        if (nextNote) {
          scaleData[i] = nextNote;
          key = nextNote;
        }
      } else {
        const nextNote = Object.keys(chromaticScale).find(
          (key) => chromaticScale[key] === nextNotePosition
        );
        if (nextNote) {
          scaleData[i] = nextNote;
          key = nextNote;
        }
      }
    }

    return scaleData;
  }

  async getScaleNotes(scale: string) {
    const scaleNotes = "await this.scalesRepository.getScaleNotes(scale);";
    return scaleNotes;
  }
}

function generateMajorScale(
  key: string,
  chromaticScale: { [key: string]: number }
): string[] {
  const scaleData: string[] = new Array(7);

  if (key.length > 1) {
    key = key[0].toUpperCase() + key[1].toLowerCase();
  } else {
    key = key.toUpperCase();
  }

  // setting the tonic in the first position of the array
  scaleData[0] = key;

  for (let i = 1; i <= 6; i++) {
    // get the tonic position in the chromaticScale array
    const note = chromaticScale[key];
    // get the interval to the next note from the majorScale object
    const distance = majorScale[i];
    // calculatig the next note position
    const nextNotePosition = note + distance;
    // get the next note of the scale
    if (nextNotePosition > 11) {
      // if the next note is greater than 11, we need to go back to the beginning
      const nextNote = Object.keys(chromaticScale).find(
        (key) => chromaticScale[key] === nextNotePosition - 12
      );
      if (nextNote == "B" && scaleData[i - 1] == "Bb") {
        scaleData[i] = "Cb";
        key = nextNote;
      } else if (nextNote) {
        scaleData[i] = nextNote;
        key = nextNote;
      }
    } else {
      const nextNote = Object.keys(chromaticScale).find(
        (key) => chromaticScale[key] === nextNotePosition
      );
      if (nextNote == "B" && scaleData[i - 1] == "Bb") {
        scaleData[i] = "Cb";
        key = nextNote;
      } else if (nextNote) {
        scaleData[i] = nextNote;
        key = nextNote;
      }
    }
  }

  return scaleData;
}
