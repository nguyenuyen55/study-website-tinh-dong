import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassMarkComponent } from './list-class-mark.component';

describe('ListClassMarkComponent', () => {
  let component: ListClassMarkComponent;
  let fixture: ComponentFixture<ListClassMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClassMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClassMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
