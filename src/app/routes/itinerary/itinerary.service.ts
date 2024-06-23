import {inject, Injectable} from '@angular/core';
import {DataService} from "../../shared/core/data.service";
import {DayEvents} from "../spectacles/spectacles.component";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  dataService = inject(DataService);

  getItinerary(): DayEvents {
    return this.dataService.getData('dayEvents');
  }
}
