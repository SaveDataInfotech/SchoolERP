import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionPreviewComponent } from './concession-preview.component';

describe('ConcessionPreviewComponent', () => {
  let component: ConcessionPreviewComponent;
  let fixture: ComponentFixture<ConcessionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcessionPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcessionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
