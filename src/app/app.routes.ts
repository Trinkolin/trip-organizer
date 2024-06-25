import {Routes} from '@angular/router';
import {TripComponent} from './routes/trip/trip.component';
import {ItineraryComponent} from './routes/itinerary/itinerary.component';
import {SpectaclesComponent} from './routes/spectacles/spectacles.component';
import {GeneralInfoComponent} from "./routes/general-info/general-info.component";
import {NewExperienceComponent} from "./routes/new-experience/new-experience.component";

export const routes: Routes = [
  {path: '', component: TripComponent, title: 'Trip info', },
  {path: 'itinerary', component: ItineraryComponent, title: 'Itinerary',},
  {path: 'trip', component: TripComponent, title: 'Trip',},
  {path: 'spectacles', component: SpectaclesComponent, title: 'Spectacles',},
  {path: 'general-info', component: GeneralInfoComponent, title: 'General info',},
  {path: 'new-experience', component: NewExperienceComponent, title: 'Food',},
];

