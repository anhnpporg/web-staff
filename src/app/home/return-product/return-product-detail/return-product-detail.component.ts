import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import * as counterSlice from "./../../../core/store/store.slice";
import {Observable} from "rxjs";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: '[app-return-product-detail]',
  templateUrl: './return-product-detail.component.html',
  styleUrls: ['./return-product-detail.component.css']
})
export class ReturnProductDetailComponent implements OnInit {

  confirmModal?: NzModalRef;

  @Input() checkFull: boolean = true
  @Input() productData: any
  @Input() index: number = 0
  listUnitProduct: any[] = []
  SelectUnit: number = 0
  quantityProduct: number = 0


  invoiceDetailData: any
  invoiceDetailData$: Observable<any> | undefined


  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {
    console.log(this.checkFull)
    this.SelectUnit = this.productData.unit
    this.quantityProduct = this.productData.quantity

    this.productService.getListProductUnitByProductId(this.productData.product.id).subscribe((result) => {
      console.log(result)
      this.listUnitProduct = result.data

      this.listUnitProduct.forEach((item) => {
        if (item.unit == this.productData.unit) {
          this.SelectUnit = item.id
        }
      })

    })

    this.invoiceDetailData$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.ListReturnProduct)
    )
    this.invoiceDetailData$.subscribe((result) => {
      this.invoiceDetailData = result
    })




  }


  selectUnitPrice() {

  }

  changeQuantity() {
    let temp = [...this.invoiceDetailData]

    temp.forEach((item, index) => {
      if (this.productData.batch.id == item.batch.id) {
        temp[index] = {...temp[index], quantity: this.quantityProduct}
      }
    })

    console.log(temp)

  }

  deleteBatch() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa Lô thuốc này ra khỏi hóa đơn',
      nzContent: 'Khi xóa ra khỏi hóa đơn bạn không thể thêm lại vào danh sách',
      nzOnOk: () => {
        let temp = [...this.invoiceDetailData]

        temp.splice(this.index, 1)

        console.log(temp)

        this.invoiceDetailData = [...temp]

        console.log(this.invoiceDetailData)

        this.store.dispatch(counterSlice.addListReturnProduct(this.invoiceDetailData))
      }
    });
  }


}
