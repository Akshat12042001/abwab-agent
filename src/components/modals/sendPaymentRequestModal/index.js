import React, {useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {StyledText, DropdownComponent, CustomButton} from '../../atoms';
import {CoinIcon} from '../../svgs';
import {COLORS} from '../../../constants';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const SendPaymentRequestModal = ({
  visible = false,
  onClose,
  onDone,
  paymentTypes = [],
  bottomOffset = 0,
}) => {
  const {t} = useTranslation();
  const [selectedPaymentType, setSelectedPaymentType] = useState('');

  const handleDone = () => {
    if (onDone && selectedPaymentType) {
      onDone(selectedPaymentType);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedPaymentType('');
    onClose?.();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      coverScreen
      statusBarTranslucent>
      <View style={[styles.modalContent, {marginBottom: bottomOffset + 70}]}>
        {/* Header */}
        <View style={styles.header}>
          <CoinIcon size={24} />
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.headerText}>
            {t('CHAT_SCREEN.SEND_PAYMENT_REQUEST')}
          </StyledText>
        </View>

        {/* Payment Request Section */}
        <View style={styles.content}>
          {/* <StyledText
            size={14}
            variant="medium"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.sectionLabel}>
            Payment Request
          </StyledText> */}
          <DropdownComponent
            label={t('CHAT_SCREEN.PAYMENT_REQUEST')}
            labelColor={COLORS.GREYSCALE_900}
            placeholder={t('CHAT_SCREEN.SELECT', {defaultValue: 'Select'})}
            value={selectedPaymentType}
            data={paymentTypes}
            onChange={item => setSelectedPaymentType(item.value)}
            containerStyle={styles.dropdownContainer}
            mode="modal"
            dropdownPosition="auto"
          />
        </View>

        {/* Done Button */}
        <CustomButton
          title={t('SUCCESS_SCREEN.DONE')}
          onPress={handleDone}
          containerStyle={styles.doneButton}
          isDisabled={!selectedPaymentType}
        />
      </View>
    </Modal>
  );
};

export default SendPaymentRequestModal;
