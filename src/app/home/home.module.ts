import { StoreModule } from '@ngrx/store';

import { RetailTemplateComponent } from './retail/retail-template/retail-template.component';
import { AntdModule } from './../core/antd/antd.module';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTemplateComponent } from './input/input-template/input-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RetailCustomerInBillComponent } from './retail/retail-customer-in-bill/retail-customer-in-bill.component';
import { RetailProductInBillComponent } from './retail/retail-product-in-bill/retail-product-in-bill.component';
import { ExampleBillComponent } from './retail/example-bill/example-bill.component';
import { NgxPrintModule } from 'ngx-print';
import { RetailBillTemplateComponent } from './retail/retail-bill-template/retail-bill-template.component';
import { InputElementComponent } from './input/input-element/input-element.component';
import { RetailSelectConsignmentOfProductInBillComponent } from './retail/retail-select-consignment-of-product-in-bill/retail-select-consignment-of-product-in-bill.component';
import { ProfileTemplateComponent } from './profile/profile-template/profile-template.component';
import { ProfileChagePasswordComponent } from './profile/profile-chage-password/profile-chage-password.component';
import { RetailBillTemplateProductComponent } from './retail/retail-bill-template-product/retail-bill-template-product.component';
import counterReducer, { name as counterFeatureKey } from "./../core/store/store.slice";

const homeRoute: Routes = [
  {
    path: 'home', component: HomeTemplateComponent, children: [
      { path: '', component: RetailTemplateComponent },
      { path: 'input', component: InputTemplateComponent },
      { path: 'profile', component: ProfileTemplateComponent }
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
    RetailBillTemplateComponent,
    InputElementComponent,
    RetailSelectConsignmentOfProductInBillComponent,
    ProfileTemplateComponent,
    ProfileChagePasswordComponent,
    RetailBillTemplateProductComponent,

  ],
  imports: [
    NgxPrintModule,
    CommonModule,
    RouterModule.forRoot(homeRoute),
    AntdModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(counterFeatureKey, counterReducer)
  ]
})
export class HomeModule { }
