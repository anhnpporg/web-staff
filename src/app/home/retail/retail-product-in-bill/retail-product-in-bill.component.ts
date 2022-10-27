import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-retail-product-in-bill',
  templateUrl: './retail-product-in-bill.component.html',
  styleUrls: ['./retail-product-in-bill.component.css']
})
export class RetailProductInBillComponent implements OnInit {

  selectedValue: string = 'jack'
  demoValue: number = 1
  billQuantity: number = 1
  inputValue: string = ''
  @Input() Product: any
  listRouteInAdministrations: any = []
  listUnitProduct: any[] = []
  unitPriceID: number = 1
  unitPrice: number = 0


  @Input() index: number = 1
  @Output() quantityOfProduct = new EventEmitter<{}>();

  constructor(
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
    this.quantityOfProduct.emit(this.unitPrice * this.billQuantity);
  }
}
