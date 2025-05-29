import { Address } from '../app/shared/interfaces/address';

export const addresses: Address[] = [
    {
        default: true,
        firstName: 'Ionel',
        lastName: 'Popescu',
        email: 'ionel.popescu@gmail.ro',
        phone: '+40766222111',
        country: 'România',
        city: 'București',
        postcode: '333555',
        address: 'Calea Victoriei, nr. 260'
    },
    {
        default: false,
        firstName: 'Gică',
        lastName: 'Moldovan',
        email: 'gica.moldovan@gmail.ro',
        phone: '+40788777222',
        country: 'România',
        city: 'București',
        postcode: '333666',
        address: 'Aleea Romană, nr. 999'
    }
];
