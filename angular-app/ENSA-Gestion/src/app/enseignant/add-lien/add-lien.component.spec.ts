import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLienComponent } from './add-lien.component';

describe('AddLienComponent', () => {
  let component: AddLienComponent;
  let fixture: ComponentFixture<AddLienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
