import axios from 'axios';
import Config from 'react-native-config';
import {errorToast} from '../utils/alerts';
import {getState, getStore} from '../redux';
import {reset} from '../redux/auth/auth.reducer';

const defaultOptions = (tokenFromParams = '') => {
  const authState = getState()?.auth || {};
  const onboardingState = getState()?.onboarding || {};
  const token = !!tokenFromParams
    ? tokenFromParams
    : authState?.data?.token || '';
  const user = authState?.data || '';
  const language = onboardingState?.language || 'en';
  return {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      authorization: !!tokenFromParams
        ? tokenFromParams
        : authState?.isLoggedIn
        ? token
        : '',
      lan: language,
    },
  };
};

export const APIClient = (baseUrl = '', token = '') => {
  //   const t = useTranslation();
  const apiClient = axios.create({
    baseURL: !!baseUrl ? baseUrl : Config.API_URL,
    timeout: 10000,
    ...defaultOptions(token),
  });

  apiClient.interceptors.request.use(async config => {
    return config;
  });
  apiClient.interceptors.response.use(
    response => {
      return response;
    },
    async function (error) {
      if (
        error?.response?.data?.message !== 'canceled' &&
        error?.response?.data?.message !== undefined
      ) {
        errorToast(error?.response?.data?.message);
      }
      if (error?.response?.status === 401) {
        setTimeout(() => {
          getStore()?.dispatch(reset());
        }, 1000);
      }
      return Promise.reject(error);
    },
  );

  return apiClient;
};
