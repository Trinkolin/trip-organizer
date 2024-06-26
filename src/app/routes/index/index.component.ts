import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatButton
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {

}
