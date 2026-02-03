import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesCreateComponent } from './leaves-create.component';

describe('LeavesCreateComponent', () => {
  let component: LeavesCreateComponent;
  let fixture: ComponentFixture<LeavesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
