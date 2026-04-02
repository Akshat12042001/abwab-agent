import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'auth'],
  migrate: async state => {
    try {
      const rememberFromState = state?.auth?.rememberMe;
      if (rememberFromState === false && state?.auth) {
        return {
          ...state,
          auth: undefined,
        };
      }

      // Backward compatibility for previously stored flag.
      const isRememberMe = await AsyncStorage.getItem('isRememberMe');
      // Clear auth only when explicitly opted out.
      if (isRememberMe === 'false' && state?.auth) {
        return {
          ...state,
          auth: undefined,
        };
      }
      return state;
    } catch (e) {
      return state;
    }
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
  return store.getState();
};

export {getStore, getState, getPersistor};
