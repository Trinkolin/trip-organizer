import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./shared/core/footer/footer.component";
import {HeaderComponent} from "./shared/core/header/header.component";
import {CommonModule} from '@angular/common';
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatDivider, MatIcon],
})
export class AppComponent {
  title = 'trip-organizer';
}
