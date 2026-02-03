import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollFinanceComponent } from './payroll-finance.component';

describe('PayrollFinanceComponent', () => {
  let component: PayrollFinanceComponent;
  let fixture: ComponentFixture<PayrollFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollFinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
