import { Component, Inject,  } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/api/auth.service';
import { API_ENDPOINTS } from '../../../shared/constant';
import { CommonService } from '../../../shared/services/common/common.service';

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
    private fb: FormBuilder,
    private AuthService: AuthService,
    private commonService: CommonService,
  ){}

  addDropdownForm!: FormGroup;

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.addDropdownForm = this.fb.group({
      dropdownName: ['', Validators.required],
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
    if(this.addDropdownForm.valid){
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_create_dropdown,this.addDropdownForm.value).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_create_dropdown} Response : `, resp);
        this.commonService.openSnackBar('Dropdown Fetched Successful', 'success');
      })
      this.dialogRef.close();
    }

  }

  addDropdownValue(){
    const value = this.fb.control('', Validators.required)
    this.dropdownValues.push(value);
  }

  removeDropdownValue(idx: number){
    this.dropdownValues.removeAt(idx);
  }

}
