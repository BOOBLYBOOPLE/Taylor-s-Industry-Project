import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecruitmentComponent } from './view-recruitment.component';

describe('ViewRecruitmentComponent', () => {
  let component: ViewRecruitmentComponent;
  let fixture: ComponentFixture<ViewRecruitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecruitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
