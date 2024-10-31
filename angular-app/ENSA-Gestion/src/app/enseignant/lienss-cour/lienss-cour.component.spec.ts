import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienssCourComponent } from './lienss-cour.component';

describe('LienssCourComponent', () => {
  let component: LienssCourComponent;
  let fixture: ComponentFixture<LienssCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienssCourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LienssCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
