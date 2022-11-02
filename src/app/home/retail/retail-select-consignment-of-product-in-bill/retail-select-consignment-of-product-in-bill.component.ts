import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-select-consignment-of-product-in-bill',
  templateUrl: './retail-select-consignment-of-product-in-bill.component.html',
  styleUrls: ['./retail-select-consignment-of-product-in-bill.component.css']
})
export class RetailSelectConsignmentOfProductInBillComponent implements OnInit {
  selectedValue: any
  demoValue: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
