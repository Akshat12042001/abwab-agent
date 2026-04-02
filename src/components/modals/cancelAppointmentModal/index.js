import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {StyledText} from '../../atoms';
import {COLORS} from '../../../constants';
import styles from './styles';

const CancelAppointmentModal = ({
  visible = false,
  onClose,
  onConfirmCancel,
  summary = null,
  bottomOffset = 0,
  isSubmitting = false,
}) => {
  const {t} = useTranslation();
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (visible) {
      setReason('');
    }
  }, [visible]);

  const handleCancelBooking = () => {
    onConfirmCancel?.({updateMessage: reason.trim()});
  };

  if (!summary) {
    return null;
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={bottomOffset + 24}>
        <View style={[styles.sheet, {paddingBottom: bottomOffset + 16}]}>
          <View style={styles.handle} />
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.title}>
            {t('APPOINTMENTS_SCREEN.CANCEL_CONFIRM_TITLE')}
          </StyledText>
          <StyledText
            size={14}
            variant="regular"
            color={COLORS.GREYSCALE_500}
            textStyle={styles.subtitle}
            textAlign="center">
            {t('APPOINTMENTS_SCREEN.CANCEL_CONFIRM_SUBTITLE')}
          </StyledText>

          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  numberOfLines={1}
                  textStyle={{flex: 1, marginRight: 8}}>
                  {summary.propertyTitle}
                </StyledText>
                <View style={styles.badge}>
                  <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                    {summary.statusLabel}
                  </StyledText>
                </View>
              </View>
              <StyledText
                size={13}
                variant="medium"
                color={COLORS.GREYSCALE_500}
                textStyle={styles.refText}>
                {summary.referenceLabel}
              </StyledText>
              <StyledText size={14} variant="semiBold" color={COLORS.GREYSCALE_900}>
                {t('APPOINTMENTS_SCREEN.APPOINTMENT_DETAILS')}
              </StyledText>
              <View style={styles.detailRow}>
                <View style={styles.detailCol}>
                  <StyledText size={12} color={COLORS.GREYSCALE_500}>
                    {t('APPOINTMENTS_SCREEN.APPOINTMENT_DATE')}
                  </StyledText>
                  <StyledText size={14} variant="semiBold" color={COLORS.GREYSCALE_900}>
                    {summary.currentDateLabel}
                  </StyledText>
                </View>
                <View style={styles.detailCol}>
                  <StyledText size={12} color={COLORS.GREYSCALE_500}>
                    {t('APPOINTMENTS_SCREEN.APPOINTMENT_TIME')}
                  </StyledText>
                  <StyledText size={14} variant="semiBold" color={COLORS.GREYSCALE_900}>
                    {summary.currentTimeLabel}
                  </StyledText>
                </View>
              </View>
              <View style={styles.viewingBadge}>
                <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                  {summary.viewingTypeLabel}
                </StyledText>
              </View>
            </View>

            <StyledText
              size={14}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionLabel}>
              {t('APPOINTMENTS_SCREEN.CANCEL_REASON_LABEL')}
            </StyledText>
            <TextInput
              style={styles.input}
              placeholder={t('APPOINTMENTS_SCREEN.CANCEL_REASON_PLACEHOLDER')}
              placeholderTextColor={COLORS.GREYSCALE_400}
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <TouchableOpacity
              style={styles.dangerBtn}
              onPress={handleCancelBooking}
              disabled={isSubmitting}
              activeOpacity={0.85}>
              {isSubmitting ? (
                <ActivityIndicator color={COLORS.WHITE} />
              ) : (
                <StyledText variant="bold" color={COLORS.WHITE}>
                  {t('APPOINTMENTS_SCREEN.CANCEL_BOOKING')}
                </StyledText>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={onClose}
              disabled={isSubmitting}
              activeOpacity={0.8}>
              <StyledText variant="bold" color={COLORS.GREYSCALE_700}>
                {t('BUTTONS.CANCEL')}
              </StyledText>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CancelAppointmentModal;
