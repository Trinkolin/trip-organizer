import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIcon, MatMenu, MatToolbar, MatMenuTrigger, MatMenuItem, MatCard, MatCardContent, MatDivider, MatMiniFabButton, MatFabButton, MatIconButton, MatButton, MatAnchor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
