import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSelectConsignmentOfProductInBillComponent } from './retail-select-consignment-of-product-in-bill.component';

describe('RetailSelectConsignmentOfProductInBillComponent', () => {
  let component: RetailSelectConsignmentOfProductInBillComponent;
  let fixture: ComponentFixture<RetailSelectConsignmentOfProductInBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSelectConsignmentOfProductInBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailSelectConsignmentOfProductInBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
