import { environment } from './../environments/environment.development';
import { Injectable } from '@angular/core';
import { SvcService } from './svc.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private svc: SvcService) { }

  productUrl: string = environment.productsEndPoint;

  getProducts(): Observable<Product[]>{
      let response = this.svc.get<Product[]>(`${this.productUrl}/GetProducts`)
      return response;
  }

}
