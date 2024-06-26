import {Component, inject} from '@angular/core';
import {TripService} from './trip.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {TripDetailComponent} from './trip-detail/trip-detail.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TripDetailComponent,
    MatCardModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './trip.component.html',
  styleUrl: 'trip.component.css',
})
export class TripComponent {
  tripService = inject(TripService);
  tripDetail = this.tripService.getTripDetail();

  formFilled = this.tripService.isFilled(this.tripDetail);

  periodFormGroup;
  hotelFormGroup;

  hotels = ['Sequoia Lodge'];

  constructor(private _formBuilder: FormBuilder) {
    this.periodFormGroup = this._formBuilder.group({
      beginDateCtrl: [
        this.tripDetail?.checkInDate ?? new Date(),
        Validators.required,
      ],
      endDateCtrl: [
        this.tripDetail?.checkOutDate ?? new Date(),
        Validators.required,
      ],
    });

    this.hotelFormGroup = this._formBuilder.group({
      nameCtrl: [this.tripDetail?.name, Validators.required],
    });
  }

  get beginDateValue() {
    return this.periodFormGroup?.get('beginDateCtrl')?.value!;
  }

  get endDateValue() {
    return this.periodFormGroup?.get('endDateCtrl')?.value!;
  }

  get nameValue() {
    return this.hotelFormGroup?.get('nameCtrl')?.value!;
  }

  validateTrip() {
    if (this.nameValue && this.beginDateValue && this.endDateValue) {
      this.tripDetail = {
        name: this.nameValue,
        checkInDate: this.beginDateValue,
        checkOutDate: this.endDateValue,
      };
      this.tripService.saveTripDetail(this.tripDetail);
      this.formFilled = true;
    } else {
      this.formFilled = false;
    }
  }

  modifyTrip() {
    this.formFilled = false;
  }
}
