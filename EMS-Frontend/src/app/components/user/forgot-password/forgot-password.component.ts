import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../../../shared/services/api/auth.service';
import { Router } from '@angular/router';
import { API_ENDPOINTS, ForgotPasswordSteps, REGEX } from '../../../shared/constant';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
// import { matchPassword } from '../../shared/validators/matchPassword.validator';
import { CommonService } from '../../../shared/services/common/common.service';
import { error } from 'node:console';
import { interval, Subscription } from 'rxjs';

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
  countDown = 2;
  countDownSubscription!: Subscription;
  resendOtpDisabled: boolean = false;

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

  startResendOtpCountDown(){
    this.resendOtpDisabled = true;
    this.countDown = 20;
    if(this.countDownSubscription){
      this.countDownSubscription.unsubscribe();
    }

    this.countDownSubscription = interval(1000).subscribe(() => {
      if(this.countDown > 0){
        this.countDown--;
      }else{
        this.resendOtpDisabled = false;
        this.countDownSubscription.unsubscribe();
      }
    })
    
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
        this.resetPassword();
        break;
    
    }
    
  }

  verfyEmail(){
    console.log(this.forgotPasswordForm);
    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_verify_email, this.forgotPasswordForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.commonService.openSnackBar(resp.message, 'success');
      
      this.currentStep = ForgotPasswordSteps.SEND_OTP;
    }, (error) => {
      this.commonService.openSnackBar(error.error.message, 'error');
    })
  }
  
  sendOtp(){
    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_send_otp, this.forgotPasswordForm.value).subscribe((resp: any) => {
      console.log(resp);
      this.commonService.openSnackBar(resp.message, 'success');
      this.currentStep = ForgotPasswordSteps.VERIFY_OTP;
      this.forgotPasswordForm.get('otp')?.enable();
      this.startResendOtpCountDown();
    }, (error) => {
      this.commonService.openSnackBar(error.error.message, 'error')
    })
  }
  
  resendOtp(){
    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_resend_otp, this.forgotPasswordForm.value).subscribe((resp: any) => {
      this.commonService.openSnackBar(resp.message, 'success');
      
      this.startResendOtpCountDown();
    }, (error) => {
      this.commonService.openSnackBar(error.error.message, 'error');
    })
  }
  
  verifyOtp(){
    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_verify_otp, this.forgotPasswordForm.value).subscribe((resp: any) => {
      this.commonService.openSnackBar(resp.message, 'success');
      this.currentStep = ForgotPasswordSteps.RESET_PASSWORD;
      this.forgotPasswordForm.get('newPassword')?.enable();
      this.forgotPasswordForm.get('confirmPassword')?.enable();
    }, (error) => {
      this.commonService.openSnackBar(error.error.message, 'error');
    })
  }

  resetPassword(){
    this.AuthService.authApiCall(API_ENDPOINTS.serviceName_reset_password, this.forgotPasswordForm.value).subscribe((resp: any) => {
      this.commonService.openSnackBar(resp.message, 'success');
      this.router.navigateByUrl('/login');
    }, (error) => {
      this.commonService.openSnackBar(error.error.message, 'error')
    })
  }

  onCancel(){
    this.router.navigateByUrl('/login');
  }

  
  
}
