import { UserService } from './../../../core/services/user/user.service';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-customer-in-bill',
  templateUrl: './retail-customer-in-bill.component.html',
  styleUrls: ['./retail-customer-in-bill.component.css']
})
export class RetailCustomerInBillComponent implements OnInit {

  selectedValue: any = ''
  phoneNumber: string = ''
  customerName: string = ''
  listCustomer: any[] = []
  customerInfo: any = null
  @Input() totalBill: any
  isSpinning: boolean = true

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  searchcustomer(value: string) {
    console.log('search:' + value);

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
    console.log(this.selectedValue.fullname);
    this.phoneNumber = this.selectedValue.phoneNumber
    this.customerName = this.selectedValue.fullname
  }

  openBill() {
    const a = document.getElementById('side__bar__bill');
    if (a != null) {
      a.style.display = 'block'
      console.log(a);

    }
  }




  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }

}

