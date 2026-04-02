import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {StyledText, CustomButton} from '../../atoms';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import styles from './styles';

const buildTimeSlots = () => {
  const slots = [];
  for (let h = 10; h <= 18; h++) {
    for (const m of [0, 30]) {
      if (h === 18 && m > 0) {
        break;
      }
      const hour24 = h;
      const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
      const period = hour24 >= 12 ? 'PM' : 'AM';
      const mm = m === 0 ? '00' : '30';
      slots.push(`${hour12}:${mm} ${period}`);
    }
  }
  return slots;
};

const TIME_SLOTS = buildTimeSlots();

const buildDateOptions = (count = 14) => {
  const out = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${y}-${mo}-${day}`;
    const label = d.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    out.push({dateString, label});
  }
  return out;
};

const parseTimeToSlot = label => {
  if (!label || typeof label !== 'string') {
    return TIME_SLOTS[0];
  }
  const normalized = label.trim().toUpperCase();
  const found = TIME_SLOTS.find(s => s.toUpperCase() === normalized);
  return found || TIME_SLOTS[0];
};

const pad2 = n => String(n).padStart(2, '0');

/**
 * Backend often rejects `toISOString()` (UTC + Z). Use explicit local wall-clock time.
 * `dateString`: YYYY-MM-DD
 */
const buildRescheduleDateForApi = (dateString, timeSlotLabel) => {
  const match = String(timeSlotLabel || '').match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  let hours = 12;
  let minutes = 0;
  if (match) {
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  }
  const parts = String(dateString || '').split('-').map(Number);
  const y = parts[0];
  const mo = parts[1];
  const day = parts[2];
  if (!y || !mo || !day) {
    return '';
  }
  const d = new Date(y, mo - 1, day, hours, minutes, 0, 0);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(
    d.getHours(),
  )}:${pad2(d.getMinutes())}:00`;
};

const RescheduleAppointmentModal = ({
  visible = false,
  onClose,
  onConfirm,
  summary = null,
  bottomOffset = 0,
  isSubmitting = false,
}) => {
  const {t} = useTranslation();
  const dateOptions = useMemo(() => buildDateOptions(14), []);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (visible && summary?.initialDateString) {
      const exists = dateOptions.some(d => d.dateString === summary.initialDateString);
      setSelectedDate(
        exists ? summary.initialDateString : dateOptions[0]?.dateString || '',
      );
      setSelectedTime(parseTimeToSlot(summary.initialTimeLabel));
      setReason('');
    }
  }, [visible, summary, dateOptions]);

  const handleConfirm = () => {
    if (!selectedDate || !onConfirm) {
      return;
    }
    const rescheduleDate = buildRescheduleDateForApi(selectedDate, selectedTime);
    onConfirm({
      rescheduleDate,
      updateMessage: reason.trim(),
    });
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
            {t('APPOINTMENTS_SCREEN.RESCHEDULE_TITLE')}
          </StyledText>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={[styles.cardTitle, {flex: 1}]}
                  numberOfLines={1}>
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
              {t('APPOINTMENTS_SCREEN.SELECT_NEW_DATE')}
            </StyledText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.chipsScroll}
              contentContainerStyle={{paddingRight: SCREEN_PADDING}}>
              {dateOptions.map(opt => {
                const sel = opt.dateString === selectedDate;
                return (
                  <Pressable
                    key={opt.dateString}
                    onPress={() => setSelectedDate(opt.dateString)}
                    style={[styles.chip, sel && styles.chipSelected]}>
                    <StyledText
                      size={13}
                      variant={sel ? 'bold' : 'medium'}
                      color={sel ? COLORS.PRIMARY : COLORS.GREYSCALE_700}>
                      {opt.label}
                    </StyledText>
                  </Pressable>
                );
              })}
            </ScrollView>

            <StyledText
              size={14}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionLabel}>
              {t('APPOINTMENTS_SCREEN.SELECT_NEW_TIME')}
            </StyledText>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((slot, index) => {
                const sel = slot === selectedTime;
                const isThird = (index + 1) % 3 === 0;
                return (
                  <Pressable
                    key={slot}
                    onPress={() => setSelectedTime(slot)}
                    style={[
                      styles.timeChip,
                      isThird && styles.timeChipEvery3,
                      sel && styles.chipSelected,
                    ]}>
                    <StyledText
                      size={13}
                      variant={sel ? 'bold' : 'medium'}
                      color={sel ? COLORS.PRIMARY : COLORS.GREYSCALE_700}>
                      {slot}
                    </StyledText>
                  </Pressable>
                );
              })}
            </View>

            <StyledText
              size={14}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionLabel}>
              {t('APPOINTMENTS_SCREEN.RESCHEDULE_REASON_LABEL')}
            </StyledText>
            <TextInput
              style={styles.input}
              placeholder={t('APPOINTMENTS_SCREEN.RESCHEDULE_REASON_PLACEHOLDER')}
              placeholderTextColor={COLORS.GREYSCALE_400}
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <CustomButton
              title={t('APPOINTMENTS_SCREEN.CONFIRM_RESCHEDULE')}
              onPress={handleConfirm}
              isLoading={isSubmitting}
              isDisabled={!selectedDate || isSubmitting}
              containerStyle={styles.confirmBtn}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RescheduleAppointmentModal;
