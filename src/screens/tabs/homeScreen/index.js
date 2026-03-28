import React from 'react';
import {Component} from 'react';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ASSETS} from '../../../constants/assets';
import {COLORS, NAVIGATION, SCREEN, SCREEN_PADDING} from '../../../constants';
import {MedalIcon, NotificationIcon} from '../../../components/svgs';
import {
  RequestItemCard,
  AnimatedButtons,
  VisitsReservationsChart,
  ConversationRateBarGraph,
  CommissionTrackingChart,
} from '../../../components/molecules';
import {NewRequestModal} from '../../../components/modals';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {withTranslation} from 'react-i18next';
import {
  makeRequestViewingActionRequest,
  makeRequestViewingListingRequest,
} from '../../../api/auth';
import {errorToast, successToast} from '../../../utils/alerts';

const data = [
  {
    label: 'HOME_SCREEM.TOTAL_VISITS',
    value: 342,
  },
  {
    label: 'HOME_SCREEM.RESERVATIONS',
    value: 123,
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      selectedPeriodIndex: 0,
      showAllMonths: false,
      showNewRequestModal: false,
      isRequestsLoading: false,
      actionLoadingId: '',
      requestsList: [],
    };
  }

  componentDidMount() {
    this.fetchViewingRequests();
  }

  getRequestsListFromResponse = response => {
    const candidates = [
      response?.data?.data?.data,
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

  formatAppointmentDate = dateValue => {
    if (!dateValue) {
      return '-';
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
      return String(dateValue);
    }

    return parsedDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  mapRequestItemToCardProps = item => {
    const propertyData =
      item?.property ||
      (typeof item?.propertyId === 'object' ? item?.propertyId : null) ||
      item?.listing;
    const userData =
      item?.client ||
      item?.agent ||
      (typeof item?.userId === 'object' ? item?.userId : null) ||
      item?.user;
    const propertyImageUri =
      propertyData?.mainImage ||
      propertyData?.image ||
      propertyData?.coverImage ||
      item?.propertyImage ||
      item?.listing?.image;
    const agentImageUri =
      userData?.avatar || userData?.image || userData?.profileImage;
    const appointmentTypeRaw =
      item?.appointmentType || item?.meetingType || item?.type || 'in_person';

    return {
      propertyName:
        propertyData?.name ||
        propertyData?.title ||
        propertyData?.projectName ||
        item?.propertyName ||
        'Property',
      location:
        propertyData?.address ||
        propertyData?.location ||
        [propertyData?.area, propertyData?.city].filter(Boolean).join(', ') ||
        item?.location ||
        '-',
      agentName:
        userData?.name ||
        userData?.fullName ||
        [userData?.firstName, userData?.lastName].filter(Boolean).join(' ') ||
        item?.agentName ||
        '-',
      propertyImage: propertyImageUri
        ? {uri: propertyImageUri}
        : ASSETS.IMAGES.DUMMY_IMAGE,
      agentImage: agentImageUri ? {uri: agentImageUri} : ASSETS.IMAGES.PERSON,
      appointmentDate: this.formatAppointmentDate(
        item?.appointmentDate ||
          item?.appointment_date ||
          item?.appointmentAt ||
          item?.date,
      ),
      appointmentType:
        appointmentTypeRaw === 'in_person'
          ? 'In-person'
          : appointmentTypeRaw === 'video_call'
          ? 'Video'
          : appointmentTypeRaw,
      // Keep card layout same as provided design (no extra message block).
      agentMessage: '',
    };
  };

  getRequestId = item => {
    const rawId =
      item?._id ||
      item?.id ||
      item?.requestId ||
      item?.request?._id ||
      item?.request?.id;
    if (typeof rawId === 'object') {
      return String(rawId?._id || rawId?.id || '');
    }
    return String(rawId || '');
  };

  fetchViewingRequests = async () => {
    const {t} = this.props?.i18n;
    this.setState({isRequestsLoading: true});
    try {
      const response = await makeRequestViewingListingRequest({
        page: 1,
        limit: 10,
        status: 'pending',
      });
      const requestsList = this.getRequestsListFromResponse(response);
      this.setState({requestsList});
    } catch (e) {
      errorToast(
        t?.('HOME_SCREEM.FAILED_TO_LOAD_VIEWING_REQUESTS', {
          defaultValue: 'Failed to load viewing requests',
        }),
        t,
      );
    } finally {
      this.setState({isRequestsLoading: false});
    }
  };

  handlePeriodChange = (index, value) => {
    this.setState({selectedPeriodIndex: index});
  };

  handleToggleMonths = () => {
    this.setState(prevState => ({
      showAllMonths: !prevState.showAllMonths,
    }));
  };

  handleOpenNewRequestModal = () => {
    this.setState({showNewRequestModal: true});
  };

  handleNotificationPress = () => {
    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.NOTIFICATIONS_SCREEN,
    });
  };

  handleOpenViewingRequests = () => {
    const parentNavigation = this.props.navigation?.getParent?.();
    const navigator = parentNavigation || this.props.navigation;
    navigator?.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.VIEWING_REQUEST_SCREEN,
    });
  };

  handleCloseNewRequestModal = () => {
    this.setState({showNewRequestModal: false});
  };

  handleAcceptRequest = item => {
    this.handleRequestAction(item, 'accepted');
  };

  handleDeclineRequest = item => {
    this.handleRequestAction(item, 'declined');
  };

  handleRequestAction = async (item, status) => {
    const {t} = this.props?.i18n;
    const requestId = this.getRequestId(item);
    if (!requestId) {
      errorToast(
        t?.('HOME_SCREEM.FAILED_TO_LOAD_VIEWING_REQUESTS', {
          defaultValue: 'Something went wrong',
        }),
        t,
      );
      return;
    }

    this.setState({actionLoadingId: requestId});
    try {
      await makeRequestViewingActionRequest({
        requestId,
        status,
      });
      successToast(
        status === 'accepted'
          ? t?.('HOME_SCREEM.REQUEST_ACCEPTED', {defaultValue: 'Request accepted'})
          : t?.('HOME_SCREEM.REQUEST_DECLINED', {defaultValue: 'Request declined'}),
        t,
      );
      this.setState(prevState => ({
        requestsList: prevState.requestsList.filter(
          requestItem => this.getRequestId(requestItem) !== requestId,
        ),
      }));
    } catch (e) {
      errorToast(
        t?.('HOME_SCREEM.FAILED_TO_LOAD_VIEWING_REQUESTS', {
          defaultValue: 'Failed to update request',
        }),
        t,
      );
    } finally {
      this.setState({actionLoadingId: ''});
    }
  };

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer paddingTop={-1} backgroundColor={COLORS.WHITE}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.profileRow}>
                <Image
                  source={ASSETS.IMAGES.PERSON}
                  style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                  <StyledText size={18} variant="semiBold" color={COLORS.WHITE}>
                    Ahmed Hassan
                  </StyledText>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.WHITE_80}>
                    Palm Hills Brokerage
                  </StyledText>
                </View>
              </View>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={this.handleNotificationPress}>
                <NotificationIcon />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
            <View style={styles.performanceRow}>
              <View style={styles.performanceLabelRow}>
                <MedalIcon />
                <StyledText
                  size={12}
                  variant="semiBold"
                  color={COLORS.WHITE}
                  textStyle={styles.performanceLabelText}>
                  {t('HOME_SCREEM.TODAY_PERFORMANCE')}
                </StyledText>
              </View>
              <Text style={styles.performanceText}>
                5<Text style={styles.performanceSubText}>/5</Text>
              </Text>
            </View>
            <View style={styles.progressBar} />
            <StyledText size={12} color={COLORS.GREYSCALE_300}>
              {t('HOME_SCREEM.YOU_VE_RESPONDED_TO_LEADS_IN_UNDER_2_MINUTES', {
                responded: 4,
                total: 5,
                time: '2 minutes',
              })}
            </StyledText>
          </View>
          <View style={styles.sectionHeader}>
            <StyledText size={18} variant="bold" color={COLORS.TEXT_PRIMARY}>
              {t('HOME_SCREEM.VIEWING_REQUESTS')}
            </StyledText>
            <TouchableOpacity
              onPress={this.handleOpenViewingRequests}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                {t('HOME_SCREEM.SEE_ALL')}
              </StyledText>
            </TouchableOpacity>
          </View>

          <View>
            {this.state.isRequestsLoading ? (
              <View style={{paddingVertical: 24}}>
                <ActivityIndicator color={COLORS.PRIMARY} size="small" />
              </View>
            ) : this.state.requestsList.length ? (
              <FlatList
                horizontal
                data={this.state.requestsList}
                keyExtractor={(item, index) =>
                  String(item?._id || item?.id || item?.requestId || index)
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: SCREEN_PADDING}}
                renderItem={({item}) => (
                  <RequestItemCard
                    containerStyle={{
                      width: SCREEN.WIDTH - 40,
                      marginRight: SCREEN_PADDING,
                    }}
                    {...this.mapRequestItemToCardProps(item)}
                    onAccept={() => this.handleAcceptRequest(item)}
                    onDecline={() => this.handleDeclineRequest(item)}
                    showButtons={this.state.actionLoadingId !== this.getRequestId(item)}
                  />
                )}
              />
            ) : (
              <View style={{paddingHorizontal: SCREEN_PADDING, paddingTop: 20}}>
                <StyledText
                  size={14}
                  variant="semiBold"
                  color={COLORS.GREYSCALE_500}>
                  {t('HOME_SCREEM.NO_PENDING_VIEWING_REQUESTS', {
                    defaultValue: 'No pending viewing requests',
                  })}
                </StyledText>
              </View>
            )}
          </View>
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.TEXT_PRIMARY}
            textStyle={styles.performanceOverviewTitle}>
            {t('HOME_SCREEM.PERFORMANCE_OVERVIEW')}
          </StyledText>
          <AnimatedButtons
            options={['HOME_SCREEM.MONTHLY', 'HOME_SCREEM.YEARLY']}
            selectedIndex={this.state.selectedPeriodIndex}
            onSelect={this.handlePeriodChange}
            containerStyle={styles.segmentedControlContainer}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
            }}>
            {data.map(item => {
              return (
                <View
                  key={item.label}
                  style={{
                    padding: 12,
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 12,
                    ...SharedStyles.shadow,
                    flex: 1,
                    marginHorizontal: SCREEN_PADDING,
                  }}>
                  <StyledText
                    size={12}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_500}>
                    {t(item.label)}
                  </StyledText>
                  <StyledText
                    variant="bold"
                    color={COLORS.PRIMARY}
                    lineHeight={28}>
                    {item.value}
                  </StyledText>
                </View>
              );
            })}
          </View>
          <VisitsReservationsChart
            showAllMonths={this.state.showAllMonths}
            onToggleMonths={this.handleToggleMonths}
          />
          <ConversationRateBarGraph onToggleMonths={this.handleToggleMonths} />
          <CommissionTrackingChart />
        </ScrollView>
        <NewRequestModal
          visible={this.state.showNewRequestModal}
          onClose={this.handleCloseNewRequestModal}
          onAccept={this.handleAcceptRequest}
          onDecline={this.handleDeclineRequest}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(HomeScreen);
