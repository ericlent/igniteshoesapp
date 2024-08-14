import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
//EQL - Enviando dados na notificação
import { OSNotification } from 'react-native-onesignal';
import { useNavigation } from '@react-navigation/native';

//EQL - Enviando dados na notificação
type Props = {
  data: OSNotification;
  onClose: () => void;
}

//EQL - Enviando dados na notificação
type AdditionalDataProps = {
  route?: string;
  product_id?: string;
}

export function Notification({ data, onClose }: Props) {
  //EQL - Enviando dados na notificação
  const { navigate } = useNavigation();

  function handleOnPress() {
    if (data.additionalData) {
      const { route, product_id } = data.additionalData as AdditionalDataProps;

      if (route === "details" && product_id) {
        navigate(route, { productId: product_id });
        onClose();
      }
    }
    else {
      onClose();
    }
  }
  //EQL - Enviando dados na notificação

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      bgColor="gray.200"
      position="absolute"
      onPress={handleOnPress}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        top={0}
      >
        <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2} />

        <Text fontSize="md" color="black" flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: "coolGray.600" }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}