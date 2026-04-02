import {APIClient} from './client';

const AVAILABILITY_ENDPOINTS = {
  SET: '/availability/set',
  GET: '/availability/get',
};

export const makeGetAvailabilityRequest = ({agentId} = {}) => {
  return APIClient()
    .post(AVAILABILITY_ENDPOINTS.GET, {agentId: String(agentId || '')})
    .then(res => res.data);
};

export const makeSetAvailabilityRequest = ({workingHours = []} = {}) => {
  return APIClient()
    .post(AVAILABILITY_ENDPOINTS.SET, {workingHours})
    .then(res => res.data);
};

