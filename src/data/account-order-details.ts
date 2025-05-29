import { Order } from '../app/shared/interfaces/order';

export const order: Order = {
    id: 6321,
    date: '28 Februarie, 2025',
    status: 'Completă',
    items: [
        {
            id: 1,
            slug: 'compresor-aer-cu-piston-fara-ulei-dewalt-dpc6mrc-6-litri-1-5-cp',
            name: 'Compresor aer cu piston, fara ulei, DeWalt DPC6MRC, 6 litri, 1.5 CP',
            image: 'assets/images/products/product-1.jpg',
            options: [
                {
                    label: 'Culoare',
                    value: 'Galben',
                },
                {
                    label: 'Material',
                    value: 'Aluminiu',
                },
            ],
            price: 1210,
            quantity: 1,
            total: 1240,
        }
    ],
    additionalLines: [
        {
            label: 'Credit Magazin',
            total: -20,
        },
        {
            label: 'Transport',
            total: 25,
        },
    ],
    quantity: 1,
    subtotal: 1240,
    total: 1260,
    paymentMethod: 'PayPal',
    shippingAddress: {
        firstName: 'Ionel',
        lastName: 'Popescu',
        email: 'ionel.popescu@gmail.ro',
        phone: '+40766222111',
        country: 'România',
        city: 'București',
        postcode: '333555',
        address: 'Calea Victoriei, nr. 260'
    },
    billingAddress: {
        firstName: 'Gică',
        lastName: 'Moldovan',
        email: 'gica.moldovan@gmail.ro',
        phone: '+40788777222',
        country: 'România',
        city: 'București',
        postcode: '333666',
        address: 'Aleea Romană, nr. 999'
    },
};
