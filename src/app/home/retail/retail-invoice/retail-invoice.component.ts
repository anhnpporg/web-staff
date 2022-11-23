import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";
import {createSelector, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as counterSlice from "./../../../core/store/store.slice";

@Component({
  selector: 'app-retail-invoice',
  templateUrl: './retail-invoice.component.html',
  styleUrls: ['./retail-invoice.component.css']
})
export class RetailInvoiceComponent implements OnInit {

  @ViewChild('printBtn') printBtn: ElementRef<HTMLElement> | undefined;

  @Input() invoiceID: number = 0

  today: number = Date.now()

  invoiceData: any
  invoiceDetail: any[] = []
  totalBillPrice: number = 0


  constructor(
    private productService: ProductService,
    private store: Store<{}>
  ) {
  }

  ngOnInit(): void {

    console.log(this.invoiceID)
    if (this.invoiceID != 0) {
      this.productService.getInvocieByInvoiceID(2).subscribe((result) => {
        this.invoiceData = result.data
      })
      this.productService.getInvoiceDetailByInvoiceID(2).subscribe((reuslt) => {
        this.invoiceDetail = reuslt.data
        this.totalBillPrice = 0

        this.invoiceDetail.forEach((item) => {
          this.totalBillPrice += item.totalPrice
        })
      })
    }
  }


  printClick() {
    console.log("in rồi")
    let print = this.printBtn?.nativeElement
    console.log(print)
    if (print) {
      print?.click();
    }
  }
}
