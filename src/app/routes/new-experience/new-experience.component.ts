import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExperienceService} from "../../shared/experience.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";

import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {DayEvents} from "../spectacles/spectacles.component";
import {DataService} from "../../shared/core/data.service";
import {DaysSelectComponent} from "../../shared/core/days-select/days-select.component";

@Component({
    selector: 'app-new-experience',
    imports: [
    ReactiveFormsModule,
    MatCard,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DaysSelectComponent,
    FormsModule
],
    templateUrl: './new-experience.component.html'
})
export class NewExperienceComponent {

  dayEvents: DayEvents = inject(DataService).getData('dayEvents') ?? {};

  experienceForm: FormGroup;

  experienceService = inject(ExperienceService);

  selectedDay = new FormControl('');

  constructor(private fb: FormBuilder) {
    this.experienceForm = this.fb.group({
      time: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      location: ['', Validators.required],
      image_url: [''],
      duration: [0]
    });
  }

  onSubmit() {
    if (this.experienceForm.valid && this.selectedDay.value) {
      const {time, title, subtitle, location, image_url, duration} = this.experienceForm.value;

      let newExperience = {
        time: [time],
        title,
        subtitle,
        location,
        image_url,
        duration: duration ? Number(duration) : 0
      };

      this.experienceService.add(newExperience, this.selectedDay.value, [time]);
    }
  }


}
