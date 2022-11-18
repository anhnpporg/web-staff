import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ProductService} from 'src/app/core/services/product/product.service';
import * as counterSlice from "../../../../core/store/store.slice";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: '[app-retail-product-in-bill-batch]',
  templateUrl: './retail-product-in-bill-batch.component.html',
  styleUrls: ['./retail-product-in-bill-batch.component.css']
})
export class RetailProductInBillBatchComponent implements OnInit {

  @Input() batch: any
  confirmModal?: NzModalRef;
  goodissue_note: any


  listUnitProductPrice: any;
  batchInfo: any

  constructor(
    private productService: ProductService,
    private store: Store<{}>,
    private modal: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.goodissue_note = this.batch
    console.log(this.goodissue_note)

    // this.productService.getBatchByBatchID(this.batch.batchId).subscribe(batch => {
    //   console.log(batch.data);
    //   this.listUnitProductPrice = batch.data.currentQuantity
    //   this.batchInfo = batch.data
    // })


  }


  deleteconsignment() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () => {
        this.store.dispatch(counterSlice.deleteBacthProductInBill(this.batchInfo))
      }
    });
  }
}
