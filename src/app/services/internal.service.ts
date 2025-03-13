import { Injectable } from '@angular/core';
import { RequestPurchaseDto } from '../models/DTOs/request-purchase-dto';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  requestPurchase: Product[] = []
  totalCount:Subject<number> = new Subject<number>();

  constructor() { }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  cartAmount(request: Product[]){

    let sum: number = 0;
    let idCheck: number = 0;

    request.forEach((el) =>{
      el.totalPrice = el.quantity.valueOf() * el.itemPrice.valueOf()
      sum += el.quantity.valueOf()

      if(el.quantity == 1){
        idCheck = el.productId
      }

      this.totalCount.next(sum);
    })

    this.requestPurchase = [];

    request.forEach((el) => {
      let product = new Product();
      product.productId = el.productId;
      product.quantity = el.quantity;
      product.name = el.name;
      product.itemPrice = el.itemPrice;
      product.isExported = el.isExported;
      product.isExempt = el.isExempt;
      product.totalPrice = el.totalPrice;

      this.requestPurchase.push(product);
    });

    console.log(this.requestPurchase);
  }

  getTotalCount(): Observable<number> {
    return this.totalCount.asObservable();
  }

}
