import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLessionComponent } from './detail-lession.component';

describe('DetailLessionComponent', () => {
  let component: DetailLessionComponent;
  let fixture: ComponentFixture<DetailLessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
