import { createSelector } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { ListInputProductInterface } from './../../../../core/store/store.model';
import { Observable, async } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from "../../../../core/services/product/product.service";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { differenceInCalendarDays } from 'date-fns';
import * as counterSlice from './../../../../core/store/store.slice'

@Component({
  selector: 'app-batch-tag-infomation',
  templateUrl: './batch-tag-infomation.component.html',
  styleUrls: ['./batch-tag-infomation.component.css']
})
export class BatchTagInfomationComponent implements OnInit {

  @Input() batchInfo: any

  fullInfomationOfBatch: any


  unit: string = ''
  productInfor: any

  isVisibleEdit: boolean = false

  // edit batch information
  totalPrice: number = 0
  listUnitProductPrice: any[] = []
  selectUnitProductPrice: number = 0
  quantityBatch: number = 0

  listProductInput$: Observable<any> | undefined
  listProductInput: ListInputProductInterface[] = []

  //new batch
  manufacturingDate: string = ''
  expiryDate: string = '';
  // checkManufacturingDate: boolean = true
  // checkExpiryDate: boolean = true

  // today = new Date();
  // tomorow: any = new Date().setDate(this.today.getDate() + 1)


  // disabledDate = (current: Date): boolean => {
  //   return differenceInCalendarDays(current, this.today) > 0;
  // }
  // disabledDateExp = (current: Date): boolean => {
  //   return differenceInCalendarDays(this.tomorow, current) > 0;
  // }


  constructor(
    private productService: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>,
  ) {
  }

  ngOnInit(): void {

    this.listProductInput$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListInputProduct)
    )
    this.listProductInput$.subscribe((result) => {
      this.listProductInput = result
    })

    this.quantityBatch = this.batchInfo.quantity
    this.totalPrice = this.batchInfo.totalPrice
    if (this.batchInfo.batch != null) {
      this.manufacturingDate = this.batchInfo.batch.manufacturingDate
      this.expiryDate = this.batchInfo.batch.expiryDate
    }

    this.productService.getProductUnitbyUnitID(this.batchInfo.productUnitPriceId).subscribe((result) => {
      this.unit = result.data.unit
      this.productInfor = result.data.productId
      console.log(this.productInfor);

    }, err => {
      this.notification.create(
        'error',
        err.error.message,
        ''
      )
    })


    if (this.batchInfo.batchId != null) {
      this.productService.getBatchById(this.batchInfo.batchId).subscribe((result) => {
        console.log(result.data)
        this.fullInfomationOfBatch = result.data

        // this.fullInfomationOfBatch.currentQuantity.forEach((item: any) => {
        //   if (item.id == this.batchInfo.productUnitPriceId) {
        //     this.unit = item.unit
        //   }
        // })

      }, err => {
        this.notification.create(
          'error',
          err.error.message,
          ''
        )
      })
    }

  }


  openModalEditBatch() {
    this.isVisibleEdit = true
  }

  async handleOkEditBatch() {

    let tempListProductInput: any[] = []
    let tempListBatches: any[] = []

    this.isVisibleEdit = false



    tempListProductInput = [...this.listProductInput]

    tempListProductInput.forEach((item: any, index) => {
      if (item.product.id == this.productInfor) {
        tempListBatches = item.listBatch
        tempListBatches.forEach((item2: any, i) => {
          if (item2.batchId == this.batchInfo.batchId) {
            let temp3 = { ...item2 }
            temp3.quantity = this.quantityBatch
            temp3.totalPrice = this.totalPrice
            let temp2 = [...tempListBatches]
            temp2[i] = { ...temp3 }
            tempListBatches = temp2
            tempListProductInput[index] = { ...tempListProductInput[index], listBatch: tempListBatches }
      this.store.dispatch(counterSlice.addProductToListInput(tempListProductInput))
          }
        })
      }

      
    })







  }
  handleCanceleditBatch() {
    this.isVisibleEdit = false
  }

}