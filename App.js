import React, {useState} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {getStore, getPersistor} from './src/redux/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {CustomToast, StyledText} from './src/components/atoms';
import i18n from './src/translations/index';
import {SplashScreen} from './src/screens/authentication';
import ToastManager from 'toastify-react-native';
import {reset} from './src/redux/auth/auth.reducer';
import MapboxGL from '@rnmapbox/maps';

const toastConfig = {
  customSuccess: ({text1, text2, hide}) => (
    <CustomToast text1={text1} text2={text2} hide={hide} variant="success" />
  ),
  customError: ({text1, text2, hide}) => (
    <CustomToast text1={text1} text2={text2} hide={hide} variant="error" />
  ),
};

const App = () => {
  const store = getStore();
  const persistor = getPersistor();
  const [isLoading, setIsLoading] = useState(true);

  const onBeforeLift = () => {
    //Do some stuff that when redux has initialized

    store.dispatch(reset());
    // i18n.init();

    MapboxGL.setAccessToken(
      '__REDACTED_MAPBOX_PK__',
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<StyledText>Loading...</StyledText>}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
          <View style={{flex: 1}}>
            {isLoading ? <SplashScreen /> : <AppNavigator />}
            {/* After navigator so toast layer paints above app; useModal shows over RN modals */}
            <ToastManager
              useModal
              animationStyle="fade"
              showCloseIcon={false}
              config={toastConfig}
              duration={3500}
            />
          </View>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
