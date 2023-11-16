import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFeesDialogComponentComponent } from './preview-fees-dialog-component.component';

describe('PreviewFeesDialogComponentComponent', () => {
  let component: PreviewFeesDialogComponentComponent;
  let fixture: ComponentFixture<PreviewFeesDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewFeesDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewFeesDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
