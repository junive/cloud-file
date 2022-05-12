import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingDialogComponent } from './selecting.component';

describe('DialogSelectComponent', () => {
  let component: SelectingDialogComponent;
  let fixture: ComponentFixture<SelectingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
