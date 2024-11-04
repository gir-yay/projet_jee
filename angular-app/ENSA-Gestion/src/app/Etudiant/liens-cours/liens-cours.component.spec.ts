import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiensCoursComponent } from './liens-cours.component';

describe('LiensCoursComponent', () => {
  let component: LiensCoursComponent;
  let fixture: ComponentFixture<LiensCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiensCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiensCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
