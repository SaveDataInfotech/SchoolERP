import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCategoryComponent } from './staff-category.component';

describe('StaffCategoryComponent', () => {
  let component: StaffCategoryComponent;
  let fixture: ComponentFixture<StaffCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
