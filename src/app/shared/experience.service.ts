import { inject, Injectable } from '@angular/core';
import spectaclesJson from '../../assets/json/spectacles.json';
import { DataService } from './core/data.service';

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

type DayEvents = Record<string, Experience[]>;

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly STORAGE_KEY = 'dayEvents';
  
  dayEvents: DayEvents = inject(DataService).getData(this.STORAGE_KEY) ?? {};
  spectacles = spectaclesJson;
  
  private dataService = inject(DataService);

  getSpectacles(): Experience[] {
    return this.spectacles;
  }

  getExperiencesByLocation(location: string): string[] {
    return this.getSpectacles()
      .filter((experience) => experience.location === location)
      .map((spectacle) => spectacle.title);
  }

  isParkSelected(park: string, selectedPark: string[] | null): boolean {
    return selectedPark?.length === 2 || selectedPark?.includes(park) || false;
  }

  isSpectacleSelected(
    spectacle: Experience,
    selectedSpectacles: string[] | null
  ): boolean {
    return (selectedSpectacles || []).includes(spectacle.title);
  }

  add(
    experience: Experience,
    dayValue: string | null,
    timeValue: string[]
  ): void {
    if (!this.isValidInput(dayValue, timeValue)) {
      return;
    }

    const modified = this.addExperience(experience, dayValue!, timeValue);
    this.persistChanges(modified);
  }

  remove(
    experience: Experience,
    dayValue: string | null,
    timeValue: string[]
  ): void {
    if (!this.isValidInput(dayValue, timeValue)) {
      return;
    }

    const modified = this.removeExperience(experience, dayValue!, timeValue);
    this.persistChanges(modified);
  }

  private addExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[]
  ): boolean {
    if (!experience) {
      return false;
    }

    this.ensureDayExists(dayValue);

    const eventIndex = this.findEventIndex(dayValue, experience);

    if (eventIndex === -1) {
      return this.addNewExperience(experience, dayValue, timeValue);
    }

    return this.addTimesToExistingExperience(
      experience,
      dayValue,
      timeValue,
      eventIndex
    );
  }

  private addNewExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[]
  ): boolean {
    const newExperience = this.createExperienceWithTime(experience, timeValue);
    this.dayEvents[dayValue].push(newExperience);
    this.sortEventsByTime(this.dayEvents[dayValue]);
    return true;
  }

  private addTimesToExistingExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[],
    eventIndex: number
  ): boolean {
    const existingEvent = this.dayEvents[dayValue][eventIndex];
    const timesToAdd = this.getTimesToAdd(existingEvent.time, timeValue);

    if (timesToAdd.length === 0) {
      return false;
    }

    timesToAdd.forEach((time) => {
      const newExperience = this.createExperienceWithTime(experience, [time]);
      this.dayEvents[dayValue].push(newExperience);
    });

    this.sortEventsByTime(this.dayEvents[dayValue]);
    return true;
  }

  private removeExperience(
    experience: Experience,
    dayValue: string,
    timeValue: string[]
  ): boolean {
    if (!experience || !this.dayEvents[dayValue]) {
      return false;
    }

    const eventIndex = this.findEventIndex(dayValue, experience);

    if (eventIndex === -1) {
      return false;
    }

    this.removeTimesFromEvent(dayValue, eventIndex, timeValue);
    this.cleanupEmptyDay(dayValue);

    return true;
  }

  private removeTimesFromEvent(
    dayValue: string,
    eventIndex: number,
    timeValue: string[]
  ): void {
    const existingEvent = this.dayEvents[dayValue][eventIndex];
    const remainingTimes = existingEvent.time.filter(
      (time) => !timeValue.includes(time)
    );

    if (remainingTimes.length > 0) {
      this.dayEvents[dayValue][eventIndex].time = remainingTimes;
    } else {
      this.dayEvents[dayValue].splice(eventIndex, 1);
    }
  }

  private cleanupEmptyDay(dayValue: string): void {
    if (this.dayEvents[dayValue].length === 0) {
      delete this.dayEvents[dayValue];
    }
  }

  private findEventIndex(dayValue: string, experience: Experience): number {
    return this.dayEvents[dayValue].findIndex(
      (event) => event.title === experience.title
    );
  }

  private getTimesToAdd(
    existingTimes: string[],
    newTimes: string[]
  ): string[] {
    const existingTimesSet = new Set(existingTimes);
    const timesToAdd = newTimes.filter((time) => !existingTimesSet.has(time));
    return timesToAdd.sort((a, b) => a.localeCompare(b));
  }

  private createExperienceWithTime(
    experience: Experience,
    time: string[]
  ): Experience {
    return { ...experience, time };
  }

  private sortEventsByTime(events: Experience[]): void {
    events.sort((a, b) => a.time[0].localeCompare(b.time[0]));
  }

  private ensureDayExists(dayValue: string): void {
    if (!this.dayEvents[dayValue]) {
      this.dayEvents[dayValue] = [];
    }
  }

  private isValidInput(
    dayValue: string | null,
    timeValue: string[]
  ): boolean {
    return dayValue !== null && timeValue.length > 0;
  }

  private persistChanges(modified: boolean): void {
    if (modified) {
      this.dataService.removeItem(this.STORAGE_KEY);
      this.dataService.storeData(this.STORAGE_KEY, this.dayEvents);
    }
  }
}