import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySpendingComponent } from './summary-spending.component';

describe('SummarySpendingComponent', () => {
  let component: SummarySpendingComponent;
  let fixture: ComponentFixture<SummarySpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarySpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
