import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from './../../../core/utils/App.interface';
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

  constructor(
    private modal: NzModalService,
    private notification: NzNotificationService,
    private productService: ProductService
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

  }

  getProductGoodIssueNote(event: any) {

    var check = true
    if (this.billProduct.goodsIssueNote[event.index].batchId == '') {
      this.billProduct.goodsIssueNote.forEach((element: any) => {
        if (element.batchId == event.info.batchId) {
          check = false
          this.notification.create(
            'error',
            'Lô thuốc này đã được chọn',
            'Bạn vui lòng chọn lô thuốc khác'
          );
        }
      });
      if (check) {
        this.billProduct.goodsIssueNote[event.index].batchId = event.info.batchId
      }
    }
    if (this.billProduct.goodsIssueNote[event.index].batchId == event.info.batchId && this.billProduct.goodsIssueNote[event.index].unit == event.info.unit) {
      this.billProduct.goodsIssueNote[event.index].quantity = event.info.quantity
    } else if (this.billProduct.goodsIssueNote[event.index].batchId == event.info.batchId && this.billProduct.goodsIssueNote[event.index].unit != event.info.unit) {
      this.billProduct.goodsIssueNote[event.index].quantity = event.info.quantity
      this.billProduct.goodsIssueNote[event.index].unit = event.info.unit
    }
    this.invoiceInfoProduct.emit(this.billProduct)
    // console.log(this.billProduct);


    this.billProduct.goodsIssueNote.forEach((element: any) => {
      this.totalPrice = 0 
      // console.log(element);
      
      this.productService.getProductUnitbyUnitID(element.unit).subscribe((result) => {
        // console.log(result);
        
        this.totalPrice += result.price * element.quantity
        // console.log(this.totalPrice);
        
      })
    });
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
  }

  deleteConsignment(index: any) {
    this.billProduct.goodsIssueNote.splice(index, 1)
  }

  selectBatches() {
    console.log(this.selectedbatchesValue);
  }
}
