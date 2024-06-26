import {inject, Pipe, PipeTransform} from '@angular/core';
import {ExperienceService} from "./experience.service";

@Pipe({
  name: 'selectedPark',
  standalone: true
})
export class SelectedParkPipe implements PipeTransform {
  spectaclesService = inject(ExperienceService)

  transform(selectedParks: string[] | null, park: string) {
    return this.spectaclesService.isParkSelected(park, selectedParks ?? []);
  }

}
