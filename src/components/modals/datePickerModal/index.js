import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {StyledText} from '../../atoms';
import {ArrowRightIcon, LeftArrowIcon, LeftIcon, RightIcon} from '../../svgs';
import {COLORS, FONTS} from '../../../constants';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const DatePickerModal = ({
  visible = false,
  onClose,
  onConfirm,
  initialDate,
  minDate,
  maxDate,
}) => {
  const {t} = useTranslation();
  const [selectedDate, setSelectedDate] = useState(
    initialDate || new Date().toISOString().split('T')[0],
  );
  const [currentMonth, setCurrentMonth] = useState(
    initialDate || new Date().toISOString().split('T')[0],
  );

  const handleDateSelect = day => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    if (onConfirm && selectedDate) {
      onConfirm(selectedDate);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleMonthChange = month => {
    setCurrentMonth(month.dateString);
  };

  const formatMonthYear = dateString => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', {month: 'long'});
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const getMarkedDates = () => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: COLORS.PRIMARY,
        selectedTextColor: COLORS.WHITE,
      },
    };
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}>
      <View style={styles.modalContent}>
        {/* Title */}
        <StyledText
          size={18}
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.title}>
          {t('APPOINTMENTS_SCREEN.SELECT_DATE')}
        </StyledText>

        {/* Month Navigation */}
        {/* <View style={styles.monthNavigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              const date = new Date(currentMonth);
              date.setMonth(date.getMonth() - 1);
              setCurrentMonth(date.toISOString().split('T')[0]);
            }}
            activeOpacity={0.7}>
            <LeftIcon size={20} color={COLORS.GREYSCALE_900} />
          </TouchableOpacity>
          <StyledText
            size={16}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.monthYearText}>
            {formatMonthYear(currentMonth)}
          </StyledText>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => {
              const date = new Date(currentMonth);
              date.setMonth(date.getMonth() + 1);
              setCurrentMonth(date.toISOString().split('T')[0]);
            }}
            activeOpacity={0.7}>
            <RightIcon size={20} color={COLORS.GREYSCALE_900} />
          </TouchableOpacity>
        </View> */}

        {/* Calendar */}
        {/* <Calendar
          current={currentMonth}
          onDayPress={handleDateSelect}
          onMonthChange={handleMonthChange}
          markedDates={getMarkedDates()}
          minDate={minDate}
          maxDate={maxDate}
          hideExtraDays={false}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: COLORS.WHITE,
            calendarBackground: COLORS.WHITE,
            textSectionTitleColor: COLORS.GREYSCALE_900,
            selectedDayBackgroundColor: COLORS.PRIMARY,
            selectedDayTextColor: COLORS.WHITE,
            todayTextColor: COLORS.PRIMARY,
            dayTextColor: COLORS.GREYSCALE_900,
            textDisabledColor: COLORS.GREYSCALE_400,
            dotColor: COLORS.PRIMARY,
            selectedDotColor: COLORS.WHITE,
            arrowColor: 'transparent', // Hide default arrows
            monthTextColor: COLORS.GREYSCALE_900,
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
            textDayFontWeight: '400',
            textMonthFontWeight: '600',
            textDayHeaderFontWeight: '600',
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              },
            },
          }}
          style={styles.calendar}
        /> */}
        <Calendar
          style={{marginBottom: 20}}
          theme={{
            backgroundColor: COLORS.WHITE,
            calendarBackground: COLORS.WHITE,
            textSectionTitleColor: COLORS.GREYSCALE_900,
            selectedDayBackgroundColor: COLORS.PRIMARY,
            selectedDayTextColor: COLORS.WHITE,
            todayTextColor: COLORS.PRIMARY,
            dayTextColor: COLORS.GREYSCALE_900,
            textDisabledColor: COLORS.GREYSCALE_400,
            dotColor: COLORS.PRIMARY,
            selectedDotColor: COLORS.WHITE,
            monthTextColor: COLORS.GREYSCALE_900,
            textDayFontFamily: FONTS.medium,
            textMonthFontFamily: FONTS.bold,
            textDayHeaderFontFamily: FONTS.semiBold,
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 14,
            // 'stylesheet.calendar.header': {
            //   week: {
            //     marginTop: 5,
            //     flexDirection: 'row',
            //     justifyContent: 'space-between',
            //     paddingHorizontal: 8,
            //   },
            // },
          }}
          markingType={'custom'}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: {
              customStyles: {
                container: {
                  backgroundColor: COLORS.PRIMARY,
                  height: 30,
                  width: 30,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                text: {
                  color: COLORS.WHITE,
                  fontWeight: FONTS.bold,
                  fontSize: 14,
                },
              },
            },
          }}
          renderArrow={direction => {
            return (
              <View>
                {direction === 'right' ? (
                  <ArrowRightIcon size={20} color={COLORS.GREYSCALE_900} />
                ) : (
                  <LeftArrowIcon size={20} color={COLORS.GREYSCALE_900} />
                )}
              </View>
            );
          }}
        />

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
              {t('BUTTONS.CANCEL')}
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.WHITE}>
              {t('BUTTONS.CONFIRM')}
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
