import { Component, OnDestroy, OnInit } from '@angular/core';
import { Brand } from '../../shared/interfaces/brand';
import { Observable, Subject, merge } from 'rxjs';
import { ShopService } from '../../shared/api/shop.service';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/products.service';

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: Product[];
    groups: ProductsCarouselGroup[];
}

@Component({
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Product[]>;
    brands$!: Observable<Brand[]>;
    popularCategories$!: Observable<Category[]>;

    columnTopRated$!: Observable<Product[]>;
    columnSpecialOffers$!: Observable<Product[]>;
    columnBestsellers$!: Observable<Product[]>;

    featuredProducts!: ProductsCarouselData;
    latestProducts!: ProductsCarouselData;

    featuredProdsIds = [1, 7, 10, 13, 18, 22, 24];
    featuredProds: any = [];
    private sub0: any;

    constructor(
        private shop: ShopService,
        private productService: ProductService
    ) {
        this.sub0 = this.productService.fetchProducts().subscribe(result => {
            let prods: any = [];
            for (let prod of result.products) {
                for (let id of this.featuredProdsIds) {
                    if (id == prod.id) {
                        prods.push(prod)
                    }
                }
            }
            this.featuredProds = prods;
        });
    }

    ngOnInit(): void {
        this.bestsellers$ = this.shop.getBestsellers(7);
        this.brands$ = this.shop.getPopularBrands();
        this.popularCategories$ = this.shop.getCategoriesBySlug([
            'power-tools',
            'hand-tools',
            'machine-tools',
            'power-machinery',
            'measurement',
            'clothes-and-ppe',
        ], 1);
        this.columnTopRated$ = this.shop.getTopRated(3);
        this.columnSpecialOffers$ = this.shop.getSpecialOffers(3);
        this.columnBestsellers$ = this.shop.getBestsellers(3);

        this.featuredProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    products$: this.shop.getFeaturedProducts(null, 8),
                },
                {
                    name: 'Power Tools',
                    current: false,
                    products$: this.shop.getFeaturedProducts('power-tools', 8),
                },
                {
                    name: 'Hand Tools',
                    current: false,
                    products$: this.shop.getFeaturedProducts('hand-tools', 8),
                },
                {
                    name: 'Plumbing',
                    current: false,
                    products$: this.shop.getFeaturedProducts('plumbing', 8),
                },
            ],
        };
        this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);

        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'All',
                    current: true,
                    products$: this.shop.getLatestProducts(null, 8),
                },
                {
                    name: 'Power Tools',
                    current: false,
                    products$: this.shop.getLatestProducts('power-tools', 8),
                },
                {
                    name: 'Hand Tools',
                    current: false,
                    products$: this.shop.getLatestProducts('hand-tools', 8),
                },
                {
                    name: 'Plumbing',
                    current: false,
                    products$: this.shop.getLatestProducts('plumbing', 8),
                },
            ],
        };
        this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.sub0?.unsubscribe();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }
}
