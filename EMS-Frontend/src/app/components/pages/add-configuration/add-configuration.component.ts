import { Component, Inject,  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-configuration',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './add-configuration.component.html',
  styleUrl: './add-configuration.component.scss'
})
export class AddConfigurationComponent {

  constructor(
    private dialogRef: MatDialogRef<AddConfigurationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ){}

  addDropdownForm!: FormGroup;

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.addDropdownForm = this.fb.group({
      dorpdownName: ['', Validators.required],
      dropdownValues: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      description: ['']
    })
  }

  get dropdownValues(): FormArray {
  return this.addDropdownForm.get('dropdownValues') as FormArray;
}

  close(){
    this.dialogRef.close();
  }
  
  SubmitData(){
    console.log(this.addDropdownForm);
    this.dialogRef.close();

  }

  addDropdownValue(){
    const value = this.fb.control('', Validators.required)
    this.dropdownValues.push(value);
  }

  removeDropdownValue(idx: number){
    this.dropdownValues.removeAt(idx);
  }

}
