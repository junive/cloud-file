import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerFileComponent } from './explorer.component';

describe('FileExplorerComponent', () => {
  let component: ExplorerFileComponent;
  let fixture: ComponentFixture<ExplorerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplorerFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
