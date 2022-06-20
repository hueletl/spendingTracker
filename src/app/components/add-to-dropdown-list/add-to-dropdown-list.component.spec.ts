import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToDropdownListComponent } from './add-to-dropdown-list.component';

describe('AddToDropdownListComponent', () => {
  let component: AddToDropdownListComponent;
  let fixture: ComponentFixture<AddToDropdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToDropdownListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
