import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss']
})
export class BlockSlideshowComponent {
    @Input() withDepartments = false;

    options = {
        nav: false,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 }
        },
        rtl: this.direction.isRTL()
    };

    slides = [
        {
            title: 'Magazin de <br>BRICOLAJ',
            text: '',
            image_classic: 'assets/images/slides/slide-1.jpg',
            image_full: 'assets/images/slides/slide-1-full.jpg',
            image_mobile: 'assets/images/slides/slide-1-mobile.jpg',
            link: "/shop/catalog"
        },
        {
            title: 'Scule profesionale <br> de găurit și înfiletat',
            text: 'Las noi puteți găsi toată gama de produse <br> pe care și le poate dori un meseriaș',
            image_classic: 'assets/images/slides/slide-2.jpg',
            image_full: 'assets/images/slides/slide-2-full.jpg',
            image_mobile: 'assets/images/slides/slide-2-mobile.jpg',
            link: "/shop/catalog/scule-electrice"
        },
        {
            title: 'Generatoare & Compresoare',
            text: 'Scule De Putere & <br>mașini de lipit, topit sau sudat',
            image_classic: 'assets/images/slides/slide-3.jpg',
            image_full: 'assets/images/slides/slide-3-full.jpg',
            image_mobile: 'assets/images/slides/slide-3-mobile.jpg',
            link: "/shop/catalog/scule-de-putere"
        }
    ];

    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService
    ) { }
}
