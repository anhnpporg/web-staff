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
  // demoValue: number = 1
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
  inventory: number = 0
  inventoryUnit: string = ''
  inventoryUnitID: any
  listInventory: any[] = []
  lastUnitPrice: number = 0
  newPrice: number = 0

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    console.log(this.Product);

    this.listRouteInAdministrations.push(this.Product.routeOfAdministration)
    this.listUnitProduct = this.Product.productUnits
    this.inventory = this.Product.batches[0].currentQuantity[0].currentQuantity
    this.inventoryUnit = this.Product.batches[0].currentQuantity[0].unit
    this.listInventory = this.Product.batches[0].currentQuantity

    this.unitPriceID = this.listUnitProduct[0].id
    this.unitPrice = this.listUnitProduct[0].price
    this.listBatches = this.Product.batches
    this.selectedbatchesValue = this.listBatches[0]
    this.lastUnitPrice = this.unitPrice
    this.inventoryUnitID = this.Product.batches[0].currentQuantity[0]
  }

  chageUnitPrice() {

    this.listInventory.forEach(element => {
      if (element.id == this.unitPriceID) {
        this.inventory = element.currentQuantity
        this.inventoryUnit = element.unit
        this.inventoryUnitID = element
      }
    });

    this.listUnitProduct.forEach(element => {
      if (element.id == this.unitPriceID) {
        this.unitPrice = element.price
      }
    });
    console.log(this.inventoryUnitID);

    // this.addQuantity(this.temp)
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
    if (a < this.listBatches.length) {
      this.numberOfConsignment.push(a)
    }
  }

  deleteConsignment(index: any) {
    console.log(index);
    this.numberOfConsignment.splice(index, 1)
    console.log(this.numberOfConsignment);
  }

  selectBatches() {
    console.log(this.selectedbatchesValue);
  }
}
