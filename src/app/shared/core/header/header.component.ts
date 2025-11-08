import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-header',
    imports: [RouterModule, CommonModule, MatIcon, MatMenuModule,
        MatCardModule],
    templateUrl: './header.component.html'
})
export class HeaderComponent {



}
