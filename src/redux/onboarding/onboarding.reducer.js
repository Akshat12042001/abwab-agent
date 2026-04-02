import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isOnboardingCompleted: false,
  isBiometricEnabled: false,
  language: 'en',
  loginFlowType:""
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: INITIAL_STATE,
  reducers: {
    setIsOnboardingCompleted: (state, action) => {
      state.isOnboardingCompleted = action.payload;
    },
    setIsBiometricEnabled: (state, action) => {
      state.isBiometricEnabled = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLoginFlowType: (state, action) => {
      state.loginFlowType = action.payload;
    },
  },
});

export const {setIsOnboardingCompleted, setIsBiometricEnabled, setLanguage, setLoginFlowType} =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
