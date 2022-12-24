export class ApplicationUser {
  constructor(
    public applicationUserId: number,
    public userName: string,
    public fullName: string,
    public email: string,
    public token: string
  ) {}
}
