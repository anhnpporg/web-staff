import { Observable } from 'rxjs';
import { invoiceInterface } from './../retail.model';
import { createSelector, Store } from '@ngrx/store';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as counterSlice from "./../../../core/store/store.slice";
@Component({
  selector: 'app-retail-template',
  templateUrl: './retail-template.component.html',
  styleUrls: ['./retail-template.component.css']
})
export class RetailTemplateComponent implements OnInit {

  selectedValue: any
  listProduct: any[] = [];
  listInBill: any[] = []
  totalBill: number = 0
  printBillList: any[] = []
  listInvoiceProduct: any[] = []
  listgoodsIssueNote: any[] = []


  listInBill$: Observable<any> | undefined

  invoice: invoiceInterface = {
    customerId: null,
    product: [],
    customer: null
  }
  // invoice$: Observable<any> | undefined
  // listProductInvoice:


  constructor(
    private product: ProductService,
    private notification: NzNotificationService,
    private readonly store: Store<{}>
  ) {
  }

  ngOnInit(): void {

    this.listInBill$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListProductInbill)
    )
    this.listInBill$.subscribe((result) => {
      this.listInBill = result
    })

  }


  searchProduct(value: string) {
    if (value == '') {
      value = 'pro'
    }

    this.product.getAllProduct(value).subscribe((result) => {
      if (value.length == 13) {
        if (value.slice(0, 3) == 'BAT') {
          this.product.getProductByBatchBarcode(value).subscribe((resultBatch) => {
            this.product.getProductByID(resultBatch.data.product.id).subscribe((resultProductbyBatch) => {
              var productOBJ = resultProductbyBatch
              console.log(productOBJ);
              productOBJ.batches = [resultBatch.data]
              var check = true
              this.listInBill.forEach(element => {
                if (element.batches.length == 1) {
                  if (element.batches[0].batchBarcode == productOBJ.batches[0].batchBarcode) {
                    check = false
                    this.notification.create(
                      'warning',
                      'Thuốc đã tồn tài trong hóa đơn',
                      ''
                    );
                  }
                }
              });
              if (check == true) {
                this.listInBill.push(productOBJ)
                let listBatchofProduct: any[] = []
                productOBJ.batches.forEach((element: any) => {
                  listBatchofProduct.push(element.id)
                });
                this.store.dispatch(counterSlice.addProducttoListBill({
                  productId: productOBJ.id,
                  batchid: listBatchofProduct
                }))

                // this.listInvoiceProduct.push({
                //   productId: productOBJ.id,
                //   goodsIssueNote: [{
                //     quantity: 1,
                //     unit: productOBJ.productUnits[0].id,
                //     batchId: productOBJ.batches[0].id
                //   }]
                // })
                this.totalBill += productOBJ.productUnits[0].price
                this.selectedValue = ''
              }
            })
          })
        } else if (value.slice(0, 3) === 'PRO') {
          const exist = this.listInBill.filter(bill => bill.barcode == result.barcode);
          if (exist.length <= 0) {
            this.listInBill.push(result.items[0])
            // this.listInvoiceProduct.push({
            //   productId: result.items[0].id,
            //   goodsIssueNote: [{
            //     quantity: 1,
            //     unit: result.items[0].productUnits[0].id,
            //     batchId: result.items[0].batches[0].id
            //   }]
            // })
            this.totalBill += result.items[0].productUnits[0].price
            this.selectedValue = ''
          } else {
            this.notification.create(
              'warning',
              'Thuốc đã tồn tạii trong hóa đơn',
              ''
            );
          }
        }

      } else {
        this.listProduct = result.items
      }
    })
  }

  addToListBill() {
    // this.listProduct.forEach(element => {
    //   if (element.id == this.selectedValue) {
    //     if (this.listInBill.length > 0) {

    //       const result = this.listInBill.filter(bill => bill.id == this.selectedValue);
    //       console.log(result);

    //       if (result.length <= 0) {
    //         console.log('ok');
    //         this.listInBill.push(element)

    //         this.totalBill += element.productUnits[0].price
    //         let listBatchofProduct: any[] = []
    //         element.batches.forEach((element: any) => {
    //           listBatchofProduct.push(element.id)

    //           // this.invoice.product = [...this.invoice, this.invoice.product = ]

    //         });
    //         // this.store.dispatch(counterSlice.addProducttoListBill())


    //         this.selectedValue = ''
    //       } else {
    //         this.notification.create(
    //           'warning',
    //           'Thuốc đã tồn tài trong hóa đơn',
    //           ''
    //         );
    //       }
    //     } else {

    //       this.listInBill.push(element);
    //       let listBatchofProduct: any[] = []
    //       element.batches.forEach((element: any) => {
    //         listBatchofProduct.push(element.id)
    //       });
    //       this.store.dispatch(counterSlice.addProducttoListBill({
    //         productId: element.id,
    //         batchid: listBatchofProduct
    //       }))
    //       this.totalBill += element.productUnits[0].price

    //       this.selectedValue = ''

    //     }
    //   }
    // });
    // console.log(this.listInBill);

    if (this.listInBill.length > 0) {
      let selectProduct: any
      let checkExistProduct = true
      for (let i = 0; i < this.listInBill.length; i++) {
        if (this.listInBill[i].id == this.selectedValue) {
          checkExistProduct = false;
          break
        }
      }

      if (checkExistProduct) {
        this.product.getProductByID(this.selectedValue).subscribe((result) => {
          let newdata = result.data
          this.store.dispatch(counterSlice.addProducttoListBill(newdata))
        })

      } else {
        this.notification.create(
          'error',
          'Sản phẩm đã tồn tại',
          ''
        )
      }
    } else {
      this.product.getProductByID(this.selectedValue).subscribe((result) => {
        let newdata = result.data
        this.store.dispatch(counterSlice.addProducttoListBill(newdata))
      })

    }

  }
  quantityProduct(event: any) {
    console.log(event);


    let result = this.listInvoiceProduct.filter(item => item.productId == event.productID)

    if (result.length <= 0) {
      // this.listInvoiceProduct.push({
      //   productId: event.productID,
      //   goodsIssueNote: {
      //     quantity: event.quantity,
      //     unit: event.unit
      //   }
      // })
    } else {
      for (let i = 0; i < this.listInvoiceProduct.length; i++) {
        let element = this.listInvoiceProduct[i];
        if (element.productId == event.productID) {
          this.listInvoiceProduct[i] = {
            productId: event.productID,
            goodsIssueNote: [{
              quantity: event.quantity,
              unit: event.unit,
              batchId: event.batches
            }]
          }
        }
      }
    }
    if (event.status) {
      this.totalBill += event.price
    } else {
      this.totalBill -= event.price
    }
  }
  deleteProductInBill(event: any) {
    const indexOfObject = this.listInBill.findIndex((object) => {
      return object.id == event;
    });
    if (indexOfObject !== -1) {
      this.listInBill.splice(indexOfObject, 1);
      this.listInvoiceProduct.splice(indexOfObject, 1)
    }
    console.log(this.listInBill);

  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  addInvoice(event: any) {
    console.log(event);
    var check = true

    this.listInvoiceProduct.forEach(element => {
      if (element.productId == event.productId) {
        element.goodsIssueNote.quantity = event.goodsIssueNote.quantity
        check = false
      }
    });

    if (check) {
      this.listInvoiceProduct.push(event)
    }


    this.totalBill == 0
    event.goodsIssueNote.forEach((element: any) => {
      this.product.getProductUnitbyUnitID(element.unit).subscribe((result) => {
        this.product.getBatchByBatchID(element.batchId).subscribe((resultBatch) => {
          this.listgoodsIssueNote.push({
            quantity: element.quantity,
            batches: resultBatch,
            unit: result
          })
        })
      })
    });

    this.listgoodsIssueNote.forEach(element => {
      console.log(element.unit.price);
      console.log(element.quantity);


      this.totalBill = (element.quantity) * element.unit.price
      console.log(this.totalBill);
    });



    console.log(this.listInvoiceProduct);

  }

}
