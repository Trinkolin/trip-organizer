import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./shared/core/header/header.component";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterModule, HeaderComponent]
})
export class AppComponent {
  title = 'trip-organizer';
}
