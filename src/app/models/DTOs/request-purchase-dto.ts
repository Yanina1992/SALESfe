import { Product } from "../product";

export class RequestPurchaseDto {
  cartProducts: Product[] = [];
  totalAmount: number = 0;
}
