import {inject, Injectable} from '@angular/core';
import {TripService} from '../routes/trip/trip.service';

type DaySelectItem = { value: string; viewValue: Date };

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  hotelService = inject(TripService);

  checkInDate = this.hotelService.getTripDetail().checkInDate;
  checkOutDate = this.hotelService.getTripDetail().checkOutDate;

  createDateRange(): Date[] {
    let startDate = new Date(this.checkInDate);
    let endDate = new Date(this.checkOutDate);

    const dates = [];
    let currentDate = new Date(startDate);

    let i = 1;

    // Convert startDate and endDate to only date (remove time part)
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      i++;
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
