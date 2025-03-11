import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService){}

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
        console.log(data)
      }
    })

  }

}
