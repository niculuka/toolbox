import {
    Component,
    ElementRef, EventEmitter,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit, Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Product } from '../../interfaces/product';
import { RootService } from '../../services/root.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { fromEvent, of, Subject, asyncScheduler } from 'rxjs';
import { ShopService } from '../../api/shop.service';
import { Category } from '../../interfaces/category';
import { DOCUMENT } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export type SearchLocation = 'header' | 'indicator' | 'mobile-header';

export type CategoryWithDepth = Category & { depth: number };

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    exportAs: 'search',
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    form!: FormGroup;

    hasSuggestions = false;

    categories: CategoryWithDepth[] = [];

    suggestedProducts: Product[] = [];

    addedToCartProducts: Product[] = [];

    @Input() location: SearchLocation = 'header';

    @Output() escape: EventEmitter<void> = new EventEmitter<void>();

    @Output() closeButtonClick: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.search') classSearch = true;

    @HostBinding('class.search--location--header') get classSearchLocationHeader(): boolean { return this.location === 'header'; }

    @HostBinding('class.search--location--indicator') get classSearchLocationIndicator(): boolean { return this.location === 'indicator'; }

    @HostBinding('class.search--location--mobile-header') get classSearchLocationMobileHeader(): boolean { return this.location === 'mobile-header'; }

    @HostBinding('class.search--has-suggestions') get classSearchHasSuggestions(): boolean { return this.hasSuggestions; }

    @HostBinding('class.search--suggestions-open') classSearchSuggestionsOpen = false;

    @ViewChild('input') inputElementRef!: ElementRef;

    get element(): HTMLElement { return this.elementRef.nativeElement; }

    get inputElement(): HTMLElement { return this.inputElementRef.nativeElement; }

    //
    products = [];

    private sub0: any;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private fb: FormBuilder,
        private elementRef: ElementRef,
        private zone: NgZone,
        private shop: ShopService,
        private cart: CartService,
        public root: RootService,
        public router: Router,
        private productService: ProductService,
        public toastr: ToastrService
    ) {
        this.sub0 = this.productService.fetchProducts().subscribe(result => {
            if (result.products.length) this.products = result.products;
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['location'] && this.location === 'header') {
            this.shop.getCategories(null, 1).pipe(
                takeUntil(this.destroy$),
            ).subscribe(categories => this.categories = this.getCategoriesWithDepth(categories));
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            category: ['all'],
            query: [''],
        });

        this.form.get('query')?.valueChanges.pipe(
            throttleTime(250, asyncScheduler, { leading: true, trailing: true }),
            map(query => query.trim()),
            switchMap(query => {
                if (query) {
                    const categorySlug = this.form.value.category !== 'all' ? this.form.value.category : null;
                    let foundProducts = this.products.filter((prod: any) =>
                        prod.name
                            .replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
                            .replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
                            .replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
                            .replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
                            .toLowerCase()
                            .includes(query
                                .replace(/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g, "a")
                                .replace(/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g, "i")
                                .replace(/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g, "s")
                                .replace(/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g, "t")
                                .toLowerCase()
                            ));
                    if (categorySlug) {
                        this.suggestedProducts = foundProducts.filter((found: any) =>
                            found.categories[0] == categorySlug || found.categories[1] == categorySlug
                        );
                    }
                    else this.suggestedProducts = foundProducts;
                    // return this.shop.getSuggestions(query, 5, categorySlug);
                }
                else this.suggestedProducts = [];
                //
                if (this.suggestedProducts.length > 0) this.hasSuggestions = true;
                else this.hasSuggestions = false;
                //
                return of([]);
            }),
            takeUntil(this.destroy$),
        ).subscribe(
            //     products => {
            //     this.hasSuggestions = products.length > 0;

            //     if (products.length > 0) {
            //         this.suggestedProducts = products;
            //     }
            // }
        );

        this.zone.runOutsideAngular(() => {
            fromEvent(this.document, 'click').pipe(
                takeUntil(this.destroy$),
            ).subscribe(event => {
                const activeElement = this.document.activeElement;

                // If the inner element still has focus, ignore the click.
                if (activeElement && activeElement.closest('.search') === this.element) {
                    return;
                }

                // Close suggestion if click performed outside of component.
                if (event.target instanceof HTMLElement && this.element !== event.target.closest('.search')) {
                    this.zone.run(() => this.closeSuggestion());
                }
            });

            fromEvent(this.element, 'focusout').pipe(
                debounceTime(10),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if (this.document.activeElement === this.document.body) {
                    return;
                }

                // Close suggestions if the focus received an external element.
                if (this.document.activeElement && this.document.activeElement.closest('.search') !== this.element) {
                    this.zone.run(() => this.closeSuggestion());
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openSuggestion(): void {
        this.classSearchSuggestionsOpen = true;
    }

    closeSuggestion(): void {
        this.classSearchSuggestionsOpen = false;
    }

    getCategoryName(category: CategoryWithDepth): string {
        return '&nbsp;'.repeat(category.depth * 4) + category.name;
    }

    addToCart(product: Product): void {
        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        if (product.availability == "out-of-stock") {
            this.toastr.error("Nu există stoc pentru acest produs!");
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }

    private getCategoriesWithDepth(categories: Category[], depth = 0): CategoryWithDepth[] {
        return categories.reduce<CategoryWithDepth[]>((acc, category) => [
            ...acc,
            { ...category, depth },
            ...this.getCategoriesWithDepth(category.children || [], depth + 1),
        ], []);
    }

    // ============================================================================= S U B M I T
    submitSearchForm(e: Event) {
        e.preventDefault();
        let categ: string | null = null;
        if (this.form.value.category != 'all') categ = this.form.value.category;

        let searchT: string | null = null;
        if (this.form.value.query.length) searchT = this.form.value.query;
        if (searchT) {
            this.closeSuggestion();
            this.router.navigate(
                ['/shop/catalog' + (categ ? '/' + categ : '')],
                { queryParams: { search: searchT ? searchT : null } }
            );
        }


    }
}
