import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-track-order',
    templateUrl: './page-track-order.component.html',
    styleUrls: ['./page-track-order.component.scss']
})
export class PageTrackOrderComponent {
    constructor(private toastr: ToastrService) { }

    tracking() {
        this.toastr.success("", "Comada dumneavoastră se află în custodia curierului.")
    }
}
