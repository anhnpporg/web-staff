import { ProductService } from './../../../core/services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-bill-template-product',
  templateUrl: './retail-bill-template-product.component.html',
  styleUrls: ['./retail-bill-template-product.component.css']
})
export class RetailBillTemplateProductComponent implements OnInit {

  @Input() productInBill: any
  listgoodsIssueNote: any[] = []
  productInfo: any

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.productInBill);
    if (this.productInBill) {
      console.log('ok rồi nha');
      this.productService.getProductByID(this.productInBill.productId).subscribe((result) => {
        this.productInfo = result
        console.log(this.productInfo);
      })
      this.productInBill.goodsIssueNote.forEach((element: any) => {
        this.productService.getProductUnitbyUnitID(element.unit).subscribe((result) => {
          this.productService.getBatchByBatchID(element.batchId).subscribe((resultBatch) => {
            this.listgoodsIssueNote.push({
              quantity: element.quantity,
              batches: resultBatch,
              unit: result
            })
          })
        })
      });
      console.log(this.listgoodsIssueNote);
    }

  }




}
