import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-index',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatButton
    ],
    templateUrl: './index.component.html'
})
export class IndexComponent {

}
