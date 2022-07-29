import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSecretComponent } from './add-new-secret.component';

describe('AddNewSecretComponent', () => {
  let component: AddNewSecretComponent;
  let fixture: ComponentFixture<AddNewSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
