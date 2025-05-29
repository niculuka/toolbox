import { Component, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RootService } from '../../../shared/services/root.service';
import { PageCategoryService } from '../../shop/services/page-category.service';
import { Product } from 'src/app/shared/interfaces/product';
import { shopCategoriesDef } from 'src/fake-server/database/categories';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { brandsDef } from 'src/fake-server/database/brands';
import { discountDef } from 'src/fake-server/database/discount';
import { colorsDef } from 'src/fake-server/database/colors';

@Component({
    selector: 'app-widget-filters',
    templateUrl: './widget-filters.component.html',
    styleUrls: ['./widget-filters.component.scss']
})
export class WidgetFiltersComponent implements OnChanges {
    @Input() products: Product[] = [];
    @Input() params: any = {};
    @Input() qp: any = {};
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    isPlatformBrowser = isPlatformBrowser(this.platformId);
    rightToLeft = false;

    currentCategory = "";
    categories = shopCategoriesDef;

    brands = JSON.parse(JSON.stringify(brandsDef));
    brandsParams: any = [];

    discounts = JSON.parse(JSON.stringify(discountDef));
    discParam = this.discounts[0].slug;

    colors = JSON.parse(JSON.stringify(colorsDef));
    colorsParams: any = [];

    minPrice = 0;
    maxPrice = 10000;

    sliderOptions: Options = {
        animate: false,
        rightToLeft: false,
        floor: 0,
        ceil: 10000,
        step: 200
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public activeRoute: ActivatedRoute,
        public root: RootService,
        private router: Router,
        public pageCategory: PageCategoryService,
    ) {
        this.activeRoute.queryParams.subscribe(qp => {

            // =========================================================================== INIT PRICES
            let min: any = parseInt(qp['minPrice']);
            let max: any = parseInt(qp['maxPrice']);
            if (parseInt((min || min == 0) && (max || max == 0))) {
                setTimeout(() => {
                    this.minPrice = min;
                    this.maxPrice = max;
                }, 200);
            } else {
                this.minPrice = 0;
                this.maxPrice = 10000;
            }
        });
    }

    ngOnChanges(): void {
        // ======================================================================= COUNT PRODUCTS
        this.categories = JSON.parse(JSON.stringify(shopCategoriesDef));
        if (this.products.length) {
            for (let c of this.categories) {
                for (let p of this.products) {
                    if (p.categories.length) {
                        for (let pc of p.categories) {
                            if (c.slug == pc.toString()) c.items += 1;
                        }
                    }
                }
            }
        }

        // ================================================================= INIT Current CATEGORY
        if (this.params.category) this.currentCategory = this.params.category;
        else this.currentCategory = "";

        // =========================================================================== INIT BRANDS
        if (this.qp.brands) {
            let selBrands = [] = this.qp.brands.split(',');
            this.brands = JSON.parse(JSON.stringify(brandsDef));
            //
            for (let sb of selBrands) {
                for (let b of this.brands) {
                    if (sb == b.slug) b.checked = true;
                }
            }
        }
        else this.brands = JSON.parse(JSON.stringify(brandsDef));

        // ========================================================================= INIT DISCOUNT
        if (this.qp.disc) {
            this.discounts = JSON.parse(JSON.stringify(discountDef));
            //
            for (let d of this.discounts) {
                if (this.qp.disc == d.slug) d.checked = true;
                else d.checked = false;
            }

        }
        else {
            this.discounts = JSON.parse(JSON.stringify(discountDef));
            this.discounts[0].checked = true;
        }

        // =========================================================================== INIT COLORS
        if (this.qp.colors) {
            let selColors = [] = this.qp.colors.split(',');
            this.colors = JSON.parse(JSON.stringify(colorsDef));
            //
            for (let sc of selColors) {
                for (let c of this.colors) {
                    if (sc == c.slug) c.checked = true;
                }
            }
        }
        else this.colors = JSON.parse(JSON.stringify(colorsDef));
    }

    changePrices() {
        if (this.minPrice == 0 && this.maxPrice == 10000) {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, minPrice: null, maxPrice: null }, queryParamsHandling: 'merge' }
            );
        }
        else {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, minPrice: this.minPrice, maxPrice: this.maxPrice }, queryParamsHandling: 'merge' }
            );
        }
    }

    changeBrands(event: any) {
        this.brands.filter((brand: any) => {
            if (brand.slug == event.target.value) brand.checked = event.target.checked;
        });
        this.brandsParams = [];
        for (let brand of this.brands) {
            if (brand.checked) this.brandsParams.push(brand.slug);
        }
        if (this.brandsParams.length) {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, brands: this.brandsParams.join(",") }, queryParamsHandling: 'merge' }
            );
        }
        else {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, brands: null }, queryParamsHandling: 'merge' }
            );
        }
    }

    changeDiscount(event: any) {
        this.discounts.filter((disc: any) => {
            if (disc.slug == event.target.value) {
                disc.checked = true;
                this.discParam = event.target.value;
                //
                if (this.discParam != 'oricare') {
                    this.router.navigate(
                        [this.root.categ(this.currentCategory)],
                        { queryParams: { page: null, disc: this.discParam }, queryParamsHandling: 'merge' }
                    );
                }
                else {
                    this.router.navigate(
                        [this.root.categ(this.currentCategory)],
                        { queryParams: { page: null, disc: null }, queryParamsHandling: 'merge' }
                    );
                }
            }
            else disc.checked = false;
        });
    }

    changeColors(event: any) {
        this.colors.filter((color: any) => {
            if (color.slug == event.target.value) color.checked = event.target.checked;
        });
        this.colorsParams = [];
        for (let color of this.colors) {
            if (color.checked) this.colorsParams.push(color.slug);
        }
        if (this.colorsParams.length) {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, colors: this.colorsParams.join(",") }, queryParamsHandling: 'merge' }
            );
        }
        else {
            this.router.navigate(
                [this.root.categ(this.currentCategory)],
                { queryParams: { page: null, colors: null }, queryParamsHandling: 'merge' }
            );
        }
    }
}
