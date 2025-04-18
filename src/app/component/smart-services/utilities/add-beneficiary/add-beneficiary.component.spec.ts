import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaryComponent } from './add-beneficiary.component';

describe('AddBeneficiaryComponent', () => {
  let component: AddBeneficiaryComponent;
  let fixture: ComponentFixture<AddBeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBeneficiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
