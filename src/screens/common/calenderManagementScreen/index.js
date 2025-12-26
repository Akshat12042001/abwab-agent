import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {PlusIcon, MinusIcon, CheckIcon} from '../../../components/svgs';
import styles from './styles';
import {SharedStyles} from '../../../shared';

class CalenderManagementScreen extends Component {
  constructor(props) {
    super(props);
    // Initialize working hours for each day
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const initialWorkingHours = days.map((day, index) => ({
      day,
      isAvailable: index < 5, // Sunday-Thursday available by default
      timeSlots: [
        {
          id: `${day}-slot-0`,
          start: '08:00am',
          end: '10:00pm',
        },
      ],
    }));

    // Wednesday has 2 slots as per the design
    initialWorkingHours[3].timeSlots = [
      {
        id: 'Wednesday-slot-0',
        start: '02:00am',
        end: '04:00pm',
      },
      {
        id: 'Wednesday-slot-1',
        start: '02:00pm',
        end: '4:00pm',
      },
    ];

    this.state = {
      workingHours: initialWorkingHours,
      timePickerVisible: false,
      timePickerConfig: null, // {dayIndex, slotIndex, field: 'start' | 'end', date}
    };
  }

  // Parse time string (e.g., "08:00am") to Date object
  parseTimeString = timeString => {
    const timeRegex = /(\d{1,2}):(\d{2})(am|pm)/i;
    const match = timeString.match(timeRegex);
    if (!match) {
      // Default to 8:00 AM if parsing fails
      const date = new Date();
      date.setHours(8, 0, 0, 0);
      return date;
    }

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toLowerCase();

    if (period === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Format Date object to time string (e.g., "08:00am")
  formatTimeString = date => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minutesStr}${period}`;
  };

  handleOpenTimePicker = (dayIndex, slotIndex, field) => {
    const timeString =
      this.state.workingHours[dayIndex].timeSlots[slotIndex][field];
    const date = this.parseTimeString(timeString);

    this.setState({
      timePickerVisible: true,
      timePickerConfig: {
        dayIndex,
        slotIndex,
        field,
        date,
      },
    });
  };

  handleTimePickerConfirm = date => {
    const {dayIndex, slotIndex, field} = this.state.timePickerConfig;
    const timeString = this.formatTimeString(date);

    const updatedHours = [...this.state.workingHours];
    updatedHours[dayIndex].timeSlots[slotIndex][field] = timeString;
    this.setState({
      workingHours: updatedHours,
      timePickerVisible: false,
      timePickerConfig: null,
    });
  };

  handleTimePickerCancel = () => {
    this.setState({
      timePickerVisible: false,
      timePickerConfig: null,
    });
  };

  handleToggleAvailability = dayIndex => {
    const updatedHours = [...this.state.workingHours];
    updatedHours[dayIndex].isAvailable = !updatedHours[dayIndex].isAvailable;
    this.setState({workingHours: updatedHours});
  };

  handleAddTimeSlot = dayIndex => {
    const updatedHours = [...this.state.workingHours];
    const newSlot = {
      id: `${updatedHours[dayIndex].day}-slot-${Date.now()}`,
      start: '08:00am',
      end: '10:00pm',
    };
    updatedHours[dayIndex].timeSlots.push(newSlot);
    this.setState({workingHours: updatedHours});
  };

  handleRemoveTimeSlot = (dayIndex, slotIndex) => {
    const updatedHours = [...this.state.workingHours];
    if (updatedHours[dayIndex].timeSlots.length > 1) {
      updatedHours[dayIndex].timeSlots.splice(slotIndex, 1);
      this.setState({workingHours: updatedHours});
    }
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {t} = this.props?.i18n;
    const {workingHours} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <CommonHeader title={t('CALENDAR_MANAGEMENT_SCREEN.TITLE')} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Working Hours Heading */}
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.sectionTitle}>
            {t('CALENDAR_MANAGEMENT_SCREEN.WORKING_HOURS')}
          </StyledText>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={[styles.headerCell]}>
              <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
                {t('CALENDAR_MANAGEMENT_SCREEN.DAY')}
              </StyledText>
            </View>
            <View style={[styles.headerCell]}>
              <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
                {t('CALENDAR_MANAGEMENT_SCREEN.AVAIL')}
              </StyledText>
            </View>
            <View style={[styles.headerCell, {alignItems: 'center'}]}>
              <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
                {t('CALENDAR_MANAGEMENT_SCREEN.START')}
              </StyledText>
            </View>
            <View style={[styles.headerCell, {alignItems: 'center'}]}>
              <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
                {t('CALENDAR_MANAGEMENT_SCREEN.END')}
              </StyledText>
            </View>
            {/* <View style={{width: 20, borderWidth: 1}} /> */}
          </View>

          {/* Days Rows */}
          {workingHours.map((dayData, dayIndex) => (
            <View key={dayData.day} style={styles.dayRow}>
              {dayData.timeSlots.map((slot, slotIndex) => (
                <View
                  key={slot.id}
                  style={[
                    styles.timeSlotRow,
                    slotIndex > 0 && styles.timeSlotRowIndented,
                  ]}>
                  {/* Day Name */}
                  {slotIndex === 0 && (
                    <View style={styles.dayCell}>
                      <StyledText
                        size={14}
                        variant="medium"
                        color={COLORS.GREYSCALE_700}>
                        {dayData.day}
                      </StyledText>
                    </View>
                  )}
                  {slotIndex > 0 && <View style={styles.dayCell} />}

                  {/* Availability Checkbox */}
                  {slotIndex === 0 && (
                    <View style={styles.checkboxCell}>
                      {/* <Checkbox
                        isChecked={dayData.isAvailable}
                        onCheckboxPress={() =>
                          this.handleToggleAvailability(dayIndex)
                        }
                      /> */}
                      <TouchableOpacity
                        hitSlop={SharedStyles.hitSlop10}
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 4,
                          borderWidth: 1,
                          borderColor: dayData.isAvailable
                            ? COLORS.PRIMARY
                            : COLORS.GREYSCALE_500,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: dayData.isAvailable
                            ? COLORS.PRIMARY
                            : COLORS.WHITE,
                        }}
                        onPress={() => this.handleToggleAvailability(dayIndex)}>
                        {dayData.isAvailable && (
                          <CheckIcon size={20} color={COLORS.WHITE} />
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  {/* {slotIndex > 0 && <View style={styles.checkboxCell} />} */}

                  {/* Start Time */}
                  <View
                    style={[
                      styles.timeInputCell,
                      {marginTop: dayData?.timeSlots?.length >= 1 ? 10 : 0},
                    ]}>
                    <TouchableOpacity
                      style={styles.timeInput}
                      onPress={() =>
                        this.handleOpenTimePicker(dayIndex, slotIndex, 'start')
                      }
                      activeOpacity={0.7}>
                      <StyledText
                        size={14}
                        variant="regular"
                        color={
                          slot.start
                            ? COLORS.GREYSCALE_900
                            : COLORS.GREYSCALE_500
                        }>
                        {slot.start || '08:00am'}
                      </StyledText>
                    </TouchableOpacity>
                  </View>

                  {/* End Time */}
                  <View
                    style={[
                      styles.timeInputCell,
                      {marginLeft: 10},
                      {marginTop: dayData?.timeSlots?.length >= 1 ? 10 : 0},
                    ]}>
                    <TouchableOpacity
                      style={styles.timeInput}
                      onPress={() =>
                        this.handleOpenTimePicker(dayIndex, slotIndex, 'end')
                      }
                      activeOpacity={0.7}>
                      <StyledText
                        size={14}
                        variant="regular"
                        color={
                          slot.end ? COLORS.GREYSCALE_900 : COLORS.GREYSCALE_500
                        }>
                        {slot.end || '10:00pm'}
                      </StyledText>
                    </TouchableOpacity>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionCell}>
                    <TouchableOpacity
                      style={styles.addButton}
                      hitSlop={SharedStyles.hitSlop10}
                      onPress={() => this.handleAddTimeSlot(dayIndex)}
                      activeOpacity={0.7}>
                      <PlusIcon size={16} color={COLORS.PRIMARY} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      hitSlop={SharedStyles.hitSlop10}
                      style={[
                        styles.removeButton,
                        {
                          borderColor:
                            slotIndex > 0 ? COLORS.GREYSCALE_500 : COLORS.WHITE,
                        },
                      ]}
                      onPress={() =>
                        this.handleRemoveTimeSlot(dayIndex, slotIndex)
                      }
                      activeOpacity={0.7}>
                      {slotIndex > 0 && (
                        <MinusIcon size={16} color={COLORS.GREYSCALE_500} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Time Picker Modal */}
        {this.state.timePickerConfig && (
          <DatePicker
            modal
            open={this.state.timePickerVisible}
            date={this.state.timePickerConfig.date}
            mode="time"
            onConfirm={this.handleTimePickerConfirm}
            onCancel={this.handleTimePickerCancel}
            theme="light"
          />
        )}
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(CalenderManagementScreen));
