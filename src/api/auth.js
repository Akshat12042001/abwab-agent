import {APIClient} from './client';
import Config from 'react-native-config';

const AUTH_ENDPOINTS = {
  LOGIN: '/agent/login',
  VERIFY_OTP: '/agent/verify-otp',
  FORGOT_PASSWORD: '/agent/forgot-password',
  CHANGE_PASSWORD: '/agent/change-password',
};

export const makeLoginRequest = data => {
  return APIClient()
    .post(AUTH_ENDPOINTS.LOGIN, data)
    .then(res => res.data);
};

export const makeVerifyOtpRequest = data => {
  return APIClient()
    .post(AUTH_ENDPOINTS.VERIFY_OTP, data)
    .then(res => res.data);
};

export const makeForgotPasswordRequest = data => {
  return APIClient()
    .post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data)
    .then(res => res.data);
};

export const makeChangePasswordRequest = (data, token) => {
  return APIClient('', token)
    .post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data)
    .then(res => res.data);
};

// export const makeUploadImageRequest = (data, token) => {
//   const newData = {
//     uri: data?.uri,
//     name: !!data?.fileName ? data?.fileName : data?.name,
//     type: data?.type,
//   };
//   const formData = new FormData();
//   formData.append('file', newData);
//   return fetch(`${Config.API_URL}${AUTH_ENDPOINTS.UPLOAD}`, {
//     method: 'POST',
//     body: formData,
//     headers: {
//       authorization: token,
//       lan: 'en',
//     },
//   }).then(res => res?.json());
// };
