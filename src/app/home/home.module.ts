import { RetailTemplateComponent } from './retail/retail-template/retail-template.component';
import { AntdModule } from './../core/antd/antd.module';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTemplateComponent } from './input/input-template/input-template.component';
import { FormsModule } from '@angular/forms';
import { RetailCustomerInBillComponent } from './retail/retail-customer-in-bill/retail-customer-in-bill.component';
import { RetailProductInBillComponent } from './retail/retail-product-in-bill/retail-product-in-bill.component';
import { ExampleBillComponent } from './retail/example-bill/example-bill.component';
import { NgxPrintModule } from 'ngx-print';
import { RetailBillTemplateComponent } from './retail/retail-bill-template/retail-bill-template.component';

const homeRoute: Routes = [
  {
    path: 'home', component: HomeTemplateComponent, children: [
      { path: '', component: RetailTemplateComponent },
      { path: 'input', component: InputTemplateComponent }
    ]
  }
]


@NgModule({
  declarations: [
    HomeTemplateComponent,
    RetailTemplateComponent,
    InputTemplateComponent,
    RetailCustomerInBillComponent,
    RetailProductInBillComponent,
    ExampleBillComponent,
    RetailBillTemplateComponent
  ],
  imports: [
    NgxPrintModule,
    CommonModule,
    RouterModule.forRoot(homeRoute),
    AntdModule,
    FormsModule,

  ]
})
export class HomeModule { }
