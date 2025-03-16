import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS, ForgotPasswordSteps, REGEX } from '../../../shared/constant';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;
  // private _snackBar = inject(MatSnackBar);
  ForgotPasswordSteps = ForgotPasswordSteps;
  currentStep : ForgotPasswordSteps = ForgotPasswordSteps.VERIFY_EMAIL;

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
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
      // password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD_REGEX)]]
      otp: [{ value: '', disabled: true }, [Validators.required]],
      newPassword: [{ value: '', disabled: true }, [Validators.required]],
      confirmPassword: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  onForgotPasswordSubmit(){
    // this.forgotPasswordForm.controls['otp'].enable();
    switch (this.currentStep) {
      case ForgotPasswordSteps.VERIFY_EMAIL:
        this.verfyEmail();
        break;
      case ForgotPasswordSteps.SEND_OTP:
        this.sendOtp();
        break;
      case ForgotPasswordSteps.VERIFY_OTP:
        this.verifyOtp();
        break;
      case ForgotPasswordSteps.RESET_PASSWORD:
        this.resetOtp();
        break;
    
    }
    
  }

  verfyEmail(){
    this.currentStep = ForgotPasswordSteps.SEND_OTP;
  }
  
  sendOtp(){
    this.currentStep = ForgotPasswordSteps.VERIFY_OTP;
    this.forgotPasswordForm.get('otp')?.enable();
  }
  
  verifyOtp(){
    this.currentStep = ForgotPasswordSteps.RESET_PASSWORD;
    this.forgotPasswordForm.get('newPassword')?.enable();
    this.forgotPasswordForm.get('confirmPassword')?.enable();
  }

  resetOtp(){
    this.router.navigateByUrl('/login');
  }

  onCancel(){
    this.router.navigateByUrl('/login');
  }

  
  
}
