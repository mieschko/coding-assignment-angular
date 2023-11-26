import { TestBed } from '@angular/core/testing';

import { EntityDetailsFormService } from './entity-details-form.service';

describe('EntityDetailsFormService', () => {
  let service: EntityDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityDetailsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
