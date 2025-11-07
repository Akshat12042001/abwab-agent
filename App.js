import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {getStore, getPersistor} from './src/redux/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StyledText} from './src/components/atoms';
import i18n from './src/translations/index';
import {SplashScreen} from './src/screens/authentication';

const App = () => {
  const store = getStore();
  const persistor = getPersistor();
  const [isLoading, setIsLoading] = useState(true);

  const onBeforeLift = () => {
    //Do some stuff that when redux has initialized
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
          {isLoading ? <SplashScreen /> : <AppNavigator />}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
