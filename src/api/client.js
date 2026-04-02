import axios from 'axios';
import Config from 'react-native-config';
import {errorToast} from '../utils/alerts';
import {getState, getStore} from '../redux';
import {reset} from '../redux/auth/auth.reducer';

const normalizeToken = value =>
  String(value || '')
    .trim()
    .replace(/^bearer\s+/i, '')
    .trim();

const defaultOptions = (tokenFromParams = '') => {
  const authState = getState()?.auth || {};
  const onboardingState = getState()?.onboarding || {};

  const token =
    tokenFromParams ||
    authState?.userData?.token ||
    authState?.data?.token ||
    '';
  const normalizedToken = normalizeToken(token);

  const language = onboardingState?.language || 'en';

  console.log('🔥 TOKEN:', normalizedToken);

  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: normalizedToken || '',
      Authorization: normalizedToken ? `Bearer ${normalizedToken}` : '',
      token: normalizedToken || '',
      access_token: normalizedToken || '',
      lan: language,
    },
  };
};

export const APIClient = (baseUrl = '', token = '') => {
  const apiClient = axios.create({
    baseURL: baseUrl || Config.API_URL,
    timeout: 10000,
    ...defaultOptions(token),
  });

  // 🔍 DEBUG
  apiClient.interceptors.request.use(config => {
    console.log('🚀 URL:', config.baseURL + config.url);
    console.log('📦 BODY:', config.data);
    console.log('🔐 TOKEN:', config.headers.authorization);
    return config;
  });

  apiClient.interceptors.response.use(
    response => response,
    error => {
      if (
        error?.response?.data?.message &&
        error?.response?.data?.message !== 'canceled'
      ) {
        errorToast(error.response.data.message);
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