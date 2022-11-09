import { UserService } from './../../../core/services/user/user.service';
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
  staffProfile: any
  customerInfo: any
  time = Date.now()

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.staffProfile = JSON.parse(localStorage.getItem(PROFILE) || '{}')
  }


  clickPrintBill() {
    console.log(this.printBill);
    
    if (this.printBill) {
      this.userService.getCustomerByID(this.printBill.customerId).subscribe((result) => {
        this.customerInfo = result
        console.log(this.customerInfo);
      })
    }
  }

}
