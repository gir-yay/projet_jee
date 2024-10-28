import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLienCoursComponent } from './add-lien-cours.component';

describe('AddLienCoursComponent', () => {
  let component: AddLienCoursComponent;
  let fixture: ComponentFixture<AddLienCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLienCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLienCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
