import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordWindowComponent } from './forgot-password-window.component';

describe('ForgotPasswordWindowComponent', () => {
  let component: ForgotPasswordWindowComponent;
  let fixture: ComponentFixture<ForgotPasswordWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
