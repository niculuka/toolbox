import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {
        type: 'button', label: 'Categorii', children: [
            {
                type: 'button', label: 'Scule Electrice', children: [
                    { type: 'link', label: 'Mașini De Găurit Și Înșurubat', url: '/shop/catalog/masini-de-gaurit-si-insurubat' },
                    { type: 'link', label: 'Ciocane Rotopercutoare', url: '/shop/catalog/ciocane-rotopercutoare' },
                    { type: 'link', label: 'Polizoare', url: '/shop/catalog/polizoare' },
                    { type: 'link', label: 'Pistoale De Vopsit', url: '/shop/catalog/pistoale-de-vopsit' },
                    { type: 'link', label: 'Capsatoare', url: '/shop/catalog/capsatoare' },
                    { type: 'link', label: 'Fierăstraie Electrice', url: '/shop/catalog/fierastraie-electrice' }
                ]
            },
            {
                type: 'button', label: 'Scule De Putere', children: [
                    { type: 'link', label: 'Generatoare', url: '/shop/catalog/generatoare' },
                    { type: 'link', label: 'Compresoare', url: '/shop/catalog/compresoare' },
                    { type: 'link', label: 'Motoare Electrice', url: '/shop/catalog/motoare-electrice' }
                ]
            },
            {
                type: 'button', label: 'Scule De Mână', children: [
                    { type: 'link', label: 'Truse De Scule', url: '/shop/catalog/truse-de-scule' },
                    { type: 'link', label: 'Ciocane', url: '/shop/catalog/ciocane' },
                    { type: 'link', label: 'Chei', url: '/shop/catalog/chei' },
                    { type: 'link', label: 'Instrumente De Tăiere', url: '/shop/catalog/instrumente-de-taiere' },
                    { type: 'link', label: 'Menghine', url: '/shop/catalog/menghine' }
                ]
            },
            {
                type: 'button', label: 'Feronerie', children: [
                    { type: 'link', label: 'Organe De Asamblare', url: '/shop/catalog/organe-de-asamblare' },
                    { type: 'link', label: 'Accesorii Mobilă', url: '/shop/catalog/accesorii-moblila' },
                    { type: 'link', label: 'Conectori Pentru Construcții Din Lemn', url: '/shop/catalog/conectori-pentru-constructii-din-lemn' },
                    { type: 'link', label: 'Roți Și Rotile', url: '/shop/catalog/roti-si-rotile' }
                ]
            },
            {
                type: 'button', label: 'Măsurare', children: [
                    { type: 'link', label: 'Metre', url: '/shop/catalog/metre' },
                    { type: 'link', label: 'Echere Și Liniare', url: '/shop/catalog/echere-si-liniare' },
                    { type: 'link', label: 'Lasere', url: '/shop/catalog/lasere' },
                    { type: 'link', label: 'Șublere', url: '/shop/catalog/sublere' },
                    { type: 'link', label: 'Nivele', url: '/shop/catalog/nivele' }
                ]
            },
            {
                type: 'button', label: 'Echipamente De Protecție', children: [
                    { type: 'link', label: 'Căști De Protecție', url: '/shop/catalog/casti-de-protectie' },
                    { type: 'link', label: 'Haine De Lucru', url: '/shop/catalog/haine-de-lucru' },
                    { type: 'link', label: 'Centuri De Siguranță', url: '/shop/catalog/centuri-de-siguranta' },
                    { type: 'link', label: 'Pantofi De Lucru', url: '/shop/catalog/pantofi-de-lucru' }
                ]
            }
        ]
    },
    {
        type: 'button', label: 'Magazin', children: [
            {
                type: 'button', label: 'Afișare', children: [
                    { type: 'link', label: 'Grilă', url: '/shop/catalog' },
                    { type: 'link', label: 'Caracteristici', url: '/shop/catalog', view: 'features' },
                    { type: 'link', label: 'Listă', url: '/shop/catalog', view: 'list' }

                ]
            },
            { type: 'link', label: 'Produs', url: '/shop/products/masina-de-infiletat-black-decker-cu-acumulator-12V' },
            { type: 'link', label: 'Coș', url: '/shop/cart' },
            { type: 'link', label: 'Plată', url: '/shop/cart/checkout' },
            { type: 'link', label: 'Succes Comandă', url: '/shop/cart/checkout/success' },
            { type: 'link', label: 'Favorite', url: '/shop/wishlist' },
            { type: 'link', label: 'Comparare', url: '/shop/compare' },
            { type: 'link', label: 'Urmărește Comanda', url: '/shop/track-order' }
        ]
    },
    {
        type: 'button', label: 'Cont', children: [
            { type: 'link', label: 'Conectare', url: '/account/login' },
            { type: 'link', label: 'Panou De Control', url: '/account/dashboard' },
            { type: 'link', label: 'Editare Profil', url: '/account/profile' },
            { type: 'link', label: 'Istoric Comandă', url: '/account/orders' },
            { type: 'link', label: 'Detalii Comandă', url: '/account/orders/5' },
            { type: 'link', label: 'Adresa', url: '/account/addresses' },
            { type: 'link', label: 'Editare Adresa', url: '/account/addresses/5' },
            { type: 'link', label: 'Schimbare Parolă', url: '/account/password' }
        ]
    },
    {
        type: 'button', label: 'Pagini', children: [
            { type: 'link', label: 'Despre Noi', url: '/site/about-us' },
            { type: 'link', label: 'Contactează-ne', url: '/site/contact-us' },
            { type: 'link', label: 'Eroare 404', url: '/site/not-found' },
            { type: 'link', label: 'Termeni Și Condiții', url: '/site/terms' },
            { type: 'link', label: 'Întrebari Și Răspunsuri', url: '/site/faq' }
        ]
    }
];
