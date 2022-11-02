import { ProductService } from './../../../core/services/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-template',
  templateUrl: './input-template.component.html',
  styleUrls: ['./input-template.component.css']
})
export class InputTemplateComponent implements OnInit {

  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
  }

  inputValue: any
  options: any[] = [];
  listProductInput: any[] = []

  onInput(): void {
    this.product.getAllProduct(this.inputValue).subscribe((result) => {
      this.options = result.items
    })
  }

  onSelect(event: any, value: any) {
    if (event.isUserInput == true) {
      this.listProductInput.push(value)
    }
  }
}
