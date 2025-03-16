const API_ENDPOINTS = {
    serviceName_login: 'api/auth/login',
    serviceName_signup: 'authenticateUser/signup',
    serviceName_logout: 'authenticateUser/logout'
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