import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-retail-product-in-bill',
  templateUrl: './retail-product-in-bill.component.html',
  styleUrls: ['./retail-product-in-bill.component.css']
})
export class RetailProductInBillComponent implements OnInit {


  @Input() Product: any
  @Input() index: number = 1
  @Output() quantityOfProduct = new EventEmitter<{}>();
  @Output() DeleteProduct = new EventEmitter<{}>();

  selectedValue: string = 'jack'
  demoValue: number = 1
  billQuantity: number = 1
  inputValue: string = ''
  listRouteInAdministrations: any = []
  listUnitProduct: any[] = []
  unitPriceID: number = 1
  unitPrice: number = 0
  confirmModal?: NzModalRef



  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.listRouteInAdministrations.push(this.Product.routeOfAdministration)
    this.listUnitProduct = this.Product.productUnits
    this.unitPriceID = this.listUnitProduct[0].id
    this.unitPrice = this.listUnitProduct[0].price
    console.log(this.unitPriceID);
    console.log(this.listUnitProduct);

  }

  chageUnitPrice() {
    this.listUnitProduct.forEach(element => {
      if (element.id == this.unitPriceID) {
        this.unitPrice = element.price
      }
    });
  }

  addQuantity(event: any) {
    this.quantityOfProduct.emit(this.unitPrice * event);
  }

  deleteProduct(id: number) {
    this.DeleteProduct.emit(id)
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa thuốc',
      nzContent: 'Bạn muốn xóa thuốc ra khỏi danh sách?',
      nzOnOk: () => {
        this.deleteProduct(this.Product.id)
      }
    });
  }

}
