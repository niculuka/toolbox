import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Panou De Control', url: './dashboard'},
        {label: 'Editare Profil', url: './profile'},
        {label: 'Istoric Comenzi', url: './orders'},
        {label: 'Detalii Comandă', url: './orders/5'},
        {label: 'Adrese', url: './addresses'},
        {label: 'Editare Adrese', url: './addresses/5'},
        {label: 'Parolă', url: './password'},
        {label: 'Ieșire', url: './login'}
    ];

    constructor() { }
}
