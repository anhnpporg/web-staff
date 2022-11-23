import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import {Observable} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-return-product-template',
  templateUrl: './return-product-template.component.html',
  styleUrls: ['./return-product-template.component.css']
})
export class ReturnProductTemplateComponent implements OnInit {

  invoiceBarcode: string = ''

  invoiceData: any
  invoiceDetailData: any
  invoiceDetailData$: Observable<any> | undefined
  switchFullInvocie: boolean = true
  returnTotalPrice: number = 0


  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {

    this.invoiceDetailData$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
    )
    this.invoiceDetailData$.subscribe((result) => {
      this.invoiceDetailData = result
      this.returnTotalPrice = 0
      this.invoiceDetailData.forEach((element: any, index: number) => {
        this.returnTotalPrice += element.quantity * element.unitPrice
      })
    })


  }

  searchInvocie() {
    console.log(this.invoiceBarcode)
    if (this.invoiceBarcode.length == 13) {
      if (this.invoiceBarcode.slice(0, 3) === 'INV') {
        this.productService.getInvocieByBarcode(this.invoiceBarcode).subscribe((result) => {
          this.invoiceData = result.data
          console.log(this.invoiceData)
        })
        this.productService.getInvocieDetailByBarcode(this.invoiceBarcode).subscribe((result) => {
          this.invoiceDetailData = result.data

          this.store.dispatch(counterSlice.addListReturnProduct(this.invoiceDetailData))


          this.invoiceDetailData$ = this.store.select(
            createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
          )
          this.invoiceDetailData$.subscribe((result) => {
            this.invoiceDetailData = result
            this.returnTotalPrice = 0

            this.invoiceDetailData.forEach((element: any, index: number) => {
              this.returnTotalPrice += element.quantity * element.unitPrice
            })
          })

        })
      }
    }
  }

  ReturnProduct() {

    if (this.invoiceData) {
      if (this.switchFullInvocie) {
        console.log('full')
        // this.productService.PostGoodReceiptNoteManager({
        //   goodsReceiptNoteTypeId: 2,
        //   invoiceId: this.invoiceData.id
        // }).subscribe((result) => {
        //   console.log(result)
        // })
      } else {
        console.log("k full")
      }
    } else {
      this.notification.create(
        "error",
        'Không có thông tin',
        'Vui lòng nhập đơn hàng để có thông tin đơn hàng'
      );
    }


  }


}
