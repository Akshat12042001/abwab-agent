import {Alert} from 'react-native';
import {Toast} from 'toastify-react-native';

const TOAST_POSITION = 'top';

export const showAlert = ({
  title,
  message,
  onSuccess,
  onCancel,
  isConfirmationPopup = false,
  t,
}) => {
  let buttons = [
    {
      text: t('BUTTONS.OK'),
      onPress: onSuccess,
    },
  ];

  if (isConfirmationPopup) {
    buttons = [
      {
        text: t('BUTTONS.NO'),
        onPress: onCancel,
      },
      {
        text: t('BUTTONS.YES'),
        onPress: onSuccess,
        style: 'destructive',
      },
    ];
  }

  Alert.alert(title, message, buttons);
};

const baseToastOptions = {
  position: TOAST_POSITION,
  /** Required to appear above react-native-modal / nested screens (toastify-react-native v7) */
  useModal: true,
  visibilityTime: 4000,
};

export const errorToast = (title, t) => {
  const msg = title ? title : t?.('STRINGS.BUTTONS.ERROR') || 'Error';
  Toast.show({
    type: 'customError',
    text1: msg,
    ...baseToastOptions,
  });
};

export const successToast = (title, t) => {
  const msg = title ? title : t?.('STRINGS.BUTTONS.SUCCESS') || 'Success';
  Toast.show({
    type: 'customSuccess',
    text1: msg,
    ...baseToastOptions,
  });
};
