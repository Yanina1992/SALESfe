import { Injectable } from '@angular/core';
import { RequestPurchaseDto } from '../models/DTOs/request-purchase-dto';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  requestPurchase?: RequestPurchaseDto;

  constructor() { }

  cartAmount(request: Product[]){

    request.forEach((el) =>{
      el.totalPrice = el.quantity.valueOf() * el.itemPrice.valueOf()

      this.requestPurchase?.cartProducts.push(el)
    })
  }

}
