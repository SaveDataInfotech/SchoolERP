import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkRankComponent } from './update-mark-rank.component';

describe('UpdateMarkRankComponent', () => {
  let component: UpdateMarkRankComponent;
  let fixture: ComponentFixture<UpdateMarkRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMarkRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
