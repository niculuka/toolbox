import { CategoryDef } from '../interfaces/category-def';
import { Category } from '../../app/shared/interfaces/category';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

let lastCategoryId = 0;

export const shopCategoriesDef: CategoryDef[] = [
    {
        name: 'Scule Electrice',
        slug: 'scule-electrice',
        image: 'assets/images/categories/category-1.jpg',
        items: 0,
        children: [
            {
                name: 'Mașini De Găurit Și Înșurubat',
                slug: 'masini-de-gaurit-si-insurubat',
                items: 57,
            },
            {
                name: 'Ciocane Rotopercutoare',
                slug: 'ciocane-rotopercutoare',
                items: 15,
            },
            {
                name: 'Polizoare',
                slug: 'polizoare',
                items: 25,
            },
            {
                name: 'Pistoale De Vopsit',
                slug: 'pistoale-de-vopsit',
                items: 78,
            },
            {
                name: 'Capsatoare',
                slug: 'capsatoare',
                items: 3,
            },
            {
                name: 'Fierăstraie Electrice',
                slug: 'fierastraie-electrice',
                items: 128,
            }
        ],
    },
    {
        name: 'Scule De Putere',
        slug: 'scule-de-putere',
        image: 'assets/images/categories/category-3.jpg',
        items: 0,
        children: [
            {
                name: 'Generatoare',
                slug: 'generatoare',
                items: 23,
            },
            {
                name: 'Compresoare',
                slug: 'compresoare',
                items: 76,
            },
            {
                name: 'Motoare Electrice',
                slug: 'motoare-electrice',
                items: 76,
            }
        ],
    },
    {
        name: 'Scule De Mână',
        slug: 'scule-de-mana',
        image: 'assets/images/categories/category-2.jpg',
        items: 0,
        children: [
            {
                name: 'Truse De Scule',
                slug: 'truse-de-scule',
                items: 57,
            },
            {
                name: 'Ciocane',
                slug: 'ciocane',
                items: 15,
            },
            {
                name: 'Chei',
                slug: 'chei',
                items: 5,
            },
            {
                name: 'Instrumente De Tăiere',
                slug: 'instrumente-de-taiere',
                items: 54,
            },
            {
                name: 'Menghine',
                slug: 'menghine',
                items: 13,
            },
        ],
    },
    {
        name: 'Feronerie',
        slug: 'feronerie',
        image: 'assets/images/categories/category-5.jpg',
        items: 0,
        children: [
            {
                name: 'Organe De Asamblare',
                slug: 'organe-de-asamblare',
                items: 104,
            },
            {
                name: 'Accesorii Mobilă',
                slug: 'accesorii-moblila',
                items: 12,
            },
            {
                name: 'Conectori Pentru Construcții Din Lemn',
                slug: 'conectori-pentru-constructii-din-lemn',
                items: 67,
            },
            {
                name: 'Roți Și Rotile',
                slug: 'roti-si-rotile',
                items: 88,
            },
        ],
    },
    {
        name: 'Măsurare',
        slug: 'masurare',
        image: 'assets/images/categories/category-4.jpg',
        items: 0,
        children: [
            {
                name: 'Metre',
                slug: 'metre',
                items: 57,
            },
            {
                name: 'Echere Și Liniare',
                slug: 'echere-si-liniare',
                items: 5,
            },
            {
                name: 'Lasere',
                slug: 'lasere',
                items: 3,
            },
            {
                name: 'Șublere',
                slug: 'sublere',
                items: 37,
            },
            {
                name: 'Nivele',
                slug: 'nivele',
                items: 14,
            },
        ],
    },
    {
        name: 'Echipamente De Protecție',
        slug: 'echipamente-de-protectie',
        image: 'assets/images/categories/category-6.jpg',
        items: 0,
        children: [
            {
                name: 'Căști De Protecție',
                slug: 'casti-de-protectie',
                items: 9,
            },
            {
                name: 'Haine De Lucru',
                slug: 'haine-de-lucru',
                items: 24,
            },
            {
                name: 'Centuri De Siguranță',
                slug: 'centuri-de-siguranta',
                items: 1,
            },
            {
                name: 'Pantofi De Lucru',
                slug: 'pantofi-de-lucru',
                items: 0,
            },
        ]
    }
];

const blogCategoriesDef: CategoryDef[] = [
    {
        name: 'Latest News',
        slug: 'latest-news',
    },
    {
        name: 'Special Offers',
        slug: 'special-offers',
        children: [
            {
                name: 'Spring Sales',
                slug: 'spring-sales',
            },
            {
                name: 'Summer Sales',
                slug: 'summer-sales',
            },
            {
                name: 'Autumn Sales',
                slug: 'autumn-sales',
            },
            {
                name: 'Christmas Sales',
                slug: 'christmas-sales',
            },
            {
                name: 'Other Sales',
                slug: 'other-sales',
            }
        ],
    },
    {
        name: 'New Arrivals',
        slug: 'new-arrivals',
    },
    {
        name: 'Reviews',
        slug: 'reviews',
    },
    {
        name: 'Drills and Mixers',
        slug: 'drills-and-mixers',
    },
    {
        name: 'Cordless Screwdrivers',
        slug: 'cordless-screwdrivers',
    },
    {
        name: 'Screwdrivers',
        slug: 'screwdrivers',
    },
    {
        name: 'Wrenches',
        slug: 'wrenches',
    },
];

function walkTree(categoriesType: 'shop' | 'blog', categoriesDef: CategoryDef[], parents: Category[] = []): [Category[], Category[]] {
    let list: Category[] = [];
    const tree: Category[] = categoriesDef.map(categoryDef => {
        const category: Category = {
            id: ++lastCategoryId,
            type: categoriesType,
            name: categoryDef.name,
            slug: categoryDef.slug,
            path: [...parents.map(x => x.slug), categoryDef.slug].join('/'),
            image: categoryDef.image || null,
            items: categoryDef.items || 0,
            customFields: {},
            parents: parents.slice(),
            children: [],
        };

        const [childrenTree, childrenList] = walkTree(categoriesType, categoryDef.children || [], [...parents, category]);

        category.children = childrenTree;
        list = [...list, category, ...childrenList];

        return category;
    });

    return [tree, list];
}

export const [shopCategoriesTree, shopCategoriesList]: [Category[], Category[]] = walkTree('shop', shopCategoriesDef);
export const [blogCategoriesTree, blogCategoriesList]: [Category[], Category[]] = walkTree('blog', blogCategoriesDef);

function limitDepth(categories: Category[], depth: number): Category[] {
    return categories.map(category => {
        return {
            ...category,
            parents: null,
            children: depth !== 0 ? limitDepth(category.children || [], depth - 1) : null,
        };
    });
}

function getCategoriesTree(categoriesType: 'shop' | 'blog', parentSlug: string | null = null, depth: number = 0): Observable<Category[]> {
    let categories = [];
    const list = categoriesType === 'shop' ? shopCategoriesList : blogCategoriesList;
    const tree = categoriesType === 'shop' ? shopCategoriesTree : blogCategoriesTree;

    if (parentSlug === null) {
        categories = tree.slice();
    } else {
        const parent = list.find(x => x.slug === parentSlug);

        if (!parent) {
            return throwError(new HttpErrorResponse({ status: 404, statusText: 'Page Not Found' }));
        }

        categories = (parent.children || []).slice();
    }

    return of(limitDepth(categories, depth));
}

export function getShopCategoriesTree(parentSlug: string | null = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('shop', parentSlug, depth);
}

export function getBlogCategoriesTree(parentSlug: string | null = null, depth: number = 0): Observable<Category[]> {
    return getCategoriesTree('blog', parentSlug, depth);
}

export function getShopCategoriesBySlugs(slugs: string[], depth: number = 0): Observable<Category[]> {
    return of(limitDepth(shopCategoriesList.filter(x => slugs.includes(x.slug)), depth));
}

export function getShopCategory(slug: string): Observable<Category> {
    const category = shopCategoriesList.find(x => x.slug === slug);

    if (!category) {
        return throwError(new HttpErrorResponse({ status: 404, statusText: 'Page Not Found' }));
    }

    return of(JSON.parse(JSON.stringify({
        ...category,
        parents: limitDepth(category.parents || [], 0),
        children: limitDepth(category.children || [], 0),
    })));
}
