import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = 'București, Calea Lungă, nr. 400';
    email = 'magazin@example.com';
    phone = '0788.999.44.44';
    hours = 'Luni-Samb 10:00 - 19:00';

    get primaryPhone(): string | null {
        return this.phone.length > 0 ? this.phone : null;
    }

    constructor() { }
}
