import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-general-info',
    imports: [MatListModule, MatCardModule],
    templateUrl: './general-info.component.html'
})
export class GeneralInfoComponent {
}
