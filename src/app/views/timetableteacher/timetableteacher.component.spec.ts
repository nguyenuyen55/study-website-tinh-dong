import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableteacherComponent } from './timetableteacher.component';

describe('TimetableteacherComponent', () => {
  let component: TimetableteacherComponent;
  let fixture: ComponentFixture<TimetableteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableteacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
