import { InvoiceInterface } from './../../../core/utils/App.interface';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-retail-template',
  templateUrl: './retail-template.component.html',
  styleUrls: ['./retail-template.component.css']
})
export class RetailTemplateComponent implements OnInit {

  selectedValue: string = 'test';
  listProduct: any[] = [];
  listInBill: any[] = []
  totalBill: number = 0
  printBillList: any[] = []
  listInvoiceProduct: any[] = []

  constructor(
    private product: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }


  searchProduct(value: string) {
    if (value == '') {
      value = 'test'
    }
    this.product.getAllProduct(value).subscribe((result) => {
      if (value.length == 13) {
        console.log('value' + value);
        const exist = this.listInBill.filter(bill => bill.barcode == result);
        console.log('exit' + exist);
        console.log(this.listInBill);

        if (exist.length <= 0) {
          this.listInBill.push(result.items[0])
          console.log('ok');

        } else {
          this.notification.create(
            'warning',
            'Thuốc đã tồn tài trong hóa đơn',
            ''
          );
        }

      } else {
        this.listProduct = result.items
        // console.log(result.items);
      }
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
            this.totalBill += element.productUnits[0].price

            this.selectedValue = ''
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
          this.totalBill += element.productUnits[0].price

        }
      }
    });
  }



  quantityProduct(event: any) {

    let result = this.listInvoiceProduct.filter(item => item.productId == event.productID)

    if (result.length <= 0) {
      this.listInvoiceProduct.push({
        productId: event.productID,
        goodsIssueNote: {
          quantity: event.quantity,
          unit: event.unit
        }
      })
    } else {
      for (let i = 0; i < this.listInvoiceProduct.length; i++) {
        let element = this.listInvoiceProduct[i];
        if (element.productId == event.productID) {
          this.listInvoiceProduct[i] = {
            productId: event.productID,
            goodsIssueNote: {
              quantity: event.quantity,
              unit: event.unit,
              batchId: event.batches
            }
          }
        }
      }
    }
    if (event.status) {
      this.totalBill += event.price
    } else {
      this.totalBill -= event.price
    }
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

}
