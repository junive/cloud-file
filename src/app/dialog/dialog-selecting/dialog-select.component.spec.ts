import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectingComponent } from './dialog-selecting.component';

describe('DialogSelectComponent', () => {
  let component: DialogSelectingComponent;
  let fixture: ComponentFixture<DialogSelectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
