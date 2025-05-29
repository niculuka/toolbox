import { NgModule } from '@angular/core';
import { Routes, RouterModule, Data, ResolveData } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageWishlistComponent } from './pages/page-wishlist/page-wishlist.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { PageCompareComponent } from './pages/page-compare/page-compare.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { CheckoutGuard } from './guards/checkout.guard';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductsListResolverService } from './resolvers/products-list-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { PageOrderSuccessComponent } from './pages/page-order-success/page-order-success.component';

const categoryPageResolvers: ResolveData = {
    category: CategoryResolverService,
    products: ProductsListResolverService
};

const routes: Routes = [
    {
        path: 'catalog',
        component: PageCategoryComponent,
        // resolve: categoryPageResolvers,
    },
    {
        path: 'catalog/:category',
        component: PageCategoryComponent,
        // resolve: categoryPageResolvers,
    },
    //
    {
        path: 'products/:productSlug',
        component: PageProductComponent,
        data: {
            // Product page layout. Possible values: 'standard', 'columnar', 'sidebar'.
            layout: 'standard',
            // Sidebar position. Possible values: 'start', 'end'.
            // It does not matter if the value of the 'layout' parameter is not 'sidebar'.
            // For LTR scripts "start" is "left" and "end" is "right".
            sidebarPosition: 'start'
        },
        // resolve: {
        //     product: ProductResolverService
        // },
    },
    {
        path: 'cart',
        pathMatch: 'full',
        component: PageCartComponent
    },
    {
        path: 'cart/checkout',
        component: PageCheckoutComponent,
        canActivate: [CheckoutGuard],
    },
    {
        path: 'cart/checkout/success',
        component: PageOrderSuccessComponent,
    },
    {
        path: 'wishlist',
        component: PageWishlistComponent
    },
    {
        path: 'compare',
        component: PageCompareComponent
    },
    {
        path: 'track-order',
        component: PageTrackOrderComponent
    },

    // --- START ---
    // The following routes are only needed to demonstrate possible layouts of some pages. You can delete them.
    {
        path: 'product-standard',
        component: PageProductComponent,
        data: {
            layout: 'standard',
            sidebarPosition: 'start',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-columnar',
        component: PageProductComponent,
        data: {
            layout: 'columnar',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    {
        path: 'product-sidebar',
        component: PageProductComponent,
        data: {
            layout: 'sidebar',
            sidebarPosition: 'start',
            productSlug: 'brandix-screwdriver-screw1500acc',
        },
        resolve: {
            product: ProductResolverService
        },
    },
    // --- END ---
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
