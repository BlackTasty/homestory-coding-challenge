export class Track {
  public name: string = "";
  public playCount: number = 0;

  constructor(jsonData: any) {
    if (!jsonData) {
      return;
    }

    this.name = jsonData.name;
    this.playCount = jsonData.playcount;
  }
}
