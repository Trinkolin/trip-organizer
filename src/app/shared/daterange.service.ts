import {inject, Injectable} from '@angular/core';
import {TripService} from '../routes/trip/trip.service';

export type DaySelectItem = { value: string; viewValue: Date };

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  hotelService = inject(TripService);

  checkInDate?: Date;
  checkOutDate?: Date;

  createDateRange(): Date[] {
    let dates: Date[] = [];

    const tripDetail = this.hotelService.getTripDetail();
    if (!tripDetail) {
      return dates;
    }

    this.checkInDate = tripDetail.checkInDate;
    this.checkOutDate = tripDetail.checkOutDate;

    if (!this.checkInDate || !this.checkOutDate) {
      return dates;
    }

    let startDate = new Date(this.checkInDate);
    let endDate = new Date(this.checkOutDate);

    let currentDate = new Date(startDate);

    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  createDaysSelectItems(): DaySelectItem[] {
    const dateRange = this.createDateRange();

    return dateRange.map((date, index) => ({
      value: 'day-' + (index + 1),
      viewValue: date,
    }));
  }
}
