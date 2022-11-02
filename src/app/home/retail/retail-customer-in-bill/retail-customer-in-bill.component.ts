import { InvoiceInterface } from './../../../core/utils/App.interface';
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
  @Input() TotalProductInBill: any[] = []
  @Input() InvoiceProduct: any[] = []
  isSpinning: boolean = true
  reciveMoney: number = 0
  isVisibleNewCustomer = false;
  printBill: any
  isVisibleHistoryInvoice = false




  constructor(
    private user: UserService,
    private productservice: ProductService
  ) { }

  ngOnInit(): void {
  }

  showInvoiceHistory() {
    this.isVisibleHistoryInvoice = true
  }
  handleOkInvoiceHistory(): void {
    console.log('Button ok clicked!');
    this.isVisibleHistoryInvoice = false;
  }

  handleCancelInvoiceHistory(): void {
    console.log('Button cancel clicked!');
    this.isVisibleHistoryInvoice = false;
  }

  createInvoice() {

    console.log(this.InvoiceProduct);
    var invoice: InvoiceInterface = {
      customerId: this.selectedValue.id,
      product: this.InvoiceProduct
    }
    this.printBill = invoice
    console.log(invoice);


    this.productservice.retailInvoice(invoice).subscribe((result) => {
      console.log(result);
    })
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
    this.customerName = this.selectedValue.fullName
    this.customerInfo = this.selectedValue
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

  addReciveMoney(money: number) {
    this.reciveMoney = money
  }

  showModalAddNewCustomer(): void {
    this.isVisibleNewCustomer = true;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleNewCustomer = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleNewCustomer = false;
  }
}

