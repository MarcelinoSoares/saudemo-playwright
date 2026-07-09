export interface CheckoutPersona {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export const persona: Record<string, CheckoutPersona> = {
  validUser: {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',
  },
  withoutFirstNameUser: {
    firstName: '',
    lastName: 'Doe',
    zipCode: '12345',
  },
  withoutLastNameUser: {
    firstName: 'John',
    lastName: '',
    zipCode: '12345',
  },
  withoutZipCodeUser: {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '',
  },
  withoutAllUser: {
    firstName: '',
    lastName: '',
    zipCode: '',
  },
};
