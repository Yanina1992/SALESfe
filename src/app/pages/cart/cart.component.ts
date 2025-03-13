import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InternalService } from '../../services/internal.service';
import { Product } from '../../models/product';
import { RequestPurchaseDto } from '../../models/DTOs/request-purchase-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartProducts: Product[] = [];
  purchase: RequestPurchaseDto = new RequestPurchaseDto;

  constructor(
    private internalService: InternalService,
    @Optional() public dialogRef: MatDialogRef<CartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ){}

  ngOnInit(): void {

    if(this.internalService.requestPurchase)
    {
      this.cartProducts = this.internalService.requestPurchase
    }
  }

  completePurchase(){

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
