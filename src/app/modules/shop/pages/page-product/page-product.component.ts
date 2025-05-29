import { Component, OnInit } from '@angular/core';
import { MyProduct, Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/products.service';
import { shopCategoriesDef } from 'src/fake-server/database/categories';
import { Link } from 'src/app/shared/interfaces/link';
import { RootService } from 'src/app/shared/services/root.service';

class Category { name: string = ""; slug: string = ""; }

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    relatedProducts: Product[] = [];

    product: MyProduct = new MyProduct();
    layout: 'standard' | 'columnar' = 'standard';
    sidebarPosition: 'start' | 'end' = 'start';
    categories = shopCategoriesDef;
    category: Category = new Category();
    loaded = false;

    breadcrumbs: Link[] = [];

    constructor(
        private root: RootService,
        private shop: ShopService,
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.loaded = false;
            this.productService.fetchProducts().subscribe(result => {
                let products: any = result.products;
                for (let p of products) {
                    if (p.slug == params['productSlug']) {
                        this.product = p;
                        // breadcrumb
                        this.category.slug = this.product.categories[1].toString();
                        let categ = this.categories.find(c => c.slug == this.category.slug);
                        if (categ) {
                            this.category.name = categ.name;
                        }
                        else {
                            for (let c of this.categories) {
                                if (c.children && c.children.length) {
                                    for (let child of c.children) {
                                        if (child.slug === this.category.slug) {
                                            this.category.name = child.name;
                                        }
                                    }
                                }
                            }
                        }
                        this.breadcrumbs = [
                            { label: 'Acasă', url: this.root.home() },
                            { label: this.category.name, url: this.root.shop() + '/' + this.category.slug },
                            { label: this.product.name, url: '' }
                        ];

                        // this.prev = result.prevProduct;
                        // this.next = result.nextProduct;
                        // ------------------------------ related products
                        // this.related = [];
                        // for (let rel of p.related) {
                        // 	for (let relP of products) {
                        // 		if (rel == relP.id) this.related.push(relP);
                        // 	}
                        // }
                        this.loaded = true;
                    }
                }
                // releated products
                let related: any = [];
                for (let prod of products) {
                    for (let pc of prod.categories) {
                        if (pc == this.category.slug) related.push(prod);
                    }
                }
                this.relatedProducts = related;
                // if (this.product == null) this.router.navigate(['/site/not-found']);
            });
        });
    }
}
