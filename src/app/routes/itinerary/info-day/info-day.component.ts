import {Component, inject, input, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule,} from '@angular/material/table';
import {Experience, ExperienceService,} from '../../../shared/experience.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {DateRangeService} from '../../../shared/daterange.service';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-info-day',
    imports: [
        CommonModule,
        MatTableModule,
        MatCardModule,
        MatIcon,
    ],
    templateUrl: './info-day.component.html'
})
export class InfoDayComponent implements OnInit {
  displayedColumns = [
    'time',
    'title',
    'location',
    'duration',
    'remove',
  ];

  key = input.required<string>();
  list = input.required<Experience[]>();

  dataSource!: MatTableDataSource<Experience>;

  experienceService = inject(ExperienceService);

  dateRangeService = inject(DateRangeService);

  dateRange = this.dateRangeService.createDateRange();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.list());
  }

  getDate() {
    let num: number = Number(this.key().slice(4)) - 1;
    return this.dateRange[num];
  }

  remove(experience: Experience) {
    this.experienceService.remove(experience, this.key(), experience.time);
    this.dataSource.data = this.dataSource.data.filter((s) => s !== experience);
  }
}
