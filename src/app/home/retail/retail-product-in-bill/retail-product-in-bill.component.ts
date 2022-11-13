import { Observable } from 'rxjs';
import { product } from './../retail.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from './../../../core/utils/App.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { goodsIssueNote } from '../retail.model';
import * as counterSlice from "./../../../core/store/store.slice";
import { Store, createSelector } from '@ngrx/store';

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
  @Output() invoiceInfoProduct = new EventEmitter<{}>();

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
  billProduct: any
  temp: number = 1
  inventory: number = 0
  inventoryUnit: string = ''
  inventoryUnitID: any
  listInventory: any[] = []
  lastUnitPrice: number = 0
  totalPrice: number = 0


  ListgoodsIssueNote: goodsIssueNote[] = []
  ListProduct: product[] = []

  invoice$: Observable<any> | undefined

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private productService: ProductService,
    private store: Store<{}>
  ) { }

  ngOnInit(): void {

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

    this.billProduct = {
      productId: this.Product.id,
      goodsIssueNote: [{
        quantity: 0,
        unit: this.unitPriceID,
        batchId: this.listBatches[0].id
      }]
    }

    this.invoice$ = this.store.select(
      createSelector(counterSlice.selectFeature, (state) => state.invoice)
    )

    this.totalPrice = 0
    this.invoice$.subscribe((result) => {
      this.ListProduct = result.product
      for (let i = 0; i < result.product.length; i++) {
        const element = result.product[i];
        if (this.Product.id == element.productId) {
          this.ListgoodsIssueNote = element.goodsIssueNote
        }
      }
    })

    for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {
      const element = this.ListgoodsIssueNote[i];
      this.productService.getProductUnitbyUnitID(this.ListgoodsIssueNote[i].unit + '').subscribe((result) => {
        this.totalPrice += (element.quantity * result.data.price)
      })
    }

    console.log(this.ListProduct);
    console.log(this.ListgoodsIssueNote);
  }

  getProductGoodIssueNote(event: any) {
    this.totalPrice = 0
    for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {
      const element = this.ListgoodsIssueNote[i];
      this.productService.getProductUnitbyUnitID(this.ListgoodsIssueNote[i].unit + '').subscribe((result) => {
        this.totalPrice += (element.quantity * result.data.price)
        console.log(this.totalPrice);
      })
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
    let a = this.billProduct.goodsIssueNote.length + 1
    if (a <= this.listBatches.length) {
      this.billProduct.goodsIssueNote.push({
        quantity: 0,
        unit: this.unitPriceID,
        batchId: ''
      })
    }


    let checkExist = this.listBatches.filter((batch: any): any => {
      for (let i = 0; i < this.ListgoodsIssueNote.length; i++) {
        const element = this.ListgoodsIssueNote[i];
        return batch.id != element.batchId
      }
    })
    console.log(checkExist);

    this.ListgoodsIssueNote = [...this.ListgoodsIssueNote, {
      quantity: 1,
      unit: checkExist[0].currentQuantity[0].id,
      batchId: checkExist[this.ListgoodsIssueNote.length].id
    }]

    console.log(this.ListgoodsIssueNote);
    
    this.store.dispatch(counterSlice.addBatchesToProductinBill({
      productId: this.Product.id,
      listBatches: this.ListgoodsIssueNote
    }))

    // product

    console.log(this.ListgoodsIssueNote);


    // this.ListgoodsIssueNote.push({
    //   quantity: 1,
    //   unit: this.unitPriceID,
    //   batchId: this.selectedbatchesValue.id
    // })
    // this.store.dispatch(counterSlice.addBatchesToProductinBill({
    //   productId: this.Product.id,
    //   listBatches: this.ListgoodsIssueNote
    // }))

  }

  deleteConsignment(index: any) {
    this.billProduct.goodsIssueNote.splice(index, 1)
  }

  selectBatches() {
    console.log(this.selectedbatchesValue);
  }
}
