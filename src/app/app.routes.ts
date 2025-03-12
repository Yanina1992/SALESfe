import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '**',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart' }
  }
];
