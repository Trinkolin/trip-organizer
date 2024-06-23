import {Component, input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardContent
  ],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.css'
})
export class TripDetailComponent {
  nameValue = input.required<String>();
  beginDateValue = input.required<Date>();
  endDateValue = input.required<Date>();
}
