import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {ItineraryService} from "./itinerary.service";
import {InfoDayComponent} from "./info-day/info-day.component";
import {DayEvents} from "../spectacles/spectacles.component";

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, InfoDayComponent],
  templateUrl: './itinerary.component.html',
})
export class ItineraryComponent {
  itineraryService = inject(ItineraryService);
  itinerary:DayEvents = this.itineraryService.getItinerary();
}
