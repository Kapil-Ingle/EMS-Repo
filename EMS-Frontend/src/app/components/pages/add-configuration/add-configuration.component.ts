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
    console.log('dialog data', this.data.data);

    if(this.data.data){
      this.patchForm();
    }
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
  
  submitData(){
    console.log(this.addDropdownForm);
    if(this.addDropdownForm.valid){
      const url = this.data.data ? API_ENDPOINTS.serviceName_edit_dropdown : API_ENDPOINTS.serviceName_create_dropdown;
      const requestData = this.data.data ? {...this.addDropdownForm.value, _id: this.data.data._id} : this.addDropdownForm.value;
      this.AuthService.authApiCall(url,requestData).subscribe((resp: any) => {
        console.log(`${url} Response : `, resp);
        this.commonService.openSnackBar(resp.message, 'success');
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

  patchForm(){
    this.addDropdownForm.patchValue({
      dropdownName: this.data.data.dropdownName,
      // dropdownValues: this.data.data.dropdownValues,
      description: this.data.data.description
    })

    const formArray = this.addDropdownForm.get('dropdownValues') as FormArray;
    formArray.clear();
    this.data.data.dropdownValues.forEach((value: string) => {
      formArray.push(this.fb.control(value, Validators.required));
    });
  }

}
