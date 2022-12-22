export class Photo {
  constructor(
    public photoId: number,
    public applicationUserId: number,
    public imageURL: string,
    public publicId: string,
    public description: string,
    public publishDate: Date,
    public updateDate: Date,
    public deletionConfirm: boolean = false
  ) {}
}
