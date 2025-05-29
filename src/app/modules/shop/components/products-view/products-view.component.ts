import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { RootService } from 'src/app/shared/services/root.service';

export type Layout = 'grid' | 'features' | 'list';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnChanges {
    @Input() products: Product[] = [];
    @Input() layout: Layout = 'list';
    @Input() columns = 3;
    @Input() currentUrl: string = '';
    @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
    @Input() sort = 'default';
    @Input() limit = 8;
    @Input() offcanvas: 'always' | 'mobile' = 'mobile';

    @Input() totalCount = 0;

    constructor(
        public sidebar: ShopSidebarService,
        public pageService: PageCategoryService,
        private router: Router,
        public root: RootService,
    ) { }

    ngOnChanges(): void {}

    ngOnDestroy(): void {
    }

    changeSort(event: any) {
        this.sort = event.currentTarget.value;
        if (this.sort === 'default') {
            this.router.navigate([], { queryParams: { sort: null }, queryParamsHandling: 'merge' });
        }
        else {
            this.router.navigate([], { queryParams: { sort: this.sort }, queryParamsHandling: 'merge' });
        }
    }

    changeLimit(event: any) {
        this.limit = event.currentTarget.value;
        if (this.limit == 8) {
            this.router.navigate([], { queryParams: { page: null, limit: null }, queryParamsHandling: 'merge' });
        }
        else {
            this.router.navigate([], { queryParams: { page: null, limit: this.limit }, queryParamsHandling: 'merge' });
        }
    }

    resetFilters(): void {
        // this.pageService.updateOptions({ filterValues: {} });
    }
}
