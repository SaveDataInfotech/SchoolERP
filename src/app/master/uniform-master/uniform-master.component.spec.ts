import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformMasterComponent } from './uniform-master.component';

describe('UniformMasterComponent', () => {
  let component: UniformMasterComponent;
  let fixture: ComponentFixture<UniformMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
