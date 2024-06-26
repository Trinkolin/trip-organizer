import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {MatIcon} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule, MatIcon, MatMenuModule, MatToolbar,
    MatCardModule, MatDivider],
  templateUrl: './header.component.html',
})
export class HeaderComponent {



}
