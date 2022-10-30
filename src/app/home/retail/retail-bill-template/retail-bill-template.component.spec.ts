import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailBillTemplateComponent } from './retail-bill-template.component';

describe('RetailBillTemplateComponent', () => {
  let component: RetailBillTemplateComponent;
  let fixture: ComponentFixture<RetailBillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailBillTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailBillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
