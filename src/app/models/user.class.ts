export class User {
  firstName: string | undefined;
  lastName: string | undefined;
  eMail: string | undefined;
  mobile: string | undefined;
  street: string | undefined;
  houseNumber: number | undefined;
  zipCode: number | undefined;
  town: string | undefined;
  country: string | undefined;
  someMoreSomething: string | undefined;
  birthDate: number | undefined;

  // obj?: any;

  constructor(obj?: Partial<User>) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.eMail = obj ? obj.eMail : '';
    this.mobile = obj ? obj.mobile : '';
    this.street = obj ? obj.street : '';
    this.houseNumber = obj ? obj.houseNumber : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.town = obj ? obj.town : '';
    this.country = obj ? obj.country : '';
    this.someMoreSomething = obj ? obj.someMoreSomething : '';
    this.birthDate = obj ? obj.birthDate : '';
  }

  // // Standardkonstruktor ohne Parameter
  // constructor() {}

  // // Methode, um die Eigenschaften zu setzen
  // initialize(obj: Partial<User>) {
  //   this.firstName = obj.firstName || '';
  //   this.lastName = obj.lastName || '';
  //   this.eMail = obj.eMail || '';
  //   this.mobile = obj.mobile || '';
  //   this.street = obj.street || '';
  //   this.houseNumber = obj.houseNumber || 0; // Defaultwert
  //   this.zipCode = obj.zipCode || 0; // Defaultwert
  //   this.town = obj.town || '';
  //   this.country = obj.country || '';
  //   this.someMoreSomething = obj.someMoreSomething || '';
  //   this.birthDate = obj.birthDate || 0; // Defaultwert
  // }
}
