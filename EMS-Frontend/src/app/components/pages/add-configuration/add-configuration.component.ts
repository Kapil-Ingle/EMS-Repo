import { Component, Inject,  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-configuration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-configuration.component.html',
  styleUrl: './add-configuration.component.scss'
})
export class AddConfigurationComponent {

  constructor(
    private dialogRef: MatDialogRef<AddConfigurationComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ){}

  close(){
    this.dialogRef.close();
  }

}
