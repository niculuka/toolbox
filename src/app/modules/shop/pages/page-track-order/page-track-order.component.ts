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
        this.toastr.success("Pentru detalii, va trebui să luați legătura cu curierul.", "Comada dumneavoastră se află în custodia curierului.")
    }
}
