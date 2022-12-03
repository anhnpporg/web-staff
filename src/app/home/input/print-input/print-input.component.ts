import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-input',
  templateUrl: './print-input.component.html',
  styleUrls: ['./print-input.component.css']
})
export class PrintInputComponent implements OnInit {

  @Input() listInputID: any[] = []

  listInputInfo: any[] = []

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    console.log(this.listInputID);
    
    if (this.listInputID) {
      this.listInputID.forEach((item) => {
        this.productService.getGoodsReceiptNoteById(item.grnId).subscribe((result) => {
          this.listInputInfo.push(result.data)
          console.log(this.listInputInfo);
          
        }), (err: any) => {
          this.notification.create(
            'error',
            err.error.message,
            ''
          )
        }
      })

    }
  }

}


