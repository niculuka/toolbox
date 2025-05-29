import { Component } from '@angular/core';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../shared/services/cart.service';
import { RootService } from '../../../../shared/services/root.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-wishlist',
    templateUrl: './page-wishlist.component.html',
    styleUrls: ['./page-wishlist.component.scss']
})
export class PageWishlistComponent {
    constructor(
        public root: RootService,
        public wishlist: WishlistService,
        public cart: CartService,
        private toastr: ToastrService
    ) { }

    addedToCartProducts: Product[] = [];
    removedProducts: Product[] = [];

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

    remove(product: Product): void {
        if (this.removedProducts.includes(product)) {
            return;
        }

        this.removedProducts.push(product);
        this.wishlist.remove(product).subscribe({
            complete: () => {
                this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }
}
