import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../core/services/product/product.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-batch-tag-infomation',
  templateUrl: './batch-tag-infomation.component.html',
  styleUrls: ['./batch-tag-infomation.component.css']
})
export class BatchTagInfomationComponent implements OnInit {

  @Input() batchInfo: any

  fullInfomationOfBatch: any


  constructor(
    private productService: ProductService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {

    if (this.batchInfo.batchId != null) {
      this.productService.getBatchById(this.batchInfo.batchId).subscribe((result) => {
        console.log(result.data)
        this.fullInfomationOfBatch = result.data
      }, err => {
        this.notification.create(
          'error',
          err.error.message,
          ''
        )
      })
    }

  }

}
