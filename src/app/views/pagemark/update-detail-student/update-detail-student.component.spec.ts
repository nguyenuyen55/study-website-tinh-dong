import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailStudentComponent } from './update-detail-student.component';

describe('UpdateDetailStudentComponent', () => {
  let component: UpdateDetailStudentComponent;
  let fixture: ComponentFixture<UpdateDetailStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
