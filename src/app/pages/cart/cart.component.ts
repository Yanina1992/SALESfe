import { RequestPurchaseDto } from './../../models/DTOs/request-purchase-dto';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InternalService } from '../../services/internal.service';
import { Product } from '../../models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PurchaseService } from '../../services/purchase.service';
import { catchError, of } from 'rxjs';
import { ResponsePurchaseDto } from '../../models/DTOs/response-purchase-dto';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartProducts: Product[] = [];
  totalAmount: number = 0;

  responsePurchase = '';
  responseReceipt:ResponsePurchaseDto | undefined = undefined;

  constructor(
    private internalService: InternalService,
    private purchaseService: PurchaseService,
    @Optional() public dialogRef: MatDialogRef<CartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {

    if(this.internalService.requestPurchase)
    {
      this.cartProducts = this.internalService.requestPurchase

      this.cartProducts.forEach((el) => {
        this.totalAmount += el.totalPrice
      })
    }
  }

  completePurchase(){

    let requestPurchase = new RequestPurchaseDto();

    requestPurchase.cartProducts = this.cartProducts;
    requestPurchase.totalAmount = this.totalAmount;

    this.purchaseService.insertPurchase(requestPurchase)
    .pipe(catchError((error) => {
      console.log(error)
      return of(null);
      })
    )
    .subscribe((response) => {
      if (response && response.message) {
        this.responsePurchase = response.message;
      }
    })

  }

  getReceipt(){

    //let responseReceipt = new ResponsePurchaseDto();

    this.purchaseService.getPurchase()
    .pipe(catchError((error) => {
      console.log(error)
      return of(null);
      })
    )
    .subscribe((response) => {
      if (response) {
        this.responseReceipt = response
        console.log(this.responseReceipt)
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
