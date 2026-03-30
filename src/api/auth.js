import Config from 'react-native-config';
import {APIClient} from './client';

const AUTH_ENDPOINTS = {
  LOGIN: '/agent/login',
  VERIFY_OTP: '/agent/verify-otp',
  FORGOT_PASSWORD: '/agent/forgot-password',
  CHANGE_PASSWORD: '/agent/change-password',
  RESEND_OTP: '/resend-otp',
  UPLOAD: '/upload',
  REQUEST_VIEWING_LISTING: '/request-viewing/listing',
  REQUEST_VIEWING_ACTION: '/request-viewing/action',
  REQUEST_VIEWING_FEEDBACK: '/request-viewing/feedback',
  AGENT_PROFILE: '/agent',
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



export const makeChangePasswordRequest = (data = {}, tokenOverride = '') => {
  const password = data?.password ?? data?.newPassword ?? '';
  const body = new URLSearchParams();
  body.append('password', String(password));

  const client = tokenOverride
    ? APIClient('', tokenOverride)
    : APIClient();

  return client
    .post(AUTH_ENDPOINTS.CHANGE_PASSWORD, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.data);
};


export const makeUpdateAgentProfileRequest = (payload = {}) => {
  return APIClient()
    .put(AUTH_ENDPOINTS.AGENT_PROFILE, payload)
    .then(res => res.data);
};

export const makeResendOtpRequest = data => {
  return APIClient()
    .post(AUTH_ENDPOINTS.RESEND_OTP, data)
    .then(res => res.data);
};

export const makeUploadImageRequest = (data, token) => {
  const newData = {
    uri: data?.uri,
    name: !!data?.fileName ? data?.fileName : data?.name,
    type: data?.type,
  };
  const formData = new FormData();
  formData.append('file', newData);
  return fetch(`${Config.API_URL}${AUTH_ENDPOINTS.UPLOAD}`, {
    method: 'POST',
    body: formData,
    headers: {
      authorization: token,
      lan: 'en',
    },
  }).then(res => res?.json());
};

export const makeRequestViewingListingRequest = (params = {}) => {
  const {
    page = 1,
    limit = 10,
    status = 'pending',
    sort = [],
  } = params;

  return APIClient()
    .post(AUTH_ENDPOINTS.REQUEST_VIEWING_LISTING, {
      page,
      limit,
      status,
      sort, 
    })
    .then(res => res.data);
};

export const makeRequestViewingFeedbackRequest = ({
  requestId,
  clientInterest,
  agentFeedbackNote,
} = {}) => {
  const normalizedRequestId =
    (typeof requestId === 'object'
      ? requestId?._id || requestId?.id
      : requestId) || '';

  const body = {
    requestId: String(normalizedRequestId),
    clientInterest: String(clientInterest ?? '').trim(),
  };
  const note = agentFeedbackNote != null ? String(agentFeedbackNote).trim() : '';
  if (note) {
    body.agentFeedbackNote = note;
  }

  return APIClient()
    .post(AUTH_ENDPOINTS.REQUEST_VIEWING_FEEDBACK, body)
    .then(res => res.data);
};

export const makeRequestViewingActionRequest = ({
  requestId,
  status,
  updateMessage = '',
  rescheduleDate = '',
} = {}) => {
  const normalizedRequestId =
    (typeof requestId === 'object'
      ? requestId?._id || requestId?.id
      : requestId) || '';

  const payload = new URLSearchParams();
  payload.append('requestId', String(normalizedRequestId));
  payload.append('status', String(status || ''));
  if (updateMessage) {
    payload.append('updateMessage', updateMessage);
  }
  if (rescheduleDate) {
    payload.append('rescheduleDate', rescheduleDate);
  }

  return APIClient()
    .post(AUTH_ENDPOINTS.REQUEST_VIEWING_ACTION, payload.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(res => res.data);
};

export const makeGetAgentProfileRequest = agentId => {
  return APIClient()
    .get(`${AUTH_ENDPOINTS.AGENT_PROFILE}/${agentId}`)
    .then(res => res.data);
};
