import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCourComponent } from './documents-cour.component';

describe('DocumentsCourComponent', () => {
  let component: DocumentsCourComponent;
  let fixture: ComponentFixture<DocumentsCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsCourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
