import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
//EQL - Adicionado para a aula
import { OneSignal } from 'react-native-onesignal';
////////////////////////////////////////////////////////////////////////////////
//EQL - Alterar para a chave do ios
const oneSignalAppId = Platform.OS === 'ios' ? "b829ae6-b7e7-4f4f-b9c7-4126867ca7fe" : "eb829ae6-b7e7-4f4f-b9c7-4126867ca7fe"
OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);
////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}