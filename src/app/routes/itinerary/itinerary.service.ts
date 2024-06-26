import {inject, Injectable} from '@angular/core';
import {DataService} from "../../shared/core/data.service";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  dataService = inject(DataService);

  getItinerary() {
    return this.dataService.getData('dayEvents');
  }
}
