import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Link } from '../../../../shared/interfaces/link';
import { RootService } from '../../../../shared/services/root.service';
import { Location } from '@angular/common';
import { ShopService } from '../../../../shared/api/shop.service';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/products.service';
import { shopCategoriesDef } from 'src/fake-server/database/categories';
import { CategoryDef } from 'src/fake-server/interfaces/category-def';

@Component({
    selector: 'app-grid',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
    providers: [
        { provide: PageCategoryService, useClass: PageCategoryService },
        { provide: ShopSidebarService, useClass: ShopSidebarService },
    ]
})
export class PageCategoryComponent implements OnDestroy {
    allProducts: Product[] = [];
    products: Product[] = [];
    columns: 3 | 4 | 5 = 3;
    viewMode: 'grid' | 'features' | 'list' = 'grid';
    sidebarPosition: 'start' | 'end' = 'start';
    breadcrumbs: Link[] = [];
    pageHeader = '';
    // ----------------------- params
    params: any = {};
    currentUrl = '/shop/catalog';
    categories = shopCategoriesDef;
    category?: CategoryDef;
    // --------------------------- qp
    qp: any = {};
    searchTerm: any = null;
    minPrice: any = null;
    maxPrice: any = null;
    brands: any = null;
    disc: any = null;
    colors: any = null;
    //
    sort = 'default';
    limit = 8;
    totalCount = 0;

    private sub0: any; private sub1: any; private sub2: any;

    constructor(
        private productService: ProductService,
        private root: RootService,
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageCategoryService,
        private shop: ShopService,
        private location: Location,
    ) {
        // ******************************************************************************************** P A R A M
        // ******************************************************************************************************
        // ******************************************************************************************************
        this.sub0 = this.route.params.subscribe(params => {
            this.params = params;
            // --------------------------------------------------------- CATEGORY PARAM
            this.category = {} as CategoryDef;
            this.category.slug = params['category'];

            if (this.category.slug) {
                this.currentUrl = this.root.shop() + '/' + this.category.slug;
                //
                let categ = this.categories.find(c => c.slug == this.category?.slug);
                if (categ) {
                    this.category.name = categ.name;
                    this.pageHeader = categ.name;
                }
                else {
                    for (let c of this.categories) {
                        if (c.children && c.children.length) {
                            for (let child of c.children) {
                                if (child.slug === this.category.slug) {
                                    this.category.name = child.name;
                                    this.pageHeader = child.name;
                                }
                            }
                        }
                    }
                }
                this.breadcrumbs = [
                    { label: 'Acasă', url: this.root.home() },
                    { label: 'Magazin', url: this.root.shop() },
                    { label: this.category.name, url: '' }
                ];
            }
            else {
                this.breadcrumbs = [
                    { label: 'Acasă', url: this.root.home() },
                    { label: 'Magazin', url: '' }
                ];
            }
            //
            this.getProducts();
        });

        // ************************************************************************************************** Q P
        // ******************************************************************************************************
        // ******************************************************************************************************
        this.sub1 = this.route.queryParams.subscribe(qp => {
            this.qp = qp;
            // --------------------------------------------------------- FILTERS PARAM
            if (qp['search']) this.searchTerm = qp['search'];
            else this.searchTerm = null;
            // ------- products
            if (qp['minPrice']) this.minPrice = parseInt(qp['minPrice']);
            else this.minPrice = null;

            if (qp['maxPrice']) this.maxPrice = parseInt(qp['maxPrice']);
            else this.maxPrice = null;

            if (qp['brands']) this.brands = qp['brands'].split(',');
            else this.brands = null;

            if (qp['disc']) this.disc = qp['disc'];
            else this.disc = null;

            if (qp['colors']) this.colors = qp['colors'].split(',');
            else this.colors = null;

            // ------- display
            let cols = parseInt(qp['cols']);
            if (cols && (cols == 3 || cols == 4 || cols == 5)) this.columns = cols;
            else this.columns = 3;

            let mode = qp['view'];
            if (mode && (mode == "grid" || mode == "features" || mode == "list")) this.viewMode = mode;
            else this.viewMode = 'grid';

            // --------------------------------------------------------- SORTERS PARAM
            // --------- pages
            let sort = qp['sort'];
            if (sort && (sort == "name_asc" || sort == "name_desc" || sort == "price_asc" || sort == "price_desc")) {
                this.sort = sort;
            }
            else this.sort = 'default';

            let limit = parseInt(qp['limit']);
            if (limit && (limit == 12 || limit == 16)) this.limit = limit;
            else this.limit = 8;
            //
            this.getProducts();
        });
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    getProducts() {
        // ====================================================================================== P R O D U C T S
        // ======================================================================================================
        // ======================================================================================================
        this.sub2 = this.productService.fetchProducts().subscribe(result => {
            this.allProducts = result.products;
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S E A R C H ()
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S E A R C H ()
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S E A R C H ()
            let totalProducts: any = [];
            //
            if (this.searchTerm) {
                totalProducts = result.products.filter((prod: any) =>
                    prod.name
                        .replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
                        .replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
                        .replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
                        .replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
                        .toLowerCase()
                        .includes(this.searchTerm
                            .replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
                            .replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
                            .replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
                            .replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
                            .toLowerCase()
                        ));
            }

            else totalProducts = result.products;
            // console.log(totalProducts)

            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    F I L T E R S
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    F I L T E R S
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    F I L T E R S

            // ------------------------------------------------------------------------------------- CATEGORY
            let categProducts: any = [];
            let categsOUT: any = [];
            if (this.category && this.category.slug) {
                for (let prod of totalProducts) {
                    for (let p of prod.categories) {
                        if (p == this.category.slug) categProducts.push(prod);
                    }
                }
                categsOUT = totalProducts.filter((val: any) => categProducts.includes(val));
            }
            else categsOUT = totalProducts;
            // console.log(categsOUT)

            // --------------------------------------------------------------------------------------- PRICES
            let priceProducts: any = [];
            let pricesOUT: any = [];
            if ((this.minPrice || this.minPrice == 0) && (this.maxPrice || this.maxPrice == 0)) {
                for (let prod of totalProducts) {
                    if (prod.price >= this.minPrice && prod.price <= this.maxPrice) {
                        priceProducts.push(prod);
                    }
                }
                pricesOUT = categsOUT.filter((val: any) => priceProducts.includes(val));
            }
            else pricesOUT = categsOUT;
            // console.log(pricesOUT)

            // --------------------------------------------------------------------------------------- BRANDS
            let brandProducts: any = [];
            let brandsOUT: any = [];
            if (this.brands) {
                for (let prod of totalProducts) {
                    for (let b of this.brands) {
                        if (prod.brand == b) brandProducts.push(prod);
                    }
                }
                brandsOUT = pricesOUT.filter((val: any) => brandProducts.includes(val));
            }
            else brandsOUT = pricesOUT;
            // console.log(brandsOUT)

            // ------------------------------------------------------------------------------------- DISCOUNT
            let discProducts: any = [];
            let discOUT: any = [];
            if (this.disc) {
                for (let prod of totalProducts) {
                    if (this.disc == "da") {
                        if (prod.oldPrice) discProducts.push(prod);
                    }
                    else if (this.disc == "nu") {
                        if (!prod.oldPrice) discProducts.push(prod);
                    }
                }
                discOUT = brandsOUT.filter((val: any) => discProducts.includes(val));
            }
            else discOUT = brandsOUT;
            // console.log(discOUT)

            // --------------------------------------------------------------------------------------- COLORS
            let colorProducts: any = [];
            let colorsOUT: any = [];
            if (this.colors) {
                for (let prod of totalProducts) {
                    for (let p of prod.colors) {
                        for (let c of this.colors) {
                            if (p == c) colorProducts.push(prod);
                        }
                    }
                }
                colorsOUT = discOUT.filter((val: any) => colorProducts.includes(val));
            }
            else colorsOUT = discOUT;
            // console.log(colorsOUT)

            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S O R T E R S
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S O R T E R S
            // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =    S O R T E R S

            //
            // ========================================= PRODUCTS OUT =========================================
            // ========================================= PRODUCTS OUT =========================================
            // ========================================= PRODUCTS OUT =========================================
            totalProducts = colorsOUT;
            // console.log("OUT_Products: ", totalProducts)
            this.totalCount = totalProducts.length;
            //
            this.sorter(totalProducts);
            //
            let pageInd = 0;
            if (this.qp.page && this.qp.page >= 1) pageInd = this.qp.page - 1;
            //
            const startInd = pageInd * this.limit;
            const endInd = startInd + this.limit;
            this.products = totalProducts.slice(startInd, endInd);
        });
    }

    sorter(totalProducts: any) {
        if (this.sort === "default") {
            // totalProducts = totalProducts.sort((a: any, b: any): any => a.id - b.id);
        }
        if (this.sort === "name_asc") {
            totalProducts = totalProducts.sort((a: any, b: any): any => {
                const nameA = a.name;
                const nameB = b.name;
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        }
        if (this.sort === "name_desc") {
            totalProducts = totalProducts.sort((a: any, b: any): any => {
                const nameA = a.name;
                const nameB = b.name;
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                return 0;
            });
        }
        if (this.sort === "price_asc") {
            totalProducts = totalProducts.sort((a: any, b: any): any => a.price - b.price);
        }
        if (this.sort === "price_desc") {
            totalProducts = totalProducts.sort((a: any, b: any): any => b.price - a.price);
        }
    }

    ngOnDestroy(): void {
        this.sub0?.unsubscribe();
        this.sub1?.unsubscribe();
        this.sub2?.unsubscribe();
    }

    getProductsViewLayout(): 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' {
        return 'grid-' + this.columns + '-full' as 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full';
    }

}
