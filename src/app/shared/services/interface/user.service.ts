export interface UserJSON {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  town: string;
  country: string;
  birthDate: string | null;
  description: string;
  role: string;
  someMoreSomething: string;
}

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobile: string,
    public street: string,
    public houseNumber: string,
    public zipCode: string,
    public town: string,
    public country: string,
    public birthDate: Date | string,
    public description: string,
    public role: string,
    public someMoreSomething: string,
    public id?: string,
  ) {}

  public toJSON(): UserJSON {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      street: this.street,
      houseNumber: this.houseNumber,
      zipCode: this.zipCode,
      town: this.town,
      country: this.country,
      birthDate: this.birthDate instanceof Date ? this.birthDate.toISOString() : null,
      description: this.description,
      role: this.role,
      someMoreSomething: this.someMoreSomething,
    };
  }
}
