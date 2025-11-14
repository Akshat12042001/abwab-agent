import {combineReducers} from 'redux';
import authReducer from './auth/auth.reducer';
import onboardingReducer from './onboarding/onboarding.reducer';

export default combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
});
