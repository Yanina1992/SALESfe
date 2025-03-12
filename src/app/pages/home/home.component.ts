import { InternalService } from './../../services/internal.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { catchError, of } from 'rxjs';
import { MatCardModule}  from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';
import { RequestProductDto } from '../../models/DTOs/request-product-dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  //requestToSend: RequestProductDto[] = [];
  requestToSend: Product[] = [];
  //request: RequestProductDto = new RequestProductDto;
  request: Product = new Product;

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
        console.log(this.products)

      }
    })

  }

  addOneProduct(product: Product){

    if(this.requestToSend.length > 0){

      this.requestToSend.forEach((el) => {
      if(el.productId == product.productId){
        el.quantity.valueOf() + 1
      }else{
        this.request.productId = product.productId;
        this.request.quantity.valueOf() + 1

        this.requestToSend.push(this.request)
      }
      })

    }else{
      this.request.productId = product.productId;
      this.request.quantity = this.request.quantity.valueOf() + 1;

      this.requestToSend.push(this.request)
    }

  }

  removeOneProduct(product: Product){

    if(this.requestToSend.length > 0){

      this.requestToSend.forEach((el) => {
        if(el.productId == product.productId){
          el.quantity.valueOf() - 1;
        }else{
          this.request.productId = product.productId;
          this.request.quantity = this.request.quantity.valueOf() - 1;

          this.requestToSend.push(this.request)
        }
      })

    }else{
          this.request.productId = product.productId;
          this.request.quantity = this.request.quantity.valueOf() - 1;

          this.requestToSend.push(this.request)
        }

  }

  addProductsToCart(product: Product){

    this.request.productId = product.productId;
    this.requestToSend.push(this.request)

    this.internalService.cartAmount(this.requestToSend)
  }

}
