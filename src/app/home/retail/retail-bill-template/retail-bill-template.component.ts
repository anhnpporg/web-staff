import { PROFILE } from './../../../core/utils/AppConfig';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retail-bill-template',
  templateUrl: './retail-bill-template.component.html',
  styleUrls: ['./retail-bill-template.component.css']
})
export class RetailBillTemplateComponent implements OnInit {

  @Input() listProductInBill: any[] = []
  @Input() printBill: any
  // staffName = 

  constructor() { }

  ngOnInit(): void {
    // console.log(this.printBill);
    // console.log(localStorage.getItem(PROFILE));
    

  }

}
