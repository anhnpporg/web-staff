import { ProductService } from './../../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-customer-history-invoice',
  templateUrl: './retail-customer-history-invoice.component.html',
  styleUrls: ['./retail-customer-history-invoice.component.css']
})
export class RetailCustomerHistoryInvoiceComponent implements OnInit {

  @Input() customerId: number = 0

  listInvoiceID: any[] = []

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getListInvoicebyCustomerID(this.customerId).subscribe((result) => {
      this.listInvoiceID = result.data
      console.log(this.listInvoiceID);
      
    })

  }

}
