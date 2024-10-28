import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesDirecteursComponent } from './listes-directeurs.component';

describe('ListesDirecteursComponent', () => {
  let component: ListesDirecteursComponent;
  let fixture: ComponentFixture<ListesDirecteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesDirecteursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesDirecteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
