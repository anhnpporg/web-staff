import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Input() inventoryUnitID: any
  @Output() deleteBatches = new EventEmitter<{}>();
  @Output() ChangeInventory = new EventEmitter<{}>();
  // = this.listBatches[0].currentQuantity[0]

  inventory: number = 0
  inventoryUnit: string = ''

  constructor() { }

  ngOnInit(): void {
    this.inventory = this.inventoryUnitID.currentQuantity
    this.inventoryUnit = this.inventoryUnitID.unit
    console.log(this.inventoryUnitID);
  }

  deleteconsignment() {
    console.log('ok');
    this.deleteBatches.emit(this.index)
  }
}
