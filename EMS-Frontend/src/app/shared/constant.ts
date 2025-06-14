const API_ENDPOINTS = {
    serviceName_login: 'api/auth/login',
    serviceName_verify_email: 'api/auth/verify-email',
    serviceName_send_otp: 'api/auth/send-otp',
    serviceName_resend_otp: 'api/auth/resend-otp',
    serviceName_verify_otp: 'api/auth/verify-otp',
    serviceName_reset_password: 'api/auth/reset-password',
    serviceName_signup: 'authenticateUser/signup',
    serviceName_logout: 'authenticateUser/logout',
    serviceName_sidemenu: 'api/data/sidemenu',
    serviceName_create_dropdown: 'api/data/create-dropdown',
    serviceName_get_all_dropdowns: 'api/data/get-all-dropdowns',
    serviceName_get_dropdown: 'api/data/get-dropdown',
    serviceName_edit_dropdown: 'api/data/edit-dropdowns',
    serviceName_delete_dropdown: 'api/data/delete-dropdowns',
}

// Use regex for JavaScript ('\' is a escape charector hence use it twice)
const REGEX = {
    PASSWORD_REGEX: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
}

// Enums
enum ForgotPasswordSteps {
    VERIFY_EMAIL,
    SEND_OTP,
    VERIFY_OTP,
    RESET_PASSWORD
}

export {API_ENDPOINTS, REGEX, ForgotPasswordSteps}