import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, createSelector } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { goodsReceiptNoteInterface, batch, batchs } from './input-element.model';
import { ProductService } from './../../../core/services/product/product.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import * as counterSlice from "./../../../core/store/store.slice";

@Component({
  selector: '[app-input-element]',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.css']
})
export class InputElementComponent implements OnInit {

  @Input() InputProduct: any
  @Input() index = 0
  confirmModal?: NzModalRef;

  isVisible = false;
  isVisibleBatches = false;
  batche: any

  addBatchsList: any[] = []

  // chọn lô
  batchesList: any
  selectBatch: any
  quantityBatch: number = 0
  selectUnitProductPrice: number = 0
  listUnitProductPrice: any
  totalPrice: number = 0
  listBatches: batchs[] = []
  /* ************************* */

  // Tạo lô mới
  manufacturingDate: string = ''
  expiryDate: string = '';

  // ************************8

  batch = {
    productId: 0,
    manufacturingDate: '',
    expiryDate: ''
  }

  batchs: batchs = {
    batchId: null,
    quantity: 0,
    productUnitPriceId: 0,
    totalPrice: 0,
    batch: this.batch
  }

  goodsReceiptNote$: Observable<any> | undefined
  goodsReceiptNote: any

  constructor(
    private modal: NzModalService,
    private productService: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>,
  ) { }
  ngOnInit(): void {
    console.log(this.InputProduct);
    this.productService.getBatchesByProductID(this.InputProduct.id).subscribe((result) => {
      this.batchesList = result.data
      this.listUnitProductPrice = result.data[0].currentQuantity
      console.log(result.data);
    })

    this.goodsReceiptNote$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.listGoodsReceiptNote)
    )

    this.goodsReceiptNote$.subscribe((result) => {
      this.goodsReceiptNote = result
    })



  }


  getUnitProductPrice() {
    this.productService.getBatchByBatchID(this.selectBatch).subscribe((result) => {
      this.listUnitProductPrice = result.data.currentQuantity
    })
  }
  showModalBatches(): void {
    this.isVisibleBatches = true;
  }
  handleOkBatches(): void {
    console.log('Button ok clicked!');
    this.isVisibleBatches = false;
    this.batchs = {
      batchId: this.selectBatch,
      quantity: this.quantityBatch,
      productUnitPriceId: this.selectUnitProductPrice,
      totalPrice: this.totalPrice,
      batch: null
    }

    console.log(this.batchs);

    // this.batchs.batchId = this.selectBatch.id
    var check = true;
    for (let i = 0; i < this.goodsReceiptNote.batches.length; i++) {
      if (this.goodsReceiptNote.batches[i].batchId == this.batchs.batchId) {
        check = false
        break
      }
    }
    if (check) {
      this.listBatches = [...this.listBatches, this.batchs]

      if (this.goodsReceiptNote) {
        this.store.dispatch(counterSlice.addgoodsReceiptNote({ ...this.goodsReceiptNote, batches: this.listBatches }))
      }

    } else {
      this.notification.create(
        'error',
        'Lô hàng đã tồn tại',
        ''
      );
    }
  }
  handleCancelBatches(): void {
    console.log('Button cancel clicked!');
    this.isVisibleBatches = false;
  }


  showModalNewBatch(): void {
    this.isVisible = true;
  }

  handleOkNewBatch(): void {
    this.isVisible = false;

    this.batch = {
      productId: this.InputProduct.id,
      manufacturingDate: this.manufacturingDate,
      expiryDate: this.expiryDate
    }

    this.batchs = {
      batchId: null,
      quantity: this.quantityBatch,
      productUnitPriceId: this.selectUnitProductPrice,
      totalPrice: this.totalPrice,
      batch: this.batch
    }
    this.listBatches = [...this.listBatches, this.batchs]
    this.store.dispatch(counterSlice.addgoodsReceiptNote({ ...this.goodsReceiptNote, batches: this.listBatches }))

  }

  handleCancelNewBatch(): void {
    this.isVisible = false;
  }

  deleteSelectBatches(index: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa lô đã chọn',
      nzContent: 'Bạn muốn xóa lô thuốc này',
      nzOnOk: () => {
        var tem = [...this.listBatches]
        tem.splice(index, 1)
        this.listBatches = [...tem]
        this.store.dispatch(counterSlice.addgoodsReceiptNote({ ...this.goodsReceiptNote, batches: this.listBatches }))
      }

    });
  }
}