import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationDashboardComponent } from './location-dashboard/location-dashboard.component';
import { Route, RouterModule } from '@angular/router';

const locationDashboardRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LocationDashboardComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(locationDashboardRoutes)],
  declarations: [LocationDashboardComponent],
})
export class EntitiesFeatureLocationDashboardModule {}
