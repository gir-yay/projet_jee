import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCoursComponent } from './documents-cours.component';

describe('DocumentsCoursComponent', () => {
  let component: DocumentsCoursComponent;
  let fixture: ComponentFixture<DocumentsCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
