import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLocalComponent } from './file-local.component';

describe('FileLocalComponent', () => {
  let component: FileLocalComponent;
  let fixture: ComponentFixture<FileLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
