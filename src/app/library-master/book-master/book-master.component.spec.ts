import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMasterComponent } from './book-master.component';

describe('BookMasterComponent', () => {
  let component: BookMasterComponent;
  let fixture: ComponentFixture<BookMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
