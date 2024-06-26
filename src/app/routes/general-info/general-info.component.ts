import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './general-info.component.html',
})
export class GeneralInfoComponent {
}
