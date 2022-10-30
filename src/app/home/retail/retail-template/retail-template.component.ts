import { ProductService } from './../../../core/services/product/product.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-retail-template',
  templateUrl: './retail-template.component.html',
  styleUrls: ['./retail-template.component.css']
})
export class RetailTemplateComponent implements OnInit {

  selectedValue: string = 'a';
  listProduct: any[] = [];
  listInBill: any[] = []
  totalBill: number = 0

  constructor(
    private product: ProductService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }


  searchProduct(value: string) {
    if (value == '') {
      value = 'a'
    }
    this.product.getAllProduct(value).subscribe((result) => {
      this.listProduct = result.items
    })
  }

  addToListBill() {
    this.listProduct.forEach(element => {
      if (element.id == this.selectedValue) {
        if (this.listInBill.length > 0) {

          const result = this.listInBill.filter(bill => bill.id == this.selectedValue);
          console.log(result);

          if (result.length <= 0) {
            console.log('ok');
            this.listInBill.push(element)
          } else {
            this.notification.create(
              'warning',
              'Thuốc đã tồn tài trong hóa đơn',
              ''
            );
          }
        } else {
          console.log('o element');

          this.listInBill.push(element);
        }
      }
    });
  }



  quantityProduct(event: any) {
    this.totalBill += event
    console.log(this.totalBill);
  }
  deleteProductInBill(event: any) {
    const indexOfObject = this.listInBill.findIndex((object) => {
      return object.id == event;
    });
    if (indexOfObject !== -1) {
      this.listInBill.splice(indexOfObject, 1);
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

  closeBill() {
    const a = document.getElementById('side__bar__bill');
    if (a != null) {
      a.style.display = 'none'
      console.log(a);

    }
  }

}
