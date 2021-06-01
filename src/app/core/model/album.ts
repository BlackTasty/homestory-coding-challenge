export class Album {
  public name: string = "";
  public playCount: number = 0;
  public albumCoverUrl: string = "";
  public albumCoverCss: string = "";

  constructor(jsonData: any) {
    if (!jsonData) {
      return;
    }

    this.name = jsonData.name;
    this.playCount = jsonData.playcount;
    this.albumCoverUrl = jsonData.image[2]["#text"];
    this.albumCoverCss = "url(" + this.albumCoverUrl + ")";
  }
}
