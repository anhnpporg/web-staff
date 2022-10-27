import { UserService } from './../../../core/services/user/user.service';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-customer-in-bill',
  templateUrl: './retail-customer-in-bill.component.html',
  styleUrls: ['./retail-customer-in-bill.component.css']
})
export class RetailCustomerInBillComponent implements OnInit {

  selectedValue: string = ''
  phoneNumber: string = ''
  customerName: string = ''
  listCustomer: any[] = []
  customerInfo: any = null

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  searchcustomer(value: string) {
    if (value == '') {
      value = '0'
    }
    this.user.getListCustomerSearch(value).subscribe((result) => {
      // console.log(result);

      this.listCustomer = result.items
      console.log(this.listCustomer);

    })
  }

  addcustomer() {
    console.log('ok');

    this.listCustomer.forEach(element => {
      if (element.userId == this.selectedValue) {
        this.customerInfo = element
        console.log(this.customerInfo);
        this.phoneNumber = this.customerInfo?.phoneNumber
        this.customerName = this.customerInfo.fullname

      }
    });

  }

}

