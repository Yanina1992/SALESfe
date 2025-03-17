export class Product {
  productId!: number;
  quantity: number = 0;
  name!: string;
  itemPrice: number = 0;
  totalPrice: number = 0;
  isExempt!: boolean;
  isImported!: boolean;
}
