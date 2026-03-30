import React, {Component} from 'react';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {CalenderIcon, SettingsIcon} from '../../../components/svgs';
import {ASSETS} from '../../../constants/assets';
import {AppointmentCard} from '../../../components/molecules';
import {
  DatePickerModal,
  RescheduleAppointmentModal,
  CancelAppointmentModal,
} from '../../../components/modals';
import styles from './styles';
import {
  makeRequestViewingActionRequest,
  makeRequestViewingListingRequest,
} from '../../../api/auth';
import {errorToast, successToast} from '../../../utils/alerts';

const PAGE_LIMIT = 10;

/** Local calendar YYYY-MM-DD — module scope so constructor never calls `this` before fields init. */
const toLocalDateString = value => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const buildDateStripFromCenter = centerDate => {
  const dates = [];
  const base = new Date(centerDate);
  for (let i = 0; i < 7; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);
    dates.push({
      id: `${date.getTime()}-${i}`,
      day: date.getDate(),
      dayName: date.toLocaleDateString('en-US', {weekday: 'short'}),
      date,
      dateString: toLocalDateString(date),
    });
  }
  return dates;
};

/**
 * Compare API / ISO strings to date chips without UTC shifting date-only values.
 * e.g. "2026-03-29" or "2026-03-29T13:02:00.000Z" → "2026-03-29" (calendar prefix).
 */
const appointmentDayKey = value => {
  if (value == null || value === '') {
    return '';
  }
  const s = String(value).trim();
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m) {
    return m[1];
  }
  const date = new Date(s);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return toLocalDateString(date);
};

class AppointmentsScreen extends Component {
  constructor(props) {
    super(props);

    const dates = buildDateStripFromCenter(new Date());
    const selectedDateString = dates[0]?.dateString || '';

    this.state = {
      selectedDateString,
      selectedDateIndex: 0,
      dates,
      appointments: [],
      filteredAppointments: [],
      showDatePickerModal: false,
      isLoading: false,
      isRefreshing: false,
      isLoadingMore: false,
      hasMore: true,
      page: 1,
      actionLoadingId: '',
      actionType: '',
      actionTargetItem: null,
      showRescheduleModal: false,
      showCancelModal: false,
    };
    this.latestRequestId = 0;
    /** Auto-fetch next listing pages when selected day has no rows yet (appointment may be on page 2+). */
    this.chainedEmptyFilterLoads = 0;
  }

  componentDidMount() {
    this.fetchAppointments({reset: true});
  }

  logApi = (step, payload) => {
    console.log(`[Appointments][API] ${step}`, payload);
  };

  toDateString = value => toLocalDateString(value);

  buildDateStrip = centerDate => buildDateStripFromCenter(centerDate);

  getRequestsListFromResponse = response => {
    const candidates = [
      response?.data?.data,
      response?.data?.requests,
      response?.data?.items,
      response?.data?.docs,
      response?.data?.list,
      response?.data,
      response?.items,
      response?.results,
      response,
    ];
    return candidates.find(Array.isArray) || [];
  };

  getHasMoreFromResponse = (response, fetchedItemsCount, currentPage) => {
    const pagination = response?.data?.pagination || response?.pagination;
    const hasNext =
      pagination?.hasNextPage ??
      pagination?.has_next_page ??
      response?.data?.hasNextPage ??
      response?.hasNextPage;
    if (typeof hasNext === 'boolean') {
      return hasNext;
    }
    const totalPages =
      Number(pagination?.totalPages) ||
      Number(pagination?.lastPage) ||
      Number(response?.data?.totalPages) ||
      Number(response?.totalPages) ||
      0;
    if (totalPages > 0) {
      return currentPage < totalPages;
    }
    return fetchedItemsCount >= PAGE_LIMIT;
  };

  getRequest = item =>
    item?.requestViewing || item?.request || item?.viewingRequest || item || {};

  getRequestId = item => {
    const request = this.getRequest(item);
    const rawId =
      request?._id ||
      request?.id ||
      request?.requestId ||
      request?.request?._id ||
      request?.request?.id;
    if (typeof rawId === 'object') {
      return String(rawId?._id || rawId?.id || '');
    }
    return String(rawId || '');
  };

  getAppointmentDateValue = item => {
    const request = this.getRequest(item);
    return (
      request?.rescheduleDate ||
      request?.rescheduledDate ||
      request?.newAppointmentDate ||
      request?.updatedAppointmentDate ||
      request?.appointmentDate ||
      request?.appointment_date ||
      request?.appointmentAt ||
      request?.meetingDate ||
      request?.meeting_date ||
      request?.date ||
      request?.createdAt ||
      ''
    );
  };

  formatAppointmentDate = dateValue => {
    if (!dateValue) return '-';
    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return String(dateValue);
    return parsedDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  mapAppointmentCardProps = item => {
    const request = this.getRequest(item);
    const property =
      request?.property ||
      (typeof request?.propertyId === 'object' ? request?.propertyId : null) ||
      request?.listing ||
      request?.propertyDetails ||
      {};
    const client =
      request?.client ||
      request?.customer ||
      request?.user ||
      (typeof request?.userId === 'object' ? request?.userId : null) ||
      {};

    return {
      id: this.getRequestId(item),
      propertyTitle:
        property?.name ||
        property?.title ||
        request?.propertyName ||
        request?.listingTitle ||
        request?.title ||
        'Property',
      developer:
        property?.developerName ||
        property?.developer ||
        request?.developer ||
        'Developer',
      location:
        property?.location ||
        property?.address ||
        [property?.area, property?.city].filter(Boolean).join(', ') ||
        request?.location ||
        '-',
      clientName:
        client?.name ||
        client?.fullName ||
        [client?.firstName, client?.lastName].filter(Boolean).join(' ') ||
        request?.clientName ||
        'Client',
      clientImage:
        (client?.avatar && {uri: client?.avatar}) ||
        (client?.image && {uri: client?.image}) ||
        ASSETS.IMAGES.PERSON,
      isVerified: Boolean(client?.isVerified || request?.isVerifiedClient),
      appointmentDate: this.formatAppointmentDate(this.getAppointmentDateValue(item)),
    };
  };

  mapAppointmentDetailParams = item => {
    const request = this.getRequest(item);
    const property =
      request?.property ||
      (typeof request?.propertyId === 'object' ? request?.propertyId : null) ||
      request?.listing ||
      request?.propertyDetails ||
      {};
    const client =
      request?.client ||
      request?.customer ||
      request?.user ||
      (typeof request?.userId === 'object' ? request?.userId : null) ||
      {};

    const appointmentValue = this.getAppointmentDateValue(item);
    const date = new Date(appointmentValue);
    const isValidDate = !Number.isNaN(date.getTime());

    const imageCandidates = [
      property?.mainImage,
      property?.image,
      property?.imageUrl,
      request?.propertyImage,
      request?.listingImage,
      request?.thumbnail,
    ].filter(Boolean);

    const carouselImages = imageCandidates.length
      ? imageCandidates.map(uri => ({uri}))
      : [ASSETS.IMAGES.DUMMY_IMAGE];

    const developerLabel =
      property?.developerName ||
      property?.developer ||
      request?.developer ||
      'Developer';
    const locationLine =
      property?.location ||
      property?.address ||
      [property?.area, property?.city].filter(Boolean).join(', ') ||
      request?.location ||
      '-';

    return {
      requestId: this.getRequestId(item),
      developer: developerLabel,
      propertyTitle:
        property?.name ||
        property?.title ||
        request?.propertyName ||
        request?.listingTitle ||
        request?.title ||
        'Property',
      propertyLocation: locationLine,
      appointmentDate: isValidDate
        ? date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '-',
      appointmentTime: isValidDate
        ? date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : '-',
      clientName:
        client?.name ||
        client?.fullName ||
        [client?.firstName, client?.lastName].filter(Boolean).join(' ') ||
        request?.clientName ||
        'Client',
      clientImage:
        (client?.avatar && {uri: client?.avatar}) ||
        (client?.image && {uri: client?.image}) ||
        ASSETS.IMAGES.PERSON,
      isVerified: Boolean(client?.isVerified || request?.isVerifiedClient),
      meetingLocation:
        request?.meetingLocation ||
        request?.meetingPoint ||
        request?.address ||
        property?.address ||
        property?.location ||
        '-',
      notes:
        request?.specialNotes ||
        request?.note ||
        request?.notes ||
        request?.message ||
        'No notes available',
      carouselImages,
    };
  };

  mapAppointmentModalSummary = item => {
    const request = this.getRequest(item);
    const card = this.mapAppointmentCardProps(item);
    const appointmentValue = this.getAppointmentDateValue(item);
    const d = new Date(appointmentValue);
    const isValid = !Number.isNaN(d.getTime());
    const currentDateLabel = isValid
      ? d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '-';
    const currentTimeLabel = isValid
      ? d.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      : '-';
    const initialDateString = isValid
      ? this.toDateString(appointmentValue)
      : this.toDateString(new Date());
    const requestId = this.getRequestId(item);
    const referenceLabel =
      request?.referenceCode ||
      request?.code ||
      request?.displayId ||
      (requestId ? `#D-${String(requestId).slice(-6)}` : '');
    return {
      propertyTitle: card.propertyTitle,
      statusLabel: 'Confirmed',
      referenceLabel,
      currentDateLabel,
      currentTimeLabel,
      viewingTypeLabel:
        request?.viewingTypeLabel ||
        request?.viewingType ||
        request?.appointmentTypeLabel ||
        'In-Person Viewing',
      initialDateString,
      initialTimeLabel: currentTimeLabel,
    };
  };

  filterAppointmentsBySelectedDate = appointments => {
    const selectedDate = this.state.selectedDateString;
    if (!selectedDate) {
      this.setState({filteredAppointments: []});
      return;
    }
    const filtered = (appointments || []).filter(item => {
      const dateValue = this.getAppointmentDateValue(item);
      if (!dateValue) {
        return false;
      }
      return appointmentDayKey(dateValue) === selectedDate;
    });
    if (filtered.length > 0) {
      this.chainedEmptyFilterLoads = 0;
    }
    this.setState({filteredAppointments: filtered}, () => {
      setTimeout(() => {
        if (filtered.length > 0) {
          return;
        }
        const {hasMore, isLoading, isLoadingMore, selectedDateString} = this.state;
        if (
          !hasMore ||
          isLoading ||
          isLoadingMore ||
          !selectedDateString ||
          !(appointments || []).length ||
          this.chainedEmptyFilterLoads >= 40
        ) {
          return;
        }
        this.chainedEmptyFilterLoads += 1;
        this.fetchAppointments();
      }, 0);
    });
  };

  fetchAppointments = async ({reset = false, fromRefresh = false} = {}) => {
    const {isLoading, isLoadingMore, hasMore, page} = this.state;
    if (!reset && (isLoading || isLoadingMore || !hasMore)) {
      return;
    }

    if (reset) {
      this.chainedEmptyFilterLoads = 0;
    }

    const nextPage = reset ? 1 : page + 1;
    const requestId = this.latestRequestId + 1;
    this.latestRequestId = requestId;

    this.setState({
      isLoading: reset && !fromRefresh,
      isRefreshing: fromRefresh,
      isLoadingMore: !reset,
    });

    try {
      const payload = {
        status: 'accepted',
        page: nextPage,
        limit: PAGE_LIMIT,
      };
      this.logApi('LISTING:REQUEST', {
        endpoint: '/request-viewing/listing',
        method: 'POST',
        payload,
        meta: {reset, fromRefresh},
      });
      const response = await makeRequestViewingListingRequest(payload);
      this.logApi('LISTING:SUCCESS', response);

      if (requestId !== this.latestRequestId) return;

      const fetchedItems = this.getRequestsListFromResponse(response);
      this.logApi('LISTING:PARSED', {
        fetchedCount: fetchedItems.length,
        page: nextPage,
      });
      const mergedAppointments = reset
        ? fetchedItems
        : [...this.state.appointments, ...fetchedItems];
      this.setState(
        {
          appointments: mergedAppointments,
          page: nextPage,
          hasMore: this.getHasMoreFromResponse(response, fetchedItems.length, nextPage),
        },
        () => this.filterAppointmentsBySelectedDate(this.state.appointments),
      );
    } catch (e) {
      this.logApi('LISTING:ERROR', {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      if (requestId === this.latestRequestId) {
        errorToast('Failed to load appointments');
      }
    } finally {
      if (requestId === this.latestRequestId) {
        this.setState({
          isLoading: false,
          isRefreshing: false,
          isLoadingMore: false,
        });
      }
    }
  };

  handleDateSelect = index => {
    this.chainedEmptyFilterLoads = 0;
    const selectedDateString = this.state?.dates?.[index]?.dateString || '';
    this.setState({selectedDateIndex: index, selectedDateString}, () =>
      this.filterAppointmentsBySelectedDate(this.state.appointments),
    );
  };

  handleReschedule = appointment => {
    const requestId = this.getRequestId(appointment);
    if (!requestId) {
      errorToast('Invalid appointment');
      return;
    }
    this.setState({
      actionTargetItem: appointment,
      showRescheduleModal: true,
      showCancelModal: false,
    });
  };

  handleCancel = appointment => {
    const requestId = this.getRequestId(appointment);
    if (!requestId) {
      errorToast('Invalid appointment');
      return;
    }
    this.setState({
      actionTargetItem: appointment,
      showCancelModal: true,
      showRescheduleModal: false,
    });
  };

  closeActionModals = () => {
    this.setState({
      showRescheduleModal: false,
      showCancelModal: false,
      actionTargetItem: null,
    });
  };

  submitRescheduleFromModal = async ({rescheduleDate, updateMessage}) => {
    const appointment = this.state.actionTargetItem;
    const t = this.props.t || this.props.i18n?.t;
    const requestId = appointment ? this.getRequestId(appointment) : '';
    if (!requestId) {
      errorToast('Invalid appointment');
      return;
    }
    if (!rescheduleDate || !String(rescheduleDate).trim()) {
      errorToast(
        t('APPOINTMENTS_SCREEN.RESCHEDULE_DATE_REQUIRED', {
          defaultValue: 'Please select a valid date and time',
        }),
        t,
      );
      return;
    }

    this.setState({actionLoadingId: requestId, actionType: 'reschedule'});
    try {
      const payload = {
        requestId,
        status: 'rescheduled',
        rescheduleDate: String(rescheduleDate).trim(),
        updateMessage: updateMessage || '',
      };
      this.logApi('RESCHEDULE:REQUEST', {
        endpoint: '/request-viewing/action',
        method: 'POST',
        payload,
      });
      const response = await makeRequestViewingActionRequest(payload);
      this.logApi('RESCHEDULE:SUCCESS', response);
      successToast(
        t('APPOINTMENTS_SCREEN.RESCHEDULE_SUCCESS', {
          defaultValue: 'Appointment rescheduled',
        }),
        t,
      );
      this.closeActionModals();
      this.fetchAppointments({reset: true});
    } catch (e) {
      this.logApi('RESCHEDULE:ERROR', {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      errorToast(
        t('APPOINTMENTS_SCREEN.RESCHEDULE_FAILED', {
          defaultValue: 'Failed to reschedule appointment',
        }),
        t,
      );
    } finally {
      this.setState({actionLoadingId: '', actionType: ''});
    }
  };

  submitCancelFromModal = async ({updateMessage}) => {
    const appointment = this.state.actionTargetItem;
    const t = this.props.t || this.props.i18n?.t;
    const requestId = appointment ? this.getRequestId(appointment) : '';
    if (!requestId) {
      errorToast('Invalid appointment');
      return;
    }

    this.setState({actionLoadingId: requestId, actionType: 'cancel'});
    try {
      const payload = {
        requestId,
        status: 'cancelled',
        updateMessage: updateMessage || '',
      };
      this.logApi('CANCEL:REQUEST', {
        endpoint: '/request-viewing/action',
        method: 'POST',
        payload,
      });
      const response = await makeRequestViewingActionRequest(payload);
      this.logApi('CANCEL:SUCCESS', response);
      successToast(
        t('APPOINTMENTS_SCREEN.CANCEL_SUCCESS', {
          defaultValue: 'Appointment cancelled',
        }),
        t,
      );
      this.closeActionModals();
      this.setState(
        prev => ({
          appointments: prev.appointments.filter(
            row => this.getRequestId(row) !== requestId,
          ),
        }),
        () => this.filterAppointmentsBySelectedDate(this.state.appointments),
      );
    } catch (e) {
      this.logApi('CANCEL:ERROR', {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
      });
      errorToast(
        t('APPOINTMENTS_SCREEN.CANCEL_FAILED', {
          defaultValue: 'Failed to cancel appointment',
        }),
        t,
      );
    } finally {
      this.setState({actionLoadingId: '', actionType: ''});
    }
  };

  handleLocationPress = appointment => {
    const detailParams = this.mapAppointmentDetailParams(appointment);
    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.APPOINTMENT_DETAIL_SCREEN,
      params: detailParams,
    });
  };

  handleMessagePress = appointment => {
    const request = this.getRequest(appointment);
    const client =
      (typeof request?.userId === 'object' ? request?.userId : null) ||
      request?.client ||
      request?.customer ||
      request?.user ||
      {};
    const chatId = request?.chatId || request?.chat?._id || request?.chat?.id || '';
    const contactName =
      client?.name ||
      client?.fullName ||
      [client?.firstName, client?.lastName].filter(Boolean).join(' ') ||
      'Client';
    const userId =
      (typeof request?.userId === 'string'
        ? request?.userId
        : request?.userId?._id) ||
      client?._id ||
      client?.id ||
      '';

    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.CHAT_SCREEN,
      params: {chatId, contactName, userId},
    });
  };

  handleOpenDatePicker = () => {
    this.setState({showDatePickerModal: true});
  };

  handleCloseDatePicker = () => {
    this.setState({showDatePickerModal: false});
  };

  handleDateConfirm = selectedDate => {
    this.chainedEmptyFilterLoads = 0;
    const s = String(selectedDate || '').trim();
    const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    let anchor;
    let selectedDateString;
    if (ymd) {
      const y = Number(ymd[1]);
      const mo = Number(ymd[2]) - 1;
      const d = Number(ymd[3]);
      anchor = new Date(y, mo, d, 12, 0, 0, 0);
      selectedDateString = `${ymd[1]}-${ymd[2]}-${ymd[3]}`;
    } else {
      anchor = new Date(s);
      if (Number.isNaN(anchor.getTime())) {
        this.setState({showDatePickerModal: false});
        return;
      }
      selectedDateString = toLocalDateString(anchor);
    }
    const dates = this.buildDateStrip(anchor);
    const selectedDateIndex = dates.findIndex(
      item => item.dateString === selectedDateString,
    );
    this.setState(
      {
        showDatePickerModal: false,
        dates,
        selectedDateString,
        selectedDateIndex: selectedDateIndex >= 0 ? selectedDateIndex : 0,
      },
      () => this.filterAppointmentsBySelectedDate(this.state.appointments),
    );
  };

  handleLoadMore = () => {
    this.fetchAppointments();
  };

  handleRefresh = () => {
    this.fetchAppointments({reset: true, fromRefresh: true});
  };

  renderHeader = () => {
    const {t} = this.props?.i18n;
    return (
      <View>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <StyledText
              size={24}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.headerTitle}>
              {t('APPOINTMENTS_SCREEN.APPOINTMENTS')}
            </StyledText>
            <StyledText
              size={14}
              variant="medium"
              color={COLORS.GREYSCALE_700}
              textStyle={styles.headerSubtitle}>
              {t(
                'APPOINTMENTS_SCREEN.TRACK_YOUR_UPCOMING_VIEWINGS_APPOINTMENTS',
              )}
            </StyledText>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              style={styles.headerIconBtn}
              onPress={this.handleOpenDatePicker}>
              <CalenderIcon size={24} color={COLORS.GREYSCALE_900} />
            </Pressable>
            <Pressable
              onPress={() =>
                this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
                  screen: NAVIGATION.COMMON.CALENDER_MANAGEMENT_SCREEN,
                })
              }
              style={[styles.headerIconBtn, styles.headerIconBtnSpacing]}>
              <SettingsIcon size={24} color={COLORS.GREYSCALE_900} />
            </Pressable>
          </View>
        </View>

        {/* Date Selection Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScrollView}
          contentContainerStyle={styles.dateScrollContainer}>
          {this.state.dates.map((dateItem, index) => {
            const isSelected = index === this.state.selectedDateIndex;
            return (
              <TouchableOpacity
                key={dateItem.id}
                onPress={() => this.handleDateSelect(index)}
                style={[
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                ]}>
                <StyledText
                  size={18}
                  variant="bold"
                  color={isSelected ? COLORS.WHITE : COLORS.GREYSCALE_900}>
                  {dateItem.day}
                </StyledText>
                <StyledText
                  size={14}
                  color={isSelected ? COLORS.WHITE : COLORS.GREYSCALE_500}>
                  {dateItem.dayName}
                </StyledText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Today Appointments Section Title */}
        <View style={styles.appointmentsSection}>
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.sectionTitle}>
            {t('APPOINTMENTS_SCREEN.TODAY_APPOINTMENTS')}
          </StyledText>
        </View>
      </View>
    );
  };

  renderAppointmentCard = ({item}) => {
    const card = this.mapAppointmentCardProps(item);
    const t = this.props.t || this.props.i18n?.t;
    return (
      <AppointmentCard
        propertyTitle={card.propertyTitle}
        developer={card.developer}
        location={card.location}
        clientName={card.clientName}
        clientImage={card.clientImage}
        isVerified={card.isVerified}
        appointmentDate={card.appointmentDate}
        onReschedule={() => this.handleReschedule(item)}
        onCancel={() => this.handleCancel(item)}
        onLocationPress={() => this.handleLocationPress(item)}
        onMessagePress={() => this.handleMessagePress(item)}
        rescheduleTitle={t('APPOINTMENTS_SCREEN.RESCHEDULE_CTA', {
          defaultValue: 'Reschedule',
        })}
        cancelTitle={t('APPOINTMENTS_SCREEN.CANCEL_CTA', {
          defaultValue: 'Cancel',
        })}
      />
    );
  };

  renderEmptyState = () => {
    const {t} = this.props?.i18n;
    return (
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateIconContainer}>
          <CalenderIcon size={50} color={COLORS.GREYSCALE_900} />
        </View>
        <StyledText
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.emptyStateTitle}>
          {t('APPOINTMENTS_SCREEN.EMPTY_STATE_TITLE')}
        </StyledText>
        <StyledText
          size={14}
          variant="regular"
          color={COLORS.GREYSCALE_700}
          textStyle={styles.emptyStateDescription}
          textAlign="center">
          {t('APPOINTMENTS_SCREEN.EMPTY_STATE_DESCRIPTION')}
        </StyledText>
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {
      filteredAppointments,
      isLoading,
      isRefreshing,
      actionTargetItem,
      showRescheduleModal,
      showCancelModal,
      actionLoadingId,
      actionType,
    } = this.state;

    const modalSummary = actionTargetItem
      ? this.mapAppointmentModalSummary(actionTargetItem)
      : null;
    const modalRequestId = actionTargetItem
      ? this.getRequestId(actionTargetItem)
      : '';

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item, index) => this.getRequestId(item) || String(index)}
          renderItem={this.renderAppointmentCard}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmptyState}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={this.handleRefresh}
          ListFooterComponent={
            this.state.isLoadingMore ? (
              <View style={{paddingVertical: 16}}>
                <ActivityIndicator color={COLORS.PRIMARY} size="small" />
              </View>
            ) : null
          }
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={COLORS.PRIMARY} size="small" />
          </View>
        )}

        {/* Date Picker Modal */}
        <DatePickerModal
          visible={this.state.showDatePickerModal}
          onClose={this.handleCloseDatePicker}
          onConfirm={this.handleDateConfirm}
          initialDate={
            this.state.dates[this.state.selectedDateIndex]?.dateString ||
            toLocalDateString(new Date())
          }
        />

        <RescheduleAppointmentModal
          visible={showRescheduleModal}
          onClose={this.closeActionModals}
          onConfirm={this.submitRescheduleFromModal}
          summary={modalSummary}
          bottomOffset={insetBottom}
          isSubmitting={
            !!modalRequestId &&
            actionLoadingId === modalRequestId &&
            actionType === 'reschedule'
          }
        />
        <CancelAppointmentModal
          visible={showCancelModal}
          onClose={this.closeActionModals}
          onConfirmCancel={this.submitCancelFromModal}
          summary={modalSummary}
          bottomOffset={insetBottom}
          isSubmitting={
            !!modalRequestId &&
            actionLoadingId === modalRequestId &&
            actionType === 'cancel'
          }
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(AppointmentsScreen));
