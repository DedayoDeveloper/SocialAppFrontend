export function SAVE_TOKEN_USER_DETAILS(value, user) {
    localStorage.setItem('token', value);
    localStorage.setItem('userData', JSON.stringify(user));
}

export function SET_OTP(value) {
    localStorage.setItem('confirmOTP', value);
}

export function SET_OTP_USER_DETAILS(value) {
    localStorage.setItem('userDetailsOTP', value);
}

export function GET_TOKEN() {
    return localStorage.getItem('token');
}
export function GET_USER() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function UPDATE_USER_DATA(user){
    localStorage.setItem('userData', JSON.stringify(user));
}