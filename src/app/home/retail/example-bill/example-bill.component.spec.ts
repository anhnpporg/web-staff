import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBillComponent } from './example-bill.component';

describe('ExampleBillComponent', () => {
  let component: ExampleBillComponent;
  let fixture: ComponentFixture<ExampleBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
