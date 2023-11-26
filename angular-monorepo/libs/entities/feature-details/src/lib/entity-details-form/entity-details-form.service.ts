import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  EntityDetailsFormGroup,
  EntityDetailsFormRawValue,
} from './entity-details-form.model';
import { map, Observable, of, switchMap, timer } from 'rxjs';
import { EntityService } from '../../../../data-repository/src/lib/services/entity.service';

@Injectable({
  providedIn: 'root',
})
export class EntityDetailsFormService {
  constructor(
    private fb: NonNullableFormBuilder,
    private entityService: EntityService
  ) {}

  createEntityDetailsForm(
    initValue?: EntityDetailsFormRawValue
  ): EntityDetailsFormGroup {
    return this.fb.group(
      {
        name: this.fb.control<string>(initValue?.name ?? '', {
          validators: [Validators.required],
          asyncValidators: [this.uniqueNameValidator()],
        }),
        trackingId: this.fb.control<string | undefined>(initValue?.trackingId),
        entityType: this.fb.control(initValue?.entityType ?? '', {
          validators: [Validators.required],
        }),
      },
      {
        validators: [this.nameNotEqualTrackingIdValidator()],
      }
    );
  }

  uniqueNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value;

      if (!name) {
        return of(null);
      }

      if (
        (control as FormControl).defaultValue?.toLowerCase() ===
        name?.toLowerCase()
      ) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() => this.checkIfNameIsUnique(name)),
        map((isUnique) => (isUnique ? null : { uniqueNameAsync: true }))
      );
    };
  }

  nameNotEqualTrackingIdValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const nameControl = group.get('name');
      const trackingIdControl = group.get('trackingId');

      if (nameControl && trackingIdControl) {
        const nameValue = nameControl.value?.toLowerCase();
        const trackingIdValue = trackingIdControl.value?.toLowerCase();

        if (nameValue && trackingIdValue && nameValue === trackingIdValue) {
          nameControl.setErrors({ nameEqualsTrackingId: true });
          nameControl.markAsDirty();
          trackingIdControl.setErrors({ nameEqualsTrackingId: true });
          trackingIdControl.markAsDirty();

          return { nameEqualsTrackingId: true };
        }
      }

      return null;
    };
  }

  private checkIfNameIsUnique(name: string): Observable<boolean> {
    return this.entityService
      .getEntityList({ name })
      .pipe(map((entities) => !entities.length));
  }
}
