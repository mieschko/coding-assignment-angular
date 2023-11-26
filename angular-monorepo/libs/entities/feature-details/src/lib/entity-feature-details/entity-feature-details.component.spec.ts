import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityFeatureDetailsComponent } from './entity-feature-details.component';

describe('EntityFeatureDetailsComponent', () => {
  let component: EntityFeatureDetailsComponent;
  let fixture: ComponentFixture<EntityFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityFeatureDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
