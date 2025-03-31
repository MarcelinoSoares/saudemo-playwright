export const persona = {
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
}