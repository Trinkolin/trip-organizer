import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { DateRangeService } from '../../daterange.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-days-select',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    DatePipe,
    MatLabel,
  ],
  templateUrl: './days-select.component.html',
})
export class DaysSelectComponent {
  selectedDay = input.required<FormControl>();

  dateRangeService = inject(DateRangeService);

  days: any[];

  constructor() {
    this.days = this.dateRangeService.createDaysSelectItems() ?? [];
  }
}
