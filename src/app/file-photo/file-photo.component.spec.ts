import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePhotoComponent } from './file-photo.component';

describe('FilePhotoComponent', () => {
  let component: FilePhotoComponent;
  let fixture: ComponentFixture<FilePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
