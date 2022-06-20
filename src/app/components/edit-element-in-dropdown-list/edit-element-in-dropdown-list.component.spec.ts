import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementInDropdownListComponent } from './edit-element-in-dropdown-list.component';

describe('EditElementInDropdownListComponent', () => {
  let component: EditElementInDropdownListComponent;
  let fixture: ComponentFixture<EditElementInDropdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditElementInDropdownListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditElementInDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
