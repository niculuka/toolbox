import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {
        label: 'Mega Meniu', menu: {
            type: 'megamenu',
            size: 'nl',
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
                    size: 4, items: [
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
            ]
        }
    },
    {
        label: 'Magazin', menu: {
            type: 'menu',
            items: [
                {
                    label: 'Afișare', items: [
                        { label: 'Grilă (3 Col)', url: '/shop/catalog' },
                        { label: 'Grilă (4 Col)', url: '/shop/catalog', cols: '4' },
                        { label: 'Grilă (5 Col)', url: '/shop/catalog', cols: '5' },
                        { label: 'Caracteristici (3 Col)', url: '/shop/catalog', view: 'features' },
                        { label: 'Caracteristici (4 Col)', url: '/shop/catalog', cols: '4', view: 'features' },
                        { label: 'Caracteristici (5 Col)', url: '/shop/catalog', cols: '5', view: 'features' },
                        { label: 'Listă', url: '/shop/catalog', view: 'list' },
                        { label: 'Listă Completă', url: '/shop/catalog', cols: '4', view: 'list' },
                    ]
                },
                { label: 'Produs',  url: '/shop/products/masina-de-infiletat-black-decker-cu-acumulator-12V' },
                { label: 'Coș', url: '/shop/cart' },
                { label: 'Plată', url: '/shop/cart/checkout' },
                { label: 'Succes Comandă', url: '/shop/cart/checkout/success' },
                { label: 'Favorite', url: '/shop/wishlist' },
                { label: 'Comparare', url: '/shop/compare' },
                { label: 'Urmărește Comanda', url: '/shop/track-order' }
            ]
        }
    },
    {
        label: 'Cont', menu: {
            type: 'menu',
            items: [
                { label: 'Conectare', url: '/account/login' },
                { label: 'Panou De Control', url: '/account/dashboard' },
                { label: 'Editare Profil', url: '/account/profile' },
                { label: 'Istoric Comandă', url: '/account/orders' },
                { label: 'Detalii Comandă', url: '/account/orders/5' },
                { label: 'Adresa', url: '/account/addresses' },
                { label: 'Editare Adresa', url: '/account/addresses/5' },
                { label: 'Schimbare Parolă', url: '/account/password' }
            ]
        }
    },
    {
        label: 'Pagini', menu: {
            type: 'menu',
            items: [
                { label: 'Despre Noi', url: '/site/about-us' },
                { label: 'Contactează-ne', url: '/site/contact-us' },
                { label: 'Eroare 404', url: '/site/not-found' },
                { label: 'Termeni Și Condiții', url: '/site/terms' },
                { label: 'Întrebari Și Răspunsuri', url: '/site/faq' }
            ]
        }
    },
    // {label: 'Buy Demo', url: 'https://toolbox.rooooooo/', external: true}
];
