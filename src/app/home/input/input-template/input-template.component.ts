import { goodsReceiptNoteInterface } from './../input-element/input-element.model';
import { Store, createSelector } from '@ngrx/store';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";

@Component({
  selector: 'app-input-template',
  templateUrl: './input-template.component.html',
  styleUrls: ['./input-template.component.css']
})
export class InputTemplateComponent implements OnInit {

  goodsReceiptNote: goodsReceiptNoteInterface = {
    goodsReceiptNoteTypeId: 1,
    invoiceId: null,
    supplierId: null,
    batches: [],
    supplier: null
  }

  constructor(
    private product: ProductService,
    private readonly store: Store<{}>
  ) { }

  ngOnInit(): void {
  }

  // counter$ = this.store.select(
  //   createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
  // )

  inputValue: any
  options: any[] = [];
  listProductInput: any[] = []

  onInput(): void {
    this.product.getAllProduct(this.inputValue).subscribe((result) => {
      this.options = result.items
    })
  }
  onSelect(event: any, value: any) {
    if (event.isUserInput == true) {
      this.listProductInput.push(value)
      // this.store.select(counterSlice.)
      this.store.dispatch(counterSlice.addProductToListInput({
        productId: value.id,
        batchesId: []
      }))
      this.store.dispatch(counterSlice.addgoodsReceiptNote(this.goodsReceiptNote))

    }
  }
}
