import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchPassword : ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    let match = password && confirmPassword && password?.value != confirmPassword?.value

    return match ? {passwordMatchError : true} : null
}