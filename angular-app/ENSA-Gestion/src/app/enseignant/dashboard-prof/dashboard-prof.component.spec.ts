import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProfComponent } from './dashboard-prof.component';

describe('DashboardProfComponent', () => {
  let component: DashboardProfComponent;
  let fixture: ComponentFixture<DashboardProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
