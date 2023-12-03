// write function to fix flats and sharps
// input: array of strings
// output: array of strings
//
// if the string contains a flat or sharp, fix it
// if the string contains a flat, but the next note starts with the same letter, fix it
// if the string contains a sharp, but the previous note ends with the same letter, fix it

export const fixFlatsAndSharps = (scaleData: string[]): string[] => {
  if (scaleData.length !== 7)
    throw new Error("Invalid scale data in fixFlatsAndSharps");

  const fixedScaleData: string[] = [];

  for (let i = 0; i < scaleData.length; i++) {
    const note = scaleData[i];
    const nextNote = scaleData[i + 1] ? scaleData[i + 1] : scaleData[0];
    const previousNote = scaleData[i - 1] ? scaleData[i - 1] : scaleData[6];

    if (note[0] == nextNote[0]) {
      // if the first letter of the note is the same as the first letter of the next note
      // then the note is sharp
      fixedScaleData.push(`${note[0]}#`);
    } else if (note[0] == previousNote[0]) {
      // if the first letter of the note is the same as the first letter of the previous note
      // then the note is flat
      fixedScaleData.push(`${note[0]}b`);
    } else {
      fixedScaleData.push(note);
    }
  }

  return fixedScaleData;
};
