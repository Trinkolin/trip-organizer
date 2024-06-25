import { DataService } from '../../shared/core/data.service';
import { inject, Injectable } from '@angular/core';

export type TripDetail = {
  name: string;
  checkInDate: Date;
  checkOutDate: Date;
};

@Injectable({
  providedIn: 'root',
})
export class TripService {
  dataService = inject(DataService);

  saveTripDetail(tripDetail: TripDetail) {
    this.dataService.storeData('tripDetail', tripDetail);
  }

  getTripDetail(): TripDetail {
    return this.dataService.getData('tripDetail');
  }

  isFilled(tripDetail: TripDetail | undefined): boolean {
    return tripDetail !== null && tripDetail !== undefined;
  }
}
