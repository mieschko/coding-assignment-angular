import { Component } from '@angular/core';
import {
  EntityListItem,
  EntityType,
} from '../../../../data-repository/src/lib/model/model';
import { Router } from '@angular/router';
import { EntityDetailsFormService } from '../entity-details-form/entity-details-form.service';
import { EntityDetailsFormGroup } from '../entity-details-form/entity-details-form.model';
import { EntityService } from '../../../../data-repository/src/lib/services/entity.service';
import { catchError, EMPTY, firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'angular-monorepo-entity-feature-details',
  templateUrl: './entity-feature-details.component.html',
  styleUrls: ['./entity-feature-details.component.scss'],
})
export class EntityFeatureDetailsComponent {
  entity?: EntityListItem;

  entityDetailsForm!: EntityDetailsFormGroup;

  entityTypes$!: Observable<EntityType[]>;

  constructor(
    private router: Router,
    private entityService: EntityService,
    private entityDetailsFormService: EntityDetailsFormService
  ) {
    this.entity = this.router.getCurrentNavigation()?.extras.state?.[
      'entity'
    ] as EntityListItem;

    if (!this.entity) {
      // todo: add some toast message
      this.goToList();
      return;
    }

    const { name, trackingId, entityType } = this.entity;

    this.entityDetailsForm =
      this.entityDetailsFormService.createEntityDetailsForm({
        name,
        trackingId,
        entityType: entityType ?? '',
      });

    this.entityDetailsForm.disable({ emitEvent: false });

    this.entityTypes$ = this.entityService.getEntityTypes().pipe(
      catchError((error) => {
        console.log('error', error);
        // todo: handle error
        return EMPTY;
      })
    );
  }

  onEditClick(): void {
    this.entityDetailsForm.enable({ emitEvent: false });
  }

  async onSaveClick(): Promise<void> {
    if (!this.entityDetailsForm.valid) {
      return;
    }

    const { name, trackingId, entityType } =
      this.entityDetailsForm.getRawValue();

    await firstValueFrom(
      this.entityService.updateEntity(
        {
          name,
          trackingId,
          entityType,
        },
        this.entity!.entityId
      )
    ).catch((error) => {
      console.error(error);
      // todo: handle error
      this.goToList();
    });

    this.entityDetailsForm.disable();
  }

  onCancelClick(): void {
    this.entityDetailsForm.disable();
    this.entityDetailsForm.reset();
  }

  goToList(): void {
    this.router.navigateByUrl('/entity/list').catch();
  }
}
