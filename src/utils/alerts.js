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

export const errorToast = (title, t) => {
  const msg = title ? title : t?.('STRINGS.BUTTONS.ERROR') || 'Error';
  // Use custom error component registered in ToastManager.config
  Toast.show({type: 'customError', text1: msg, position: TOAST_POSITION});
};

export const successToast = (title, t) => {
  const msg = title ? title : t?.('STRINGS.BUTTONS.SUCCESS') || 'Success';
  // Use custom success component registered in ToastManager.config
  Toast.show({type: 'customSuccess', text1: msg, position: TOAST_POSITION});
};
