import {Component} from '@angular/core';
import {MatList, MatListItem} from "@angular/material/list";

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    MatList,
    MatListItem
  ],
  templateUrl: './general-info.component.html',
})
export class GeneralInfoComponent {

}
