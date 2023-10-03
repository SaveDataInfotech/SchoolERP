import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookMasterComponent } from './library-book-master.component';

describe('LibraryBookMasterComponent', () => {
  let component: LibraryBookMasterComponent;
  let fixture: ComponentFixture<LibraryBookMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBookMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBookMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
