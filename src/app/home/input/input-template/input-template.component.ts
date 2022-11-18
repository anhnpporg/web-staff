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

  inputValue: string = ''
  options: any[] = [];
  listProductInput: any[] = []

  onInput(event: any): void {
    console.log(event);

    this.product.searchProduct(event).subscribe((result) => {
      console.log(result.items);

      this.options = result.items
    })
  }
  onSelect(event: any) {
    console.log(event);
    this.listProductInput = [event]

    this.store.dispatch(counterSlice.addgoodsReceiptNote(this.goodsReceiptNote))

  }
}
