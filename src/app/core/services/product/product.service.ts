import { DOMAIN, ACCESSTOKEN } from './../../utils/AppConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = localStorage.getItem(ACCESSTOKEN);
  headers: any;
  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'authorization': this.token!,
      'accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getRouteOfAdministrations(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/route-of-administrations', { headers: this.headers })
  }

  getUnitProduct(): Observable<any> {
    return this.httpClient.get(DOMAIN + 'product-management/units', { headers: this.headers })
  }

  getProductByID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/${id}`, { headers: this.headers })
  }

  getAllProduct(search: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `product-management/products/filter?searchValue=${search}&pageSize=5`, { headers: this.headers })
  }

  //invoice
  retailInvoice(data: any): Observable<any> {
    return this.httpClient.post(DOMAIN + 'invoice-management/invoices', data, { headers: this.headers })
  }

  //batches
  getBatchesByProductID(id: string): Observable<any> {
    return this.httpClient.get(DOMAIN + 'batch-management/products/13/batches', { headers: this.headers })
  }

  getProductByBatchBarcode(barcode: string): Observable<any> {
    return this.httpClient.get(DOMAIN + `batch-management/batches/filter?barcode=${barcode}`, { headers: this.headers })
  }
}
