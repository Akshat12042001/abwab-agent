import React from 'react';
import {View, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {StyledText} from '../../atoms';
import {COLORS} from '../../../constants';
import styles from './styles';
import {CoinIcon, ContractIcon} from '../../svgs';
import {useTranslation} from 'react-i18next';

const AttachmentOptionsModal = ({
  visible = false,
  onClose,
  onModalHide,
  onSendContract,
  onSendPaymentRequest,
  bottomOffset = 0,
}) => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onModalHide}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating>
      <View style={[styles.modalContent, {marginBottom: bottomOffset + 70}]}>
        <Pressable
          style={({pressed}) => [styles.option]}
          onPress={() => {
            onSendPaymentRequest?.();
          }}>
          <CoinIcon />
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.optionText}>
            {t('CHAT_SCREEN.SEND_PAYMENT_REQUEST')}
          </StyledText>
        </Pressable>
        <View style={styles.optionDivider} />
        <Pressable
          style={({pressed}) => [styles.option]}
          onPress={() => {
            onSendContract?.();
          }}>
          <ContractIcon />
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.optionText}>
            {t('CHAT_SCREEN.SEND_CONTRACT')}
          </StyledText>
        </Pressable>
      </View>
    </Modal>
  );
};

export default AttachmentOptionsModal;
