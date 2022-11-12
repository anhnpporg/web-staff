import { NzNotificationService } from 'ng-zorro-antd/notification';
import { goodsReceiptNoteInterface } from './../input-element/input-element.model';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import * as counterSlice from "./../../../core/store/store.slice";
import { async, Observable } from 'rxjs';

@Component({
  selector: 'app-input-info-supplier',
  templateUrl: './input-info-supplier.component.html',
  styleUrls: ['./input-info-supplier.component.css']
})
export class InputInfoSupplierComponent implements OnInit {


  listSuppliers: any[] = []
  selectSupplier: any
  isVisible = false
  goodsReceiptNote$: Observable<any> | undefined
  goodsReceiptNote: any
  newSupplier: string = ''

  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private notification: NzNotificationService
  ) { }


  ngOnInit(): void {
    this.productService.getListSuppliers().subscribe((result) => {
      this.listSuppliers = result.data
    })

    this.goodsReceiptNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.listGoodsReceiptNote)
    )
  }

  selectSupplierChange() {
    console.log(this.selectSupplier);
    this.goodsReceiptNote$?.subscribe((result) => {
      console.log(result);
      this.goodsReceiptNote = result

    })

    this.store.dispatch(counterSlice.addgoodsReceiptNote({ ...this.goodsReceiptNote, supplierId: this.selectSupplier.id, supplier: null }))
    this.newSupplier = ''

  }


  showModalAddSupplier(): void {
    this.isVisible = true;
  }

  handleOkSupplier(): void {
    this.isVisible = false;
    this.goodsReceiptNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.listGoodsReceiptNote)
    )
    this.goodsReceiptNote$.subscribe((result) => {
      this.goodsReceiptNote = result

    })
    this.store.dispatch(counterSlice.addgoodsReceiptNote({ ...this.goodsReceiptNote, supplier: { name: this.newSupplier }, supplierId: null }))
    this.selectSupplier = ''

  }

  handleCancelSupplier(): void {
    this.isVisible = false;
  }



  inputProduct() {
    this.goodsReceiptNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.listGoodsReceiptNote)
    )
    this.goodsReceiptNote$.subscribe((result) => {
      this.productService.PostGoodReceiptNoteManager([result]).subscribe((resultInput) => {
        this.notification.create(
          'success',
          resultInput.message,
          ''
        );
      })
    })
  }

}
