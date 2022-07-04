import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkStudentComponent } from './update-mark-student.component';

describe('UpdateMarkStudentComponent', () => {
  let component: UpdateMarkStudentComponent;
  let fixture: ComponentFixture<UpdateMarkStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarkStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
