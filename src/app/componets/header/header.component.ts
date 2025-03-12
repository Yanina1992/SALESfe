import { CartComponent } from './../../pages/cart/cart.component';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private dialogService: DialogService,) {}

  openCart(){
    const dialog = this.dialogService.openDialog(CartComponent)
  }

}
