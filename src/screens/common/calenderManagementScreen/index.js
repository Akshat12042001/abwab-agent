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
import {makeGetAvailabilityRequest, makeSetAvailabilityRequest} from '../../../api/availability';
import {connect} from 'react-redux';
import {errorToast, successToast} from '../../../utils/alerts';

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
      isLoadingAvailability: false,
      isSavingAvailability: false,
    };
  }

  componentDidMount() {
    this.fetchAvailability();
  }

  logApi = (step, payload) => {
    console.log(`[CalendarManagement][API] ${step}`, payload);
  };

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

  formatTo24h = timeString => {
    if (!timeString) return '08:00';

    const normalized = String(timeString).trim().toLowerCase();
    const amPmMatch = normalized.match(/(\d{1,2}):(\d{2})(am|pm)/);
    if (amPmMatch) {
      let hours = Number(amPmMatch[1]);
      const minutes = amPmMatch[2];
      const period = amPmMatch[3];
      if (period === 'pm' && hours !== 12) {
        hours += 12;
      }
      if (period === 'am' && hours === 12) {
        hours = 0;
      }
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    }

    const hhmmMatch = normalized.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
    if (hhmmMatch) {
      const [hours, minutes] = normalized.split(':');
      return `${String(Number(hours)).padStart(2, '0')}:${minutes}`;
    }

    return '08:00';
  };

  formatFrom24hToAmPm = hhmm => {
    const match = String(hhmm || '').match(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/);
    if (!match) return '08:00am';

    let hours = Number(match[1]);
    const minutes = match[2];
    const period = hours >= 12 ? 'pm' : 'am';

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes}${period}`;
  };

  getAgentId = () => {
    const userData = this.props?.userData || {};
    const userId = this.props?.userId || '';
    const authRaw = this.props?.authRaw || {};
    return (
      userData?.agentId ||
      userData?.agent?._id ||
      userData?.agent?.id ||
      userData?.agentProfileId ||
      userData?.profile?._id ||
      userData?.profile?.id ||
      authRaw?.agentId ||
      authRaw?.userData?.agentId ||
      authRaw?.userData?.agent?._id ||
      authRaw?.data?.agentId ||
      authRaw?.data?.agent?._id ||
      userId ||
      userData?._id ||
      userData?.id ||
      userData?.user?._id ||
      userData?.user?.id ||
      ''
    );
  };

  normalizeApiWorkingHours = payload => {
    const order = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    /** Multiple API rows can share the same `day` (one row per slot). */
    const slotsByDay = {};
    (payload || []).forEach(item => {
      if (!item?.day) return;
      const key = String(item.day).toLowerCase();
      if (!slotsByDay[key]) {
        slotsByDay[key] = [];
      }
      slotsByDay[key].push(item);
    });

    return order.map(dayKey => {
      const label = `${dayKey.charAt(0).toUpperCase()}${dayKey.slice(1)}`;
      const rows = slotsByDay[dayKey] || [];
      if (!rows.length) {
        return {
          day: label,
          isAvailable: false,
          timeSlots: [
            {
              id: `${label}-slot-0`,
              start: this.formatFrom24hToAmPm('08:00'),
              end: this.formatFrom24hToAmPm('22:00'),
            },
          ],
        };
      }
      const isAvailable = rows.some(r => r?.isAvailable);
      const timeSlots = rows.map((row, idx) => ({
        id: `${label}-slot-${idx}`,
        start: this.formatFrom24hToAmPm(row?.startTime || '08:00'),
        end: this.formatFrom24hToAmPm(row?.endTime || '22:00'),
      }));
      return {
        day: label,
        isAvailable: Boolean(isAvailable),
        timeSlots,
      };
    });
  };

  fetchAvailability = async () => {
    const agentId = this.getAgentId();
    this.logApi('GET_AVAILABILITY:INIT', {agentId});
    if (!agentId) {
      this.logApi('GET_AVAILABILITY:SKIP_NO_AGENT_ID', {});
      return;
    }

    this.setState({isLoadingAvailability: true});
    try {
      this.logApi('GET_AVAILABILITY:REQUEST', {
        endpoint: '/availability/get',
        method: 'POST',
        payload: {agentId},
      });
      const res = await makeGetAvailabilityRequest({agentId});
      this.logApi('GET_AVAILABILITY:SUCCESS', res);
      let payload =
        res?.data?.workingHours ||
        res?.data?.data?.workingHours ||
        res?.workingHours ||
        res?.data ||
        [];
      if (Array.isArray(payload) && payload.length && typeof payload[0] === 'string') {
        payload = payload
          .map(s => {
            try {
              return JSON.parse(s);
            } catch {
              return null;
            }
          })
          .filter(Boolean);
      }
      this.logApi('GET_AVAILABILITY:PARSED_WORKING_HOURS', {
        count: Array.isArray(payload) ? payload.length : 0,
        payload,
      });
      if (Array.isArray(payload) && payload.length) {
        this.setState({
          workingHours: this.normalizeApiWorkingHours(payload),
        });
      }
    } catch (e) {
      const rawErrorData = e?.response?.data;
      const errorMessage =
        rawErrorData?.message || rawErrorData?.error || e?.message || '';
      this.logApi('GET_AVAILABILITY:ERROR', {
        message: e?.message,
        status: e?.response?.status,
        data: rawErrorData,
        dataString:
          typeof rawErrorData === 'string'
            ? rawErrorData
            : JSON.stringify(rawErrorData || {}),
      });
      const isNoRecordCase =
        e?.response?.status === 400 &&
        String(errorMessage).toLowerCase().includes('no records found');

      if (isNoRecordCase) {
        this.logApi('GET_AVAILABILITY:NO_RECORDS_USING_DEFAULTS', {
          agentId: this.getAgentId(),
        });
        return;
      }

      errorToast('Failed to load calendar');
    } finally {
      this.setState({isLoadingAvailability: false});
    }
  };

  /** Compare "HH:mm" strings as minutes from midnight. */
  hhmmToMinutes = hhmm => {
    const [h, m] = String(hhmm || '0:0').split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  /**
   * API requires exactly 7 `workingHours` rows (one per weekday). Extra UI slots
   * for the same day are merged into one interval: earliest start → latest end.
   * (Gaps between slots are not preserved — backend needs a richer schema for that.)
   */
  buildSetPayload = () => {
    return (this.state.workingHours || []).map(dayData => {
      const day = String(dayData?.day || '').toLowerCase();
      const isAvailable = Boolean(dayData?.isAvailable);
      const slots =
        dayData?.timeSlots?.length > 0
          ? dayData.timeSlots
          : [{start: '08:00am', end: '10:00pm'}];
      const ranges = slots.map(s => ({
        start: this.formatTo24h(s?.start || '08:00am'),
        end: this.formatTo24h(s?.end || '10:00pm'),
      }));
      let minStart = ranges[0].start;
      let maxEnd = ranges[0].end;
      ranges.forEach(({start, end}) => {
        if (this.hhmmToMinutes(start) < this.hhmmToMinutes(minStart)) {
          minStart = start;
        }
        if (this.hhmmToMinutes(end) > this.hhmmToMinutes(maxEnd)) {
          maxEnd = end;
        }
      });
      return {
        day,
        isAvailable,
        startTime: minStart,
        endTime: maxEnd,
      };
    });
  };

  handleSaveAvailability = async () => {
    if (this.state.isSavingAvailability) {
      return;
    }
    this.setState({isSavingAvailability: true});
    try {
      const workingHours = this.buildSetPayload();
      this.logApi('SET_AVAILABILITY:REQUEST', {
        endpoint: '/availability/set',
        method: 'POST',
        payload: {workingHours},
      });
      await makeSetAvailabilityRequest({workingHours});
      this.logApi('SET_AVAILABILITY:SUCCESS', {ok: true});
      successToast('Calendar updated successfully');
    } catch (e) {
      this.logApi('SET_AVAILABILITY:ERROR', {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      errorToast('Failed to update calendar');
    } finally {
      this.setState({isSavingAvailability: false});
    }
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

        <TouchableOpacity
          style={[
            styles.saveButton,
            this.state.isSavingAvailability && styles.saveButtonDisabled,
          ]}
          onPress={this.handleSaveAvailability}
          activeOpacity={0.8}>
          <StyledText variant="semiBold" color={COLORS.WHITE}>
            {this.state.isSavingAvailability
              ? 'Saving...'
              : 'Save'}
          </StyledText>
        </TouchableOpacity>

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

const mapStateToProps = ({auth}) => ({
  userData: auth?.userData,
  userId: auth?.userId,
  authRaw: auth,
});

export default connect(mapStateToProps)(
  withTranslation()(withSafeAreaInsets(CalenderManagementScreen)),
);
