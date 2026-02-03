import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsViewComponent } from './forms-view.component';

describe('FormsViewComponent', () => {
  let component: FormsViewComponent;
  let fixture: ComponentFixture<FormsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
