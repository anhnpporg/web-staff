import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailBillTemplateProductComponent } from './retail-bill-template-product.component';

describe('RetailBillTemplateProductComponent', () => {
  let component: RetailBillTemplateProductComponent;
  let fixture: ComponentFixture<RetailBillTemplateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailBillTemplateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailBillTemplateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
