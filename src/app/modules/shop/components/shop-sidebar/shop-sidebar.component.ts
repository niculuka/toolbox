import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { isPlatformBrowser } from '@angular/common';
import { ShopService } from '../../../../shared/api/shop.service';

@Component({
    selector: 'app-shop-sidebar',
    templateUrl: './shop-sidebar.component.html',
    styleUrls: ['./shop-sidebar.component.sass']
})
export class ShopSidebarComponent implements OnChanges, OnInit, OnDestroy {
    @Input() products: Product[] = [];
    @Input() params = {};
    @Input() qp = {};
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Product[]>;
    isOpen = false;

    bestSell: any = [];

    constructor(
        private shop: ShopService,
        public sidebar: ShopSidebarService,
        @Inject(PLATFORM_ID)
        private platformId: any
    ) { }

    ngOnChanges(): void {
        this.bestSell = this.products.slice(0, 5);
        // console.log(this.products)
    }

    ngOnInit(): void {
        this.bestsellers$ = this.shop.getBestsellers().pipe(map(x => x.slice(0, 5)));

        this.sidebar.isOpen$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(isOpen => {
            if (isOpen) {
                this.open();
            } else {
                this.close();
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            fromMatchMedia('(max-width: 991px)').pipe(takeUntil(this.destroy$)).subscribe(media => {
                if (this.offcanvas === 'mobile' && this.isOpen && !media.matches) {
                    this.close();
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.close();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private open(): void {
        if (isPlatformBrowser(this.platformId)) {
            const bodyWidth = document.body.offsetWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';
        }

        this.isOpen = true;
    }

    private close(): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        this.isOpen = false;
    }
}
