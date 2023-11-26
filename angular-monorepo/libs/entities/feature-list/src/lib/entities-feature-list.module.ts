import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EntityFeatureListComponent } from './feature-list/entity-feature-list.component';
import { TableModule } from 'primeng/table';

const entitiesFeatureListRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EntityFeatureListComponent,
  },
];

@NgModule({
  declarations: [EntityFeatureListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(entitiesFeatureListRoutes),
    TableModule,
  ],
})
export class EntitiesFeatureListModule {}
