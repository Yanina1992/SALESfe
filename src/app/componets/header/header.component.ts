import { InternalService } from './../../services/internal.service';
import { CartComponent } from './../../pages/cart/cart.component';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogService } from '../../services/dialog.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private dialogService: DialogService, private internalService: InternalService) {}

  totalItems = 0;

  ngOnInit(): void {
    this.internalService.getTotalCount().subscribe(count => {
    this.totalItems = count;
    });
  }



  openCart(){
    const dialog = this.dialogService.openDialog(CartComponent)
  }



}
