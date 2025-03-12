import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private overlay: Overlay) { }

  openDialog(component:ComponentType<any>): MatDialogRef<any, any> {

    let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.width = '70%';
      dialogConfig.height = '80%';
      dialogConfig.panelClass = 'custom-dialog-container';
      dialogConfig.maxHeight = '100%';
      dialogConfig.maxWidth = '90%';
      dialogConfig.hasBackdrop = true;
      dialogConfig.disableClose = false;
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
      dialogConfig.restoreFocus = true;

      const dialog = this.dialog.open(component, dialogConfig);

      return dialog;
  }
}
