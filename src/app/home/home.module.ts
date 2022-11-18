import { StoreModule } from '@ngrx/store';

import { RetailTemplateComponent } from './retail/retail-template/retail-template.component';
import { AntdModule } from './../core/antd/antd.module';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTemplateComponent } from './input/input-template/input-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPrintModule } from 'ngx-print';
import { InputElementComponent } from './input/input-element/input-element.component';
import { ProfileTemplateComponent } from './profile/profile-template/profile-template.component';
import { ProfileChagePasswordComponent } from './profile/profile-chage-password/profile-chage-password.component';
import counterReducer, { name as counterFeatureKey } from "./../core/store/store.slice";
import { InputInfoSupplierComponent } from './input/input-info-supplier/input-info-supplier.component';
import { RetailProductInBillComponent } from './retail/retail-product-in-bill/retail-product-in-bill.component';
import { RetailProductInBillBatchComponent } from './retail/retail-product-in-bill/retail-product-in-bill-batch/retail-product-in-bill-batch.component';

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
    InputElementComponent,
    ProfileTemplateComponent,
    ProfileChagePasswordComponent,
    InputInfoSupplierComponent,
    RetailProductInBillComponent,
    RetailProductInBillBatchComponent,

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
