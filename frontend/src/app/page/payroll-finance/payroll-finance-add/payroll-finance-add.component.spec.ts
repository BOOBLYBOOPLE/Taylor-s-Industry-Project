import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollFinanceAddComponent } from './payroll-finance-add.component';

describe('PayrollFinanceAddComponent', () => {
  let component: PayrollFinanceAddComponent;
  let fixture: ComponentFixture<PayrollFinanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollFinanceAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollFinanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
