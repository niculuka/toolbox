import { Order } from '../app/shared/interfaces/order';

export const orders: Partial<Order>[] = [
    {
        id: 8132,
        date: '2 Aprilie, 2025',
        status: 'în lucru',
        total: 2719,
        quantity: 5,
    },
    {
        id: 7592,
        date: '28 Martie, 2025',
        status: 'în lucru',
        total: 374,
        quantity: 3,
    },
    {
        id: 7192,
        date: '15 Martie, 2025',
        status: 'la curier',
        total: 791,
        quantity: 4,
    },
    {
        id: 6321,
        date: '28 Februarie, 2025',
        status: 'completă',
        total: 57,
        quantity: 1,
    },
    {
        id: 6001,
        date: '21 Februarie, 2025',
        status: 'completă',
        total: 252,
        quantity: 2,
    },
    {
        id: 4120,
        date: '11 Februarie, 2024',
        status: 'completă',
        total: 3978,
        quantity: 7,
    }
];
