import {Component, inject, input} from '@angular/core';
import {DLP, Experience, ExperienceService,} from '../../../shared/experience.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {TruncatePipe} from '../../../shared/truncate.pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatChipsModule,} from '@angular/material/chips';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButtonToggleModule,} from '@angular/material/button-toggle';
import {DaysSelectComponent} from '../../../shared/core/days-select/days-select.component';

@Component({
  selector: 'app-spectacle-card',
  standalone: true,
  imports: [
    MatCardModule,
    TruncatePipe,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatIcon,
    ReactiveFormsModule,
    MatButton,
    FormsModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCheckbox,
    DaysSelectComponent,
  ],
  templateUrl: './spectacle-card.component.html',
})
export class SpectacleCardComponent {
  experienceService = inject(ExperienceService);

  spectacle = input.required<Experience>();

  selectedDay = new FormControl('');
  timeCtrl: FormControl = new FormControl('');

  protected readonly DLP = DLP;

  add(experience: Experience) {
    this.experienceService.add(experience, this.selectedDay.value, this.timeCtrl.value);
  }

  remove(experience: Experience) {
    this.experienceService.remove(experience, this.selectedDay.value, this.timeCtrl.value);
  }
}
