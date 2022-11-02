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

  selectedbatchesValue: any
  demoValue: number = 1
  billQuantity: number = 1
  inputValue: string = ''
  listRouteInAdministrations: any = []
  listUnitProduct: any[] = []
  listBatches: any[] = []
  unitPriceID: number = 1
  unitPrice: number = 0
  confirmModal?: NzModalRef
  numberOfConsignment: number[] = []
  temp: number = 1

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.listRouteInAdministrations.push(this.Product.routeOfAdministration)
    this.listUnitProduct = this.Product.productUnits
    this.unitPriceID = this.listUnitProduct[0].id
    this.unitPrice = this.listUnitProduct[0].price
    this.listBatches = this.Product.batches
  }

  chageUnitPrice() {
    this.listUnitProduct.forEach(element => {
      if (element.id == this.unitPriceID) {
        this.unitPrice = element.price
      }
    });
  }

  addQuantity(event: any) {

    if (this.temp > event) {
      this.quantityOfProduct.emit({
        price: this.unitPrice * (this.temp - event),
        status: false,
        unit: this.unitPriceID,
        quantity: event,
        productID: this.Product.id
      });
      this.temp = event
    } else {
      this.quantityOfProduct.emit({
        price: this.unitPrice * (event - this.temp),
        status: true,
        unit: this.unitPriceID,
        quantity: event,
        productID: this.Product.id,
        batches: this.selectedbatchesValue.id
      });
      this.temp = event
    }

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

  addConsignment() {
    let a = this.numberOfConsignment.length + 1
    this.numberOfConsignment.push(a)
    console.log(this.numberOfConsignment);
  }

  deleteConsignment(index: number) {
    console.log(index);
    this.numberOfConsignment.splice(index, 1)
    console.log(this.numberOfConsignment);
  }

  selectBatches() {
    console.log(this.selectedbatchesValue);
  }
}
