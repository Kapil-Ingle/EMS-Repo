import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS, REGEX } from '../../../shared/constant';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  Lhide = signal(true);
  Rhide1 = signal(true);
  Rhide2 = signal(true);

  loginForm!: FormGroup;
  // private _snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private commonService: CommonService,
  ){}
  
  ngOnInit(){
    this.buildForm();
  }
  
  buildForm(){
    // Login form
    this.loginForm = this.fb.group({
      email: ['codingkapil@gmail.com', Validators.required],
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD_REGEX)]]
      password: ['Kapil@1996', [Validators.required]]
    });
  }

  onLogin(){
    console.log(this.loginForm);
    if(this.loginForm.valid){
      this.AuthService.authApiCall(API_ENDPOINTS.serviceName_login, this.loginForm.value).subscribe((resp: any) => {
        console.log(`${API_ENDPOINTS.serviceName_login} Response : `, resp);
        sessionStorage.setItem('authToken', resp?.token);
        sessionStorage.setItem('userData', JSON.stringify(resp?.data.user));
        this.commonService.openSnackBar('Login Successful', 'success');
        this.router.navigateByUrl('dashboard');
      }, (error) => {
        console.log(error.error);
        
        this.commonService.openSnackBar(error.error.message, 'error');
        
        // this.commonService.openSnackbar(`Error in ${API_ENDPOINTS.serviceName_login}`, 'close', 'red');
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
    
  }

  onForgotPasswordClick(){
    this.router.navigateByUrl('/forgot-password');
  }
  
}
