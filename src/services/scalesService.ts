export class ScalesService {
  async getMajorScale(scale: string, key: string) {
    const scaleData = "await this.scalesRepository.getScale(scale, key);";
    return scaleData;
  }

  async getScaleNotes(scale: string) {
    const scaleNotes = "await this.scalesRepository.getScaleNotes(scale);";
    return scaleNotes;
  }
}
