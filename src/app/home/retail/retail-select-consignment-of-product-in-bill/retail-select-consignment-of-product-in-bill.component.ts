import { batch } from './../../input/input-element/input-element.model';
import { Observable } from 'rxjs';
import { goodsIssueNote } from './../retail.model';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import * as counterSlice from "./../../../core/store/store.slice";

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
  ProductOfBatchQuantity: number = 1
  selectedValue: any
  demoValue: number = 0
  selectedbatchesValue: any
  unitPrice: number = 0
  listBatches: any[] = []

  ListgoodsIssueNote$: Observable<any> | undefined
  ListgoodsIssueNote: goodsIssueNote[] = []
  tempbatch: any




  constructor(
    private productService: ProductService,
    private store: Store<{}>
  ) { }

  ngOnInit(): void {

    
    this.unitPriceID = this.listUnitProduct[0]
    this.productService.getInvetoryByUnitID(this.unitPriceID.id).subscribe((result) => {
      this.listBatches = result.data

      this.inventory = this.listBatches[this.index].currentQuantity

    })
    this.unitPrice = this.unitPriceID?.price

    this.ListgoodsIssueNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.invoice)
    )

    this.ListgoodsIssueNote$.subscribe((result) => {
      result.product.forEach((element: any) => {
        if (element.productId == this.listUnitProduct[0].productId) {
          this.ListgoodsIssueNote = element.goodsIssueNote
        }
      });
    })

  }

  deleteconsignment() {
    this.deleteBatches.emit(this.index)
  }
  chageUnitPrice() {
    this.unitPrice = this.unitPriceID?.price
    this.productService.getInvetoryByUnitID(this.unitPriceID.id).subscribe((result) => {
      this.listBatches = result.data
    })

    for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {

      if (this.ListgoodsIssueNote[i].batchId == this.selectedbatchesValue) {

        let temp = [...this.ListgoodsIssueNote]

        temp[i] = {
          quantity: this.ProductOfBatchQuantity,
          unit: this.unitPriceID.id,
          batchId: this.ListgoodsIssueNote[i].batchId
        }

        this.ListgoodsIssueNote = temp
        break
      }
    }
    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      productId: this.listUnitProduct[0].productId,
      listBatches: this.ListgoodsIssueNote
    }))
  }

  chageProductInBillQuantity() {

    // this.ChangeProductQuantity.emit({
    //   index: this.index,
    //   unitPrice: this.unitPriceID.price,
    //   info: {
    //     quantity: this.ProductOfBatchQuantity,
    //     unit: this.unitPriceID.id,
    //     batchId: this.selectedbatchesValue
    //   }
    // })

    for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {

      if (this.ListgoodsIssueNote[i].batchId == this.selectedbatchesValue) {

        let temp = [...this.ListgoodsIssueNote]

        temp[i] = {
          quantity: this.ProductOfBatchQuantity,
          unit: this.unitPriceID.id,
          batchId: this.ListgoodsIssueNote[i].batchId
        }

        this.ListgoodsIssueNote = temp
        break
      }
    }

    console.log(this.ListgoodsIssueNote);

    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      productId: this.listUnitProduct[0].productId,
      listBatches: this.ListgoodsIssueNote
    }))


    this.ChangeProductQuantity.emit({ ok: 'ok' })

  }

  changeBatches() {
    // for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {

    //   if (this.ListgoodsIssueNote[i].batchId == this.selectedbatchesValue) {

    //     let temp = [...this.ListgoodsIssueNote]

    //     temp[i] = {
    //       quantity: this.ProductOfBatchQuantity,
    //       unit: this.unitPriceID.id,
    //       batchId: this.ListgoodsIssueNote[i].batchId
    //     }

    //     this.ListgoodsIssueNote = temp
    //     break
    //   }
    // }

    // console.log(this.ListgoodsIssueNote);

    // this.store.dispatch(counterSlice.addBatchesToProductinBill({
    //   productId: this.listUnitProduct[0].productId,
    //   listBatches: this.ListgoodsIssueNote
    // }))
  }
}
