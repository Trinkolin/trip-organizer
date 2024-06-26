import {inject, Injectable} from '@angular/core';
import spectaclesJson from '../../assets/json/spectacles.json';
import {DataService} from './core/data.service';

export type Experience = {
  time: string[];
  title: string;
  subtitle?: string;
  location: string;
  image_url?: string;
  duration?: number;
};

export const DLP = 'Disneyland Park';
export const WDS = 'Walt Disney Studios';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  dayEvents = inject(DataService).getData('dayEvents') ?? {};

  spectacles = spectaclesJson;

  dataService = inject(DataService);

  getSpectacles() {
    return this.spectacles;
  }

  getExperiencesByLocation(location: string) {
    return this.getSpectacles()
      .filter((experience) => experience.location === location)
      .map((spectacle) => spectacle.title);
  }

  isParkSelected(park: string, selectedPark: string[] | null) {
    if (selectedPark) {
      if (
        selectedPark.length === 2 ||
        (park === DLP && selectedPark.includes(DLP)) ||
        (park === WDS && selectedPark.includes(WDS))
      ) {
        return true;
      }
    }
    return false;
  }

  isSpectacleSelected(
    spectacle: Experience,
    selectedSpectacles: string[] | null
  ) {
    return (selectedSpectacles || []).includes(spectacle.title);
  }

  addExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[]
  ) {
    let modified = false;

    if (experience) {
      if (!this.dayEvents[dayValue]) {
        this.dayEvents[dayValue] = [];
      }

      const eventIndex = this.extracted(dayValue, experience);

      if (eventIndex === -1) {
        const shallowCopy = {...experience};
        shallowCopy.time = timeValue;
        this.dayEvents[dayValue].push(shallowCopy);
        modified = true;
      } else {
        const existingEvent = this.dayEvents[dayValue][eventIndex];
        const timesToAdd = this.getTimesToAdd(existingEvent.time, timeValue);

        if (timesToAdd.length > 0) {
          for (let t of timesToAdd) {
            const shallowCopy = {...experience};
            shallowCopy.time = [t];
            this.dayEvents[dayValue].push(shallowCopy);
          }
          modified = true;
        }
      }

      this.dayEvents[dayValue].sort((a: { time: string[]; }, b: { time: any[]; }) =>
        a.time[0].localeCompare(b.time[0])
      );
    }

    return modified;
  }

  add(
    experience: Experience,
    dayValue: string | null,
    timeValue: string[]
  ) {
    if (dayValue && timeValue.length > 0) {
      let modified = this.addExperience(experience, dayValue, timeValue);
      if (modified) {
        this.dataService.removeItem('dayEvents');
        this.dataService.storeData('dayEvents', this.dayEvents);
      }
    }
  }

  removeExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[]
  ) {
    let modified = false;

    if (experience && this.dayEvents[dayValue]) {
      const eventIndex = this.extracted(dayValue, experience);

      if (eventIndex !== -1) {
        const existingEvent = this.dayEvents[dayValue][eventIndex];
        const remainingTimes = existingEvent.time.filter(
          (time: string) => !timeValue.includes(time)
        );

        if (remainingTimes.length > 0) {
          this.dayEvents[dayValue][eventIndex].time = remainingTimes;
        } else {
          this.dayEvents[dayValue].splice(eventIndex, 1);
        }

        modified = true;
      }

      if (this.dayEvents[dayValue].length === 0) {
        delete this.dayEvents[dayValue];
      }
    }

    return modified;
  }

  remove(experience: Experience, dayValue: string | null, timeValue: string[]) {
    if (dayValue && timeValue.length > 0) {
      let modified = this.removeExperience(experience, dayValue, timeValue);
      if (modified) {
        this.dataService.removeItem('dayEvents');
        this.dataService.storeData('dayEvents', this.dayEvents);
      }
    }
  }

  private extracted(dayValue: string, experience: Experience) {
    return this.dayEvents[dayValue].findIndex(
      (event: { title: string; }) => event.title === experience.title
    );
  }

  private getTimesToAdd(existingTimes: string[], newTimes: string[]) {
    const existingTimesSet = new Set(existingTimes);
    const timesToAdd = newTimes.filter((time) => !existingTimesSet.has(time));
    return timesToAdd.sort((a, b) => a.localeCompare(b));
  }
}
