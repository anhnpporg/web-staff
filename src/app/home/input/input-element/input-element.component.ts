import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-input-element',
  templateUrl: './input-element.component.html',
  styleUrls: ['./input-element.component.css']
})
export class InputElementComponent implements OnInit {

  @Input() listInputProduct: any[] = []
  confirmModal?: NzModalRef;

  isVisible = false;
  isVisibleBatches = false;
  batche: any
  batchesList: any
  addBatchsList: any[] = [
    {
      barcode: '123123',
      quantity: 10
    },
    {
      barcode: '123123',
      quantity: 10
    },
    {
      barcode: '123123',
      quantity: 10
    }
  ]

  constructor(
    private modal: NzModalService
  ) { }
  ngOnInit(): void {
  }

  showModalBatches(): void {
    this.isVisibleBatches = true;
  }

  handleOkBatches(): void {
    console.log('Button ok clicked!');
    this.isVisibleBatches = false;
  }

  handleCancelBatches(): void {
    console.log('Button cancel clicked!');
    this.isVisibleBatches = false;
  }


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

  deleteSelectBatches(index: number) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Xóa lô đã chọn',
      nzContent: 'Bạn muốn xóa lô thuốc này',
      nzOnOk: () => {
        this.addBatchsList.splice(index, 1)
      }

    });
  }


}