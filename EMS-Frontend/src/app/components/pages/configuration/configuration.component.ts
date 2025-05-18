import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { AddConfigurationComponent } from '../add-configuration/add-configuration.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  constructor(
    private dialog: MatDialog
  ){}

  openDialog() {
    const dialogRef = this.dialog.open(AddConfigurationComponent, {width: '600', disableClose: true, data: {}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
