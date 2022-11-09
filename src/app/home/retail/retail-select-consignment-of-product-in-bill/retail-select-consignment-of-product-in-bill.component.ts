import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-retail-select-consignment-of-product-in-bill]',
  templateUrl: './retail-select-consignment-of-product-in-bill.component.html',
  styleUrls: ['./retail-select-consignment-of-product-in-bill.component.css']
})
export class RetailSelectConsignmentOfProductInBillComponent implements OnInit {

  @Input() index = 0
  @Input() listUnitProduct: any[] = []
  @Output() deleteBatches = new EventEmitter<{}>();
  @Output() ChangeProductQuantity = new EventEmitter<{}>();

  inventory: number = 0
  inventoryUnit: string = ''
  unitPriceID: any
  ProductOfBatchQuantity: number = 0
  selectedValue: any
  demoValue: number = 0
  selectedbatchesValue: any
  unitPrice: number = 0
  listBatches: any[] = []


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {


    this.unitPriceID = this.listUnitProduct[0]
    this.productService.getInvetoryByUnitID(this.unitPriceID.id).subscribe((result) => {
      this.listBatches = result.data
      this.selectedbatchesValue = this.listBatches[this.index].batchId
      this.inventory = this.listBatches[this.index].currentQuantity

    })
    this.unitPrice = this.unitPriceID?.price
  }

  deleteconsignment() {
    console.log('ok');
    this.deleteBatches.emit(this.index)
  }
  chageUnitPrice() {
    this.unitPrice = this.unitPriceID?.price
    this.productService.getInvetoryByUnitID(this.unitPriceID.id).subscribe((result) => {
      this.listBatches = result.data
      console.log(result.data);
      console.log(this.listBatches);
    })
  }

  chageProductInBillQuantity() {
    this.ChangeProductQuantity.emit({
      index: this.index,
      unitPrice: this.unitPriceID.price,
      info: {
        quantity: this.ProductOfBatchQuantity,
        unit: this.unitPriceID.id,
        batchId: this.selectedbatchesValue
      }
    })
  }
}
