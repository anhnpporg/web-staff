import { ProductService } from './../../../core/services/product/product.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    private notification: NzNotificationService
  ) {}

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

  // quantityProduct(event: any) {
  //   this.totalBill + event

  // }

}
