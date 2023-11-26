import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityFeatureDetailsComponent } from './entity-feature-details/entity-feature-details.component';
import { Route, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

const entitiesFeatureDetailsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EntityFeatureDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entitiesFeatureDetailsRoutes),
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  declarations: [EntityFeatureDetailsComponent],
})
export class EntitiesFeatureDetailsModule {}
