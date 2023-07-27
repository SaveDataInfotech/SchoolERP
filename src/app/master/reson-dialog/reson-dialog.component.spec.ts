import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResonDialogComponent } from './reson-dialog.component';

describe('ResonDialogComponent', () => {
  let component: ResonDialogComponent;
  let fixture: ComponentFixture<ResonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
