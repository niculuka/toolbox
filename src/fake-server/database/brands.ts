import { BrandDef } from '../interfaces/brand-def';
import { Brand } from '../../app/shared/interfaces/brand';
import { Observable, of } from 'rxjs';

let lastBrandId = 0;

export const brandsDef: BrandDef[] = [
    { name: 'Bosch', slug: 'bosch', checked: false, image: 'assets/images/logos/logo-1.png' },
    { name: 'Makita', slug: 'makita', checked: false, image: 'assets/images/logos/logo-2.png' },
    { name: 'Black+Decker', slug: 'black-decker', checked: false, image: 'assets/images/logos/logo-3.png' },
    { name: 'DeWalt', slug: 'dewalt', checked: false, image: 'assets/images/logos/logo-4.png' },
    { name: 'Hikoki', slug: 'hikoki', checked: false, image: 'assets/images/logos/logo-5.png' },
    { name: 'Novus', slug: 'novus', checked: false, image: 'assets/images/logos/logo-6.png' },
    { name: 'Stanley', slug: 'stanley', checked: false, image: 'assets/images/logos/logo-7.png' },
    { name: 'Electroprecizia', slug: 'electroprecizia', checked: false, image: 'assets/images/logos/logo-8.png' },
    { name: 'Micul Fermier', slug: 'micul-fermier', checked: false, image: 'assets/images/logos/logo-9.png' }    
];

export const brands: Brand[] = brandsDef.map(brandDef => {
    return {
        ...brandDef,
        id: ++lastBrandId,
    };
});

export function getBrands(): Observable<Brand[]> {
    return of(brands);
}

