import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { AntdModule } from './core/antd/antd.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: '', loadChildren: () => LoginModule },
  { path: 'home', loadChildren: () => HomeModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AntdModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
