import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
//EQL - Recebendo mensagem em foreground
import { NotificationWillDisplayEvent, OneSignal, OSNotification } from "react-native-onesignal";
import { useEffect, useState } from "react";
import { Notification } from "../components/Notification";
//EQL - Recebendo mensagem em foreground
import { AppRoutes } from "./app.routes";

const linking = {
  prefixes: ["com.EQUAL.igniteshoes://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId,
        }
      },
    },
  },
}

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  //EQL - Recebendo mensagem em foreground
  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault();
      const response = event.getNotification();
      setNotification(response);
    }

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleNotification);

    return () => OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification);

  }, []);
  //EQL - Recebendo mensagem em foreground

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {/*EQL - Recebendo mensagem em foreground*/}
      {notification?.title && (
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      )}
      {/*EQL - Recebendo mensagem em foreground*/}
    </NavigationContainer>
  );
}