import { Component, inject, input, signal } from '@angular/core';
import {
  DLP,
  Experience,
  ExperienceService,
} from '../../../shared/experience.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { TruncatePipe } from '../../../shared/truncate.pipe';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { DatePipe, NgForOf, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {
  MatChip,
  MatChipGrid,
  MatChipInput,
  MatChipRow,
  MatChipsModule,
} from '@angular/material/chips';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { DaysSelectComponent } from '../../../shared/core/days-select/days-select.component';

interface TimeControls {
  [key: string]: boolean; // Index signature to allow any string key with boolean values
}

@Component({
  selector: 'app-spectacle-card',
  standalone: true,
  imports: [
    MatCardSubtitle,
    MatCardContent,
    MatCardTitle,
    TruncatePipe,
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatFormField,
    MatSelect,
    MatOption,
    DatePipe,
    MatIcon,
    ReactiveFormsModule,
    MatButton,
    MatChipGrid,
    MatChipRow,
    FormsModule,
    MatChipInput,
    NgForOf,
    MatLabel,
    MatChip,
    MatChipsModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgOptimizedImage,
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
    const dayValue = this.selectedDay.value;
    const timeValue = this.timeCtrl.value;

    this.experienceService.add(experience, dayValue, timeValue);
  }

  remove(experience: Experience) {
    const dayValue = this.selectedDay.value;
    const timeValue = this.timeCtrl.value;

    this.experienceService.remove(experience, dayValue, timeValue);
  }
}
