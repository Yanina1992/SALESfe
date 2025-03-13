import { InternalService } from './../../services/internal.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { catchError, of } from 'rxjs';
import { MatCardModule}  from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  static requestToSend: Product[] = [];

  constructor(private productService: ProductService, private internalService: InternalService){}

  ngOnInit(): void {

    this.productService.getProducts()
    .pipe(
      catchError((error) => {
        console.log(error)
        return of (null);
      })
    )
    .subscribe((data: any) => {
      if (data) {
        this.products = data;
      }
    })

  }

  addProductsToCart(product: Product){

    let itemAlreadyExist = false;

    if(HomeComponent.requestToSend.length > 0){

       HomeComponent.requestToSend.forEach((el) => {
        if(el.productId == product.productId){
        itemAlreadyExist = true;

        if(Number.isNaN(el.quantity) || el.quantity == 0 || el.quantity == undefined){
          el.quantity = 1;
        }else{
          if(product.quantity){
            el.quantity += product.quantity
          } else {
            el.quantity += 1;
          }
        }

        }
       })


       if(!itemAlreadyExist){
        let request: Product = new Product;
        request.productId = product.productId;
        if(product.quantity){
          request.quantity = product.quantity + 1;
        }else{
          request.quantity = 1;
        }

        request.name = product.name;
        request.itemPrice = product.itemPrice;
        request.isExempt = product.isExempt;
        request.isExported = product.isExported;

        HomeComponent.requestToSend.push(request)
        }


    }else{
      let request: Product = new Product;
      request.productId = product.productId;

      if(product.quantity){
        request.quantity = product.quantity;
      }else{
        request.quantity = 1;
      }

      request.name = product.name;
      request.itemPrice = product.itemPrice;
      request.isExempt = product.isExempt;
      request.isExported = product.isExported;

      HomeComponent.requestToSend.push(request)
    }

    this.internalService.cartAmount(HomeComponent.requestToSend)
  }

}
