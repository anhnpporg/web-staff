import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product/product.service";

@Component({
  selector: 'app-retail-invoice',
  templateUrl: './retail-invoice.component.html',
  styleUrls: ['./retail-invoice.component.css']
})
export class RetailInvoiceComponent implements OnInit {

  @Input() invoiceID: number = 0

  today: number = Date.now()

  invoiceData: any
  invoiceDetail: any[] = []
  totalBillPrice: number = 0


  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {

    this.productService.getInvocieByInvoiceID(7).subscribe((result) => {
      this.invoiceData = result.data
    })

    this.productService.getInvoiceDetailByInvoiceID(7).subscribe((reuslt) => {
      this.invoiceDetail = reuslt.data
      this.totalBillPrice = 0

      this.invoiceDetail.forEach((item) => {
        this.totalBillPrice += item.totalPrice
      })
    })

  }

}
