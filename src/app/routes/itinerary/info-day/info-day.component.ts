import { Component, inject, input, OnInit } from '@angular/core';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {
  Experience,
  ExperienceService,
} from '../../../shared/experience.service';
import {
  DatePipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DateRangeService } from '../../../shared/daterange.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-day',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    DatePipe,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatColumnDef,
    MatTableModule,
    MatCardModule,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    JsonPipe,
    KeyValuePipe,
    MatIcon,
  ],
  templateUrl: './info-day.component.html',
})
export class InfoDayComponent implements OnInit {
  displayedColumns: string[] = [
    'time',
    'title',
    'image',
    'location',
    'duration',
    'remove',
  ];

  dataSource!: MatTableDataSource<Experience>;

  experienceService = inject(ExperienceService);

  dateRangeService = inject(DateRangeService);

  dateRange = this.dateRangeService.createDateRange();

  key = input.required<string>();
  list = input.required<Experience[]>();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.list());
  }

  getDate() {
    let num: number = Number(this.key().slice(4)) - 1;
    return this.dateRange[num];
  }

  removeSpectacle(spectacle: Experience) {
    let strings = spectacle.time;
    this.experienceService.remove(spectacle, this.key(), strings);
    this.dataSource.data = this.dataSource.data.filter((s) => s !== spectacle);
  }
}
