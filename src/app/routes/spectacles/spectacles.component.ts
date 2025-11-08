import {Component, inject} from '@angular/core';
import {DLP, Experience, ExperienceService, WDS,} from '../../shared/experience.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule} from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

import {SpectacleCardComponent} from './spectacle-card/spectacle-card.component';
import {SelectedParkPipe} from '../../shared/selected-park.pipe';

export type DayEvents = { [key: string]: Experience[] };

@Component({
    selector: 'app-spectacles',
    imports: [
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatProgressBarModule,
        MatGridListModule,
        MatButtonToggleModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatChipsModule,
        SpectacleCardComponent,
        SelectedParkPipe,
    ],
    templateUrl: './spectacles.component.html'
})
export class SpectaclesComponent {
  experienceService = inject(ExperienceService);

  selectedParcs = [DLP, WDS];

  spectacles = this.experienceService.getSpectacles();

  spectaclesWDS = this.experienceService.getExperiencesByLocation(WDS);
  spectaclesWDSCtrl = new FormControl<string[]>(this.spectaclesWDS);

  spectaclesDLP = this.experienceService.getExperiencesByLocation(DLP);
  spectaclesDLPCtrl = new FormControl<string[]>(this.spectaclesDLP);

  selectedParksCtrl = new FormControl<string[]>([DLP, WDS]);

  protected readonly DLP = DLP;
  protected readonly WDS = WDS;
}
