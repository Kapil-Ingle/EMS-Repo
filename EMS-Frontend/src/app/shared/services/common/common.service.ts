import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../widget/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  expandSidenav =  signal<boolean>(true)

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, type: 'success' | 'error') {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {message, type},
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'sucess-snackbar' : 'error-snackbar'
    })
  }

  toggleSidenav(){

  }
  
}
