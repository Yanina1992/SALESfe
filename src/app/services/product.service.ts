import { environment } from './../environments/environment.development';
import { Injectable } from '@angular/core';
import { SvcService } from './svc.service';
import { Observable } from 'rxjs';
import { ResponseProductDto } from '../models/DTOs/response-product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private svc: SvcService) { }

  productUrl: string = environment.productEndPoint;

  getProducts(): Observable<ResponseProductDto[]>{
      let response = this.svc.get<ResponseProductDto[]>(`${this.productUrl}/GetProducts`)
      return response;
  }

}
