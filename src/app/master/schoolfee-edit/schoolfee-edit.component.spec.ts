import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolfeeEditComponent } from './schoolfee-edit.component';

describe('SchoolfeeEditComponent', () => {
  let component: SchoolfeeEditComponent;
  let fixture: ComponentFixture<SchoolfeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolfeeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolfeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
