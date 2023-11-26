import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityFeatureListComponent } from './entity-feature-list.component';

describe('EntityFeatureListComponent', () => {
  let component: EntityFeatureListComponent;
  let fixture: ComponentFixture<EntityFeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityFeatureListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
