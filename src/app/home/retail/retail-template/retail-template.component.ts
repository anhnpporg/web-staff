import {Observable} from 'rxjs';
import {invoiceInterface, product} from './../retail.model';
import {createSelector, Store} from '@ngrx/store';
import {ProductService} from './../../../core/services/product/product.service';
import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import * as counterSlice from "./../../../core/store/store.slice";
import {log} from "ng-zorro-antd/core/logger";

@Component({
  selector: 'app-retail-template',
  templateUrl: './retail-template.component.html',
  styleUrls: ['./retail-template.component.css']
})
export class RetailTemplateComponent implements OnInit {

  // tìm kiếm sản phẩm
  searchValue: any
  listSearchProduct: any[] = [];

  // danh sách sản phẩm
  listProductInBill$: Observable<any> | undefined // lấy từ kho lưu trữ (store.slice.ts)
  listProductInBill: any[] = [] // lưu thông tin lấy từ kho lưu trữ (listProductInBill$)

  isVisibleAddBatch: boolean = false; // show modal add product batch when add new product to bill

  invoice: invoiceInterface = {
    customerId: null,
    product: [],
    customer: null
  }
  // invoice$: Observable<any> | undefined
  // listProductInvoice:


  constructor(
    private productservice: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>
  ) {
  }

  ngOnInit(): void {

    // this.listProductInBill$ = this.store.select(
    //   createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    // )
    // this.listProductInBill$.subscribe((result) => {
    //   this.listProductInBill = result
    // })
  }


  searchProduct(event: any): void {

    let productsearchInbill

    if (event == "") {
      event = 0
    }

    if (event.length === 13) {
      if (event.slice(0, 3) == 'BAT') {
        this.productservice.searchProduct(event).subscribe((result) => {
          console.log(result.items)
          if (this.listProductInBill.length > 0) {
            let checkBatchExist = true

            this.listProductInBill.forEach((item) => {
              if (result.items[0].id === item.product.id) {
                productsearchInbill = item
                console.log(productsearchInbill)
                item.listBatches.forEach((batch: any) => {
                  if (batch.batchId === result.items[0].batches[0].id) {
                    console.log('ok')
                    checkBatchExist = false
                  }
                })

                if (checkBatchExist) {

                  let tempListBatches = [...productsearchInbill.listBatches]

                  tempListBatches = [...tempListBatches, {
                    quantity: 1,
                    unit: result.items[0].batches[0].currentQuantity[0].id,
                    batchId: result.items[0].batches[0].id
                  }]

                  console.log(tempListBatches)

                  this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
                    this.store.dispatch(counterSlice.addBatchesToProductinBill({
                      product: result2.data,
                      listBatches: tempListBatches
                    }))

                    console.log(result2)
                  })
                } else {
                  this.notification.create(
                    'error',
                    "Lô đã tồn tại",
                    'Vui lòng chọn lô khác'
                  )
                }
              }
            })

          } else {
            this.productservice.getProductByID(result.items[0].id).subscribe((result2) => {
              this.store.dispatch(counterSlice.addProducttoListBill({
                product: result2.data,
                listBatches: [
                  {
                    quantity: 1,
                    unit: result.items[0].batches[0].currentQuantity[0].id,
                    batchId: result.items[0].batches[0].id
                  }
                ]
              }))
            })

          }
        })
      }
    }


    this.productservice.searchProduct(event).subscribe((result) => {
      console.log(result.items)
      this.listSearchProduct = result.items
      console.log(this.listSearchProduct)
    })


    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
    })
  }

  addToListBill(): void {
    console.log(this.searchValue)
    this.productservice.getProductByID(this.searchValue).subscribe((result) => {
      let checkProductExist = true
      console.log(result)
      if (this.listProductInBill.length > 0) {
        console.log(this.listProductInBill)
        for (const listProductInBillElement of this.listProductInBill) {
          if (listProductInBillElement.product.id == result.data.id) {
            console.log("ok")
            checkProductExist = false
          }
        }
        if (checkProductExist) {
          console.log("ok1")
          this.store.dispatch(counterSlice.addProducttoListBill({
            product: result.data,
            listBatches: []
          }))
        } else {
          this.notification.create(
            'Error',
            'Lỗi',
            'Sản phẩm đã tồn tại trong hóa đơn'
          )
        }
      } else {
        this.store.dispatch(counterSlice.addProducttoListBill({
          product: result.data,
          listBatches: []
        }))
      }

    })

    this.listProductInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listProductInBill$.subscribe((result) => {
      this.listProductInBill = result
    })
  }


}
