import { FormControl, FormGroup } from '@angular/forms';

interface EntityDetailsForm {
  name: FormControl<string>;
  trackingId: FormControl<string | undefined>;
  entityType: FormControl<string>;
}

export type EntityDetailsFormGroup = FormGroup<EntityDetailsForm>;

export type EntityDetailsFormRawValue = ReturnType<
  EntityDetailsFormGroup['getRawValue']
>;
