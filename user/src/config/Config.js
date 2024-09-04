import bannerimage from '../assets/images/date.jpg';
import loginBg from '../assets/images/date2.jpg';
import signUpBg from '../assets/images/date2.jpg';
import welcomeBg from '../assets/images/bg1.jpg';
import busIcon from '../assets/images/busicon.svg';
import payIcon from '../assets/images/mastercard.svg';
import profileIcon from '../assets/images/user-img.png';
import applogo from '../assets/images/logo-ptv-trans.png';
import findIcon from '../assets/images/location.png';
import updateProfileIcon from '../assets/images/refresh.png';
import downloadMobileIcon from '../assets/images/smartphone.png';
import otpicon from '../assets/images/otp3.jpg';
import verify from '../assets/images/verified.png';
import error from '../assets/images/erroricon.png';
import searchvector from '../assets/images/searchvector.jpg';
import nothingfound from '../assets/images/nothingfound.png';


export const BannerImage = bannerimage;
export const LoginBg = loginBg
export const SignUpBg = signUpBg;
export const BusIcon = busIcon;
export const WelcomeBg = welcomeBg;
export const currency = "₦";
export const ProfileIcon = profileIcon;
export const Applogo = applogo;
export const FindIcon = findIcon;
export const UpdateProfileIcon = updateProfileIcon;
export const DownloadMobileIcon = downloadMobileIcon;
export const PayIcon = payIcon;
export const OTPIcon = otpicon;
export const VerifyIcon = verify;
export const ErrorIcon = error;
export const Searchvector = searchvector;
export const NothingFound = nothingfound;


//export const BASE_URL = 'http://134.122.15.90:5050/';
export const BASE_URL = 'http://localhost:5050/';

export const ApiEndpoints = {
    
    USER_LOGIN: 'authenticate',
    USER_REGISTER: 'createUser',
    GET_ESCORT_CATEGORIES: 'listallcategory',
    UPDATE_PAYMENT_STATUS: userId => `update/registration/payment/${userId}`,
    FETCH_ESCORTS: 'EscortList/WithCategory',
    // FETCH_SINGLE_ESCORT: id => `get/escort/details/${id}`,
    FETCH_SINGLE_ESCORT: 'confirm/paymentdetails/for/escort',
    GET_CATEGORY_DETAILS: 'get/category/details',
    UPDATE_USER_ESCORT_PAYMENT: 'update/escort/payment',
    FIND_TRIP: 'findtrips',
    GET_TRIP_DETAILS: 'getTripDetailsUsingId',
    FETCH_USER_TRIP : 'getBookedTripsByPhonenumber',
    FETCH_USER_PROFILE: 'getUserProfile',
    UPDATE_PROFILE:'updateprofile',
    
    GET_PRODUCT_DETAILS: productId => `product/${productId}/getproductbyid/review`,
    
};

export const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'kano', label: 'Kano' },
    { value: 'benin', label: 'Benin' },
  ];