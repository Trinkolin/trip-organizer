import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, JsonPipe, KeyValuePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { ItineraryService } from "./itinerary.service";
import { InfoDayComponent } from "./info-day/info-day.component";
import { DayEvents } from "../spectacles/spectacles.component";

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [DatePipe, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatTable, MatColumnDef, MatTableModule,
    MatCardModule, NgForOf, NgOptimizedImage, NgIf, InfoDayComponent, JsonPipe, KeyValuePipe,],
  templateUrl: './itinerary.component.html',
})
export class ItineraryComponent implements OnInit {
  itineraryService = inject(ItineraryService);
  itinerary: DayEvents | undefined;

  ngOnInit() {
    this.itinerary = this.itineraryService.getItinerary();
  }

}
