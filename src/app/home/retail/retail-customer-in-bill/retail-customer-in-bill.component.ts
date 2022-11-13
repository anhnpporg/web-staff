import { product } from './../retail.model';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { InvoiceInterface } from './../../../core/utils/App.interface';
import { UserService } from './../../../core/services/user/user.service';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgxPrintDirective } from 'ngx-print';
import { createSelector, Store } from '@ngrx/store';
import * as counterSlice from "./../../../core/store/store.slice";

@Component({
  selector: 'app-retail-customer-in-bill',
  templateUrl: './retail-customer-in-bill.component.html',
  styleUrls: ['./retail-customer-in-bill.component.css']
})
export class RetailCustomerInBillComponent implements OnInit {

  @ViewChild('printBtn') printBtn: ElementRef<HTMLElement> | undefined;

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
  confirmModal?: NzModalRef;
  invoice: InvoiceInterface = {
    customerId: null,
    product: [],
    customer: null
  }

  invoiceRedux$: Observable<any> | undefined
  invoiceRedux: any
  totalBillPrice: number = 0


  constructor(
    private user: UserService,
    private productservice: ProductService,
    private router: Router,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private store: Store<{}>
  ) { }

  ngOnInit(): void {
    this.invoiceRedux$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.invoice)
    )
    this.invoiceRedux$.subscribe((result) => {
      this.invoiceRedux = result
      this.totalBillPrice = 0
      for (let i = 0; i < this.invoiceRedux.product.length; i++) {
        for (let j = 0; j < this.invoiceRedux.product[i].goodsIssueNote.length; j++) {
          this.productservice.getProductUnitbyUnitID(this.invoiceRedux.product[i].goodsIssueNote[j].unit).subscribe((result) => {
            this.totalBillPrice += (this.invoiceRedux.product[i].goodsIssueNote[j].quantity * result.data.price)
          })
        }
      }



    })
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

    this.confirmModal = this.modal.confirm({
      nzTitle: 'Bán hàng',
      nzContent: 'xuất hóa đơn',
      nzOnOk: () => {
        // let print = this.printBtn?.nativeElement
        // print?.click();
        console.log(this.invoiceRedux);
        
        this.productservice.retailInvoice(this.invoiceRedux).subscribe((result) => {
          console.log(result);
          this.notification.create(
            'success',
            result.message,
            ''
          );
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });

        })
      }
    });


    // this.invoice = {
    //   customerId: this.selectedValue.id,
    //   product: this.InvoiceProduct,
    //   customer: null
    // }
    // var check = true
    // console.log(this.invoice);

    // if (this.invoice.customerId == undefined) {
    //   if (this.phoneNumber == '' && this.customerName == '') {
    //     check = false
    //     this.notification.create(
    //       'error',
    //       'Thiếu thông tin',
    //       'Vui lòng chọn thông tin khách hàng'
    //     );
    //   } else {
    //     this.invoice = {
    //       customerId: null,
    //       product: this.InvoiceProduct,
    //       customer: {
    //         phoneNumber: this.phoneNumber,
    //         fullName: this.customerName
    //       }
    //     }
    //   }
    // }
    // if (this.invoice.product.length <= 0) {
    //   check = false
    //   this.notification.create(
    //     'error',
    //     'Thiếu thông tin',
    //     'Vui lòng chọn thuốc'
    //   );
    // }
    // if (check) {




    //   this.printBill = this.invoice
    //   console.log(this.invoice);
    //   this.confirmModal = this.modal.confirm({
    //     nzTitle: 'Bán hàng',
    //     nzContent: 'xuất hóa đơn',
    //     nzOnOk: () => {
    //       let print = this.printBtn?.nativeElement
    //       print?.click();
    //       // this.productservice.retailInvoice(this.invoice).subscribe((result) => {
    //       //   console.log(result);
    //       //   this.notification.create(
    //       //     'success',
    //       //     result.message,
    //       //     ''
    //       //   );
    //       //   let currentUrl = this.router.url;
    //       //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //       //     this.router.navigate([currentUrl]);
    //       //   });

    //       // })
    //     }
    //   });
    // }

    // console.log(this.printBill.product);



  }

  searchcustomer(value: string) {
    // console.log('search:' + value);

    if (value == '') {
      value = '0'
    }
    this.user.getListCustomerSearch(value).subscribe((result) => {
      // console.log(result);

      this.listCustomer = result.items
      if (this.listCustomer.length == 0) {
        this.phoneNumber = value
      }
    })




  }

  addcustomer() {
    this.phoneNumber = this.selectedValue.phoneNumber
    this.customerName = this.selectedValue.fullName
    this.customerInfo = this.selectedValue

    console.log(this.invoiceRedux);

    this.invoiceRedux = { ...this.invoiceRedux, customerId: this.customerInfo.id, customer: null }

    this.store.dispatch(counterSlice.addCustomer(this.invoiceRedux))

  }

  openBill() {
    const a = document.getElementById('side__bar__bill');
    if (a != null) {
      a.style.display = 'block'
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
  handleOkAddNewCustomer(): void {

    console.log('Button ok clicked!');
    this.isVisibleNewCustomer = false;

    this.invoiceRedux = {
      ...this.invoiceRedux, customerId: null, customer: {
        phoneNumber: this.phoneNumber,
        fullName: this.customerName
      }
    }
    this.store.dispatch(counterSlice.addCustomer(this.invoiceRedux))

  }

  handleCancelAddNewCustomer(): void {
    this.isVisibleNewCustomer = false;
  }
}

