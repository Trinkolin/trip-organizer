import {Component, inject, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {DateRangeService} from '../../daterange.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-days-select',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './days-select.component.html'
})
export class DaysSelectComponent {
  selectedDay = input.required<FormControl>();

  dateRangeService = inject(DateRangeService);

  days = this.dateRangeService.createDaysSelectItems() ?? [];

}
