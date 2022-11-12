import { ProductService } from './../../../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-customer-history-invoice-detail',
  templateUrl: './retail-customer-history-invoice-detail.component.html',
  styleUrls: ['./retail-customer-history-invoice-detail.component.css']
})
export class RetailCustomerHistoryInvoiceDetailComponent implements OnInit {

  @Input() invoiceID: number = 0
  @Input() invoiceDate: any

  ListProductInInvoiceDetail: any[] = []

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getInvoiceDetailByInvoiceID(this.invoiceID).subscribe((result) => {
      this.ListProductInInvoiceDetail = result.data
      console.log(this.ListProductInInvoiceDetail);

    })
  }

}
