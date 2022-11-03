import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-retail-select-consignment-of-product-in-bill]',
  templateUrl: './retail-select-consignment-of-product-in-bill.component.html',
  styleUrls: ['./retail-select-consignment-of-product-in-bill.component.css']
})
export class RetailSelectConsignmentOfProductInBillComponent implements OnInit {
  selectedValue: any
  demoValue: number = 0
  selectedbatchesValue: any
  @Input() listBatches: any[] = []
  @Input() index = 0

  constructor() { }

  ngOnInit(): void {
    console.log(this.listBatches);

  }



}
