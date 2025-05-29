import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const departments: NavigationLink[] = [
    {
        label: 'MEGA MENIU', menu: {
            type: 'megamenu',
            size: 'xl',
            image: 'assets/images/megamenu/megamenu-1.jpg',
            columns: [
                {
                    size: 3, items: [
                        {
                            label: 'Scule Electrice', url: '/shop/catalog/scule-electrice', items: [
                                { label: 'Mașini De Găurit Și Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
                                { label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
                                { label: 'Polizoare', url: '/shop/catalog/polizoare' },
                                { label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
                                { label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
                                { label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
                            ]
                        },
                        {
                            label: 'Scule De Putere', url: '/shop/catalog/scule-de-putere', items: [
                                { label: 'Generatoare', url: '/shop/catalog/generatoare' },
                                { label: 'Compresoare', url: '/shop/catalog/compresoare' },
                                { label: 'Motoare Electrice', url: '/shop/catalog/motoare-electrice' }
                            ]
                        }
                    ]
                },
                {
                    size: 3, items: [

                        {
                            label: 'Scule De Mână', url: '/shop/catalog/scule-de-mana', items: [
                                { label: 'Truse De Scule', url: '/shop/catalog/truse-de-scule' },
                                { label: 'Ciocane', url: '/shop/catalog/ciocane' },
                                { label: 'Chei', url: '/shop/catalog/chei' },
                                { label: 'Instrumente De Tăiere', url: '/shop/catalog/instrumente-de-taiere' },
                                { label: 'Menghine', url: '/shop/catalog/menghine' }
                            ]
                        },
                        {
                            label: 'Feronerie', url: '/shop/catalog/feronerie', items: [
                                { label: 'Organe De Asamblare', url: '/shop/catalog/organe-de-asamblare' },
                                { label: 'Accesorii Mobilă', url: '/shop/catalog/accesorii-moblila' },
                                { label: 'Conectori Pentru Construcții Din Lemn', url: '/shop/catalog/conectori-pentru-constructii-din-lemn' },
                                { label: 'Roți Și Rotile', url: '/shop/catalog/roti-si-rotile' }
                            ]
                        }
                    ]
                },
                {
                    size: 3, items: [
                        {
                            label: 'Măsurare', url: '/shop/catalog/masurare', items: [
                                { label: 'Metre', url: '/shop/catalog/metre' },
                                { label: 'Echere Și Liniare', url: '/shop/catalog/echere-si-liniare' },
                                { label: 'Lasere', url: '/shop/catalog/lasere' },
                                { label: 'Șublere', url: '/shop/catalog/sublere' },
                                { label: 'Nivele', url: '/shop/catalog/nivele' }
                            ]
                        }
                    ]
                },
                {
                    size: 3, items: [
                        {
                            label: 'Echipamente De Protecție', url: '/shop/catalog/echipamente-de-protectie', items: [
                                { label: 'Căști De Protecție', url: '/shop/catalog/casti-de-protectie' },
                                { label: 'Haine De Lucru', url: '/shop/catalog/haine-de-lucru' },
                                { label: 'Centuri De Siguranță', url: '/shop/catalog/centuri-de-siguranta' },
                                { label: 'Pantofi De Lucru', url: '/shop/catalog/pantofi-de-lucru' }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        label: 'Mașini Unelte', menu: {
            type: 'megamenu',
            size: 'lg',
            image: 'assets/images/megamenu/megamenu-2.jpg',
            columns: [
                {
                    size: 4, items: [
                        {
                            label: 'Scule Electrice', url: '/shop/catalog/scule-electrice', items: [
                                { label: 'Mașini De Găurit Și Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
                                { label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
                                { label: 'Polizoare', url: '/shop/catalog/polizoare' },
                                { label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
                                { label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
                                { label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
                            ]
                        },
                        {
                            label: 'Scule De Putere', url: '/shop/catalog/scule-de-putere', items: [
                                { label: 'Generatoare', url: '/shop/catalog/generatoare' },
                                { label: 'Compresoare', url: '/shop/catalog/compresoare' },
                                { label: 'Motoare Electrice', url: '/shop/catalog/motoare-electrice' }
                            ]
                        }
                    ]
                },
                {
                    size: 4, items: [
                        {
                            label: 'Scule De Mână', url: '/shop/catalog/scule-de-mana', items: [
                                { label: 'Truse De Scule', url: '/shop/catalog/truse-de-scule' },
                                { label: 'Ciocane', url: '/shop/catalog/ciocane' },
                                { label: 'Chei', url: '/shop/catalog/chei' },
                                { label: 'Instrumente De Tăiere', url: '/shop/catalog/instrumente-de-taiere' },
                                { label: 'Menghine', url: '/shop/catalog/menghine' }
                            ]
                        }
                    ]
                },
                {
                    size: 4, items: [
                        {
                            label: 'Măsurare', url: '/shop/catalog/masurare', items: [
                                { label: 'Metre', url: '/shop/catalog/metre' },
                                { label: 'Echere Și Liniare', url: '/shop/catalog/echere-si-liniare' },
                                { label: 'Lasere', url: '/shop/catalog/lasere' },
                                { label: 'Șublere', url: '/shop/catalog/sublere' },
                                { label: 'Nivele', url: '/shop/catalog/nivele' }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        label: 'Hobby', menu: {
            type: 'megamenu',
            size: 'nl',
            image: 'assets/images/megamenu/megamenu-3.jpg',
            columns: [
                {
                    size: 6, items: [
                        {
                            label: 'Măsurare', url: '/shop/catalog/masurare', items: [
                                { label: 'Metre', url: '/shop/catalog/metre' },
                                { label: 'Echere Și Liniare', url: '/shop/catalog/echere-si-liniare' },
                                { label: 'Lasere', url: '/shop/catalog/lasere' },
                                { label: 'Șublere', url: '/shop/catalog/sublere' },
                                { label: 'Nivele', url: '/shop/catalog/nivele' }
                            ]
                        }
                    ]
                },
                {
                    size: 6, items: [
                        {
                            label: 'Echipamente De Protecție', url: '/shop/catalog/echipamente-de-protectie', items: [
                                { label: 'Căști De Protecție', url: '/shop/catalog/casti-de-protectie' },
                                { label: 'Haine De Lucru', url: '/shop/catalog/haine-de-lucru' },
                                { label: 'Centuri De Siguranță', url: '/shop/catalog/centuri-de-siguranta' },
                                { label: 'Pantofi De Lucru', url: '/shop/catalog/pantofi-de-lucru' }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        label: 'Scule & Prelucrare', menu: {
            type: 'megamenu',
            size: 'sm',
            columns: [
                {
                    size: 12, items: [
                        {
                            label: 'Scule Electrice', url: '/shop/catalog/scule-electrice', items: [
                                { label: 'Mașini De Găurit Și Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
                                { label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
                                { label: 'Polizoare', url: '/shop/catalog/polizoare' },
                                { label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
                                { label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
                                { label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
                            ]
                        },
                        {
                            label: 'Scule De Putere', url: '/shop/catalog/scule-de-putere', items: [
                                { label: 'Generatoare', url: '/shop/catalog/generatoare' },
                                { label: 'Compresoare', url: '/shop/catalog/compresoare' },
                                { label: 'Motoare Electrice', url: '/shop/catalog/motoare-electrice' }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        label: 'MENU', menu: {
            type: 'menu',
            items: [
                {
                    label: 'Scule Electrice', url: '/shop/catalog/scule-electrice', items: [
                        { label: 'Mașini De Găurit Și Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
                        { label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
                        { label: 'Polizoare', url: '/shop/catalog/polizoare' },
                        { label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
                        { label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
                        { label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
                    ]
                },
                {
                    label: 'Scule De Putere', url: '/shop/catalog/scule-de-putere', items: [
                        { label: 'Generatoare', url: '/shop/catalog/generatoare' },
                        { label: 'Compresoare', url: '/shop/catalog/compresoare' },
                        { label: 'Motoare Electrice', url: '/shop/catalog/motoare-electrice' }
                    ]
                },
                {
                    label: 'Scule De Mână', url: '/shop/catalog/scule-de-mana', items: [
                        { label: 'Truse De Scule', url: '/shop/catalog/truse-de-scule' },
                        { label: 'Ciocane', url: '/shop/catalog/ciocane' },
                        { label: 'Chei', url: '/shop/catalog/chei' },
                        { label: 'Instrumente De Tăiere', url: '/shop/catalog/instrumente-de-taiere' },
                        { label: 'Menghine', url: '/shop/catalog/menghine' }
                    ]
                },
                {
                    label: 'Feronerie', url: '/shop/catalog/feronerie', items: [
                        { label: 'Organe De Asamblare', url: '/shop/catalog/organe-de-asamblare' },
                        { label: 'Accesorii Mobilă', url: '/shop/catalog/accesorii-moblila' },
                        { label: 'Conectori Pentru Construcții Din Lemn', url: '/shop/catalog/conectori-pentru-constructii-din-lemn' },
                        { label: 'Roți Și Rotile', url: '/shop/catalog/roti-si-rotile' }
                    ]
                },
                {
                    label: 'Măsurare', url: '/shop/catalog/masurare', items: [
                        { label: 'Metre', url: '/shop/catalog/metre' },
                        { label: 'Echere Și Liniare', url: '/shop/catalog/echere-si-liniare' },
                        { label: 'Lasere', url: '/shop/catalog/lasere' },
                        { label: 'Șublere', url: '/shop/catalog/sublere' },
                        { label: 'Nivele', url: '/shop/catalog/nivele' }
                    ]
                },
                {
                    label: 'Echipamente De Protecție', url: '/shop/catalog/echipamente-de-protectie', items: [
                        { label: 'Căști De Protecție', url: '/shop/catalog/casti-de-protectie' },
                        { label: 'Haine De Lucru', url: '/shop/catalog/haine-de-lucru' },
                        { label: 'Centuri De Siguranță', url: '/shop/catalog/centuri-de-siguranta' },
                        { label: 'Pantofi De Lucru', url: '/shop/catalog/pantofi-de-lucru' }
                    ]
                }
            ]
        }
    },
    { label: 'Găurit & Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
    { label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
    { label: 'Polizoare', url: '/shop/catalog/polizoare' },
    { label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
    { label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
    { label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
];
