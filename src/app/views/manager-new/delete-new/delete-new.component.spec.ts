import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNewComponent } from './delete-new.component';

describe('DeleteNewComponent', () => {
  let component: DeleteNewComponent;
  let fixture: ComponentFixture<DeleteNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
