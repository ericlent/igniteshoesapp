import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
//EQL - Adicionado para a aula
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';
import { tagUserEmailCreate, tagUserEmailRemove, tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';
////////////////////////////////////////////////////////////////////////////////
//EQL - Alterar para a chave do ios
const oneSignalAppId = Platform.OS === 'ios' ? "b829ae6-b7e7-4f4f-b9c7-4126867ca7fe" : "eb829ae6-b7e7-4f4f-b9c7-4126867ca7fe"
OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true);

//tagUserEmailCreate("dragoneric@gmail.com");
//tagUserEmailRemove("dragoneric@gmail.com");
tagUserInfoCreate();
////////////////////////////////////////////////////////////////////////////////
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      switch (actionId) {
        case "1":
          console.log("Ver todos");
          break;
        case "2":
          console.log("Ver pedido");
          break;
        default:
          console.log("Ação não identificada");
          break;
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick);

  }, []);

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