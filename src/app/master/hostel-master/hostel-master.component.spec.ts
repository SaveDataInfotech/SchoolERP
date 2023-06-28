import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelMasterComponent } from './hostel-master.component';

describe('HostelMasterComponent', () => {
  let component: HostelMasterComponent;
  let fixture: ComponentFixture<HostelMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostelMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
