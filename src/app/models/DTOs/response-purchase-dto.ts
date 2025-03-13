import { Product } from "../product";

export class ResponsePurchaseDto {
  purchaseId!: number;
  products: Product[] = [];
  salesTaxes: number = 0;
  total: number = 0;
}
