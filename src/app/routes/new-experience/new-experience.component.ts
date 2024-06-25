import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Experience, ExperienceService } from "../../shared/experience.service";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatCard } from "@angular/material/card";
import { AsyncPipe, DatePipe, JsonPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { DayEvents } from "../spectacles/spectacles.component";
import { DataService } from "../../shared/core/data.service";
import { DaysSelectComponent } from "../../shared/core/days-select/days-select.component";

@Component({
  selector: 'app-new-experience',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatCard,
    NgIf,
    NgOptimizedImage,
    MatButton,
    MatInput, MatLabel, MatSelect, MatOption, MatIcon, DatePipe, DaysSelectComponent, MatError, AsyncPipe, JsonPipe
  ],
  templateUrl: './new-experience.component.html',
})
export class NewExperienceComponent {

  dayEvents: DayEvents = inject(DataService).getData('dayEvents') ?? {};

  experienceForm: FormGroup;
  experience: Experience | undefined;

  dataService = inject(DataService);
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
      const { time, title, subtitle, location, image_url, duration } = this.experienceForm.value;

      let newExperience = {
        time: [time],
        title,
        subtitle,
        location,
        image_url,
        duration: duration ? Number(duration) : 0 // Ensure duration is a number
      };

      this.experienceService.add(newExperience, this.selectedDay.value, [time]);
    }
  }


}
