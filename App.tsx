import { View, ActivityIndicator } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';

import * as SplashScreen from 'expo-splash-screen';

import { store, persistor } from './src/redux/store';
import MainStack from './src/stacks/MainStack';

SplashScreen.preventAutoHideAsync();

const Loading = (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const theme = DefaultTheme;

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={async () => {
        await SplashScreen.hideAsync();
      }}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
