import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {RequestItemCard, AnimatedButtons} from '../../../components/molecules';
import {COLORS, NAVIGATION, SCREEN} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {
  makeRequestViewingActionRequest,
  makeRequestViewingListingRequest,
} from '../../../api/auth';
import {errorToast, successToast} from '../../../utils/alerts';

const STATUS_TABS = ['pending', 'accepted', 'declined'];
const PAGE_LIMIT = 10;

class ViewingRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
      requestsList: [],
      page: 1,
      hasMore: true,
      isLoading: false,
      isLoadingMore: false,
      isRefreshing: false,
      actionLoadingId: '',
    };
    this.latestRequestId = 0;
  }

  componentDidMount() {
    this.fetchViewingRequests({reset: true});
  }

  getStatusFromTab = index => STATUS_TABS[index] || STATUS_TABS[0];

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
      Number(pagination?.last_page) ||
      Number(response?.data?.totalPages) ||
      Number(response?.totalPages) ||
      0;

    if (totalPages > 0) {
      return currentPage < totalPages;
    }

    return fetchedItemsCount >= PAGE_LIMIT;
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
    const request =
      item?.requestViewing || item?.request || item?.viewingRequest || item;
    const property =
      request?.property ||
      (typeof request?.propertyId === 'object' ? request?.propertyId : null) ||
      request?.listing ||
      request?.propertyDetails ||
      request?.unit ||
      {};
    const client =
      request?.client ||
      request?.customer ||
      request?.user ||
      (typeof request?.userId === 'object' ? request?.userId : null) ||
      request?.lead ||
      request?.agent ||
      {};

    const pickFirst = (...values) => values.find(value => !!value);

    const propertyImageUri = pickFirst(
      property?.mainImage,
      property?.image,
      property?.imageUrl,
      request?.propertyImage,
      request?.listingImage,
      request?.thumbnail,
    );
    const agentImageUri = pickFirst(
      client?.avatar,
      client?.image,
      client?.profileImage,
      request?.agentImage,
    );

    return {
      propertyName: pickFirst(
        property?.name,
        property?.title,
        request?.propertyName,
        request?.listingTitle,
        request?.title,
        'Property',
      ),
      location: pickFirst(
        property?.address,
        property?.location,
        [property?.area, property?.city].filter(Boolean).join(', '),
        property?.area,
        request?.location,
        request?.address,
        '-',
      ),
      agentName: pickFirst(
        client?.name,
        client?.fullName,
        client?.full_name,
        request?.agentName,
        request?.clientName,
        '-',
      ),
      propertyImage: propertyImageUri ? {uri: propertyImageUri} : undefined,
      agentImage: agentImageUri ? {uri: agentImageUri} : undefined,
      appointmentDate: this.formatAppointmentDate(
        pickFirst(
          request?.appointmentDate,
          request?.appointment_date,
          request?.appointmentAt,
          request?.meetingDate,
          request?.meeting_date,
          request?.date,
          request?.createdAt,
        ),
      ),
      appointmentType: (() => {
        const typeValue =
          pickFirst(
            request?.appointmentType,
            request?.meetingType,
            request?.type,
          ) || (request?.isVirtual ? 'video_call' : 'in_person');

        if (typeValue === 'in_person') {
          return 'In-person';
        }
        if (typeValue === 'video_call') {
          return 'Video';
        }
        return typeValue;
      })(),
      agentMessage: pickFirst(
        request?.specialNotes,
        request?.message,
        request?.note,
        request?.notes,
        request?.comment,
        '',
      ),
    };
  };

  fetchViewingRequests = async ({reset = false, fromRefresh = false} = {}) => {
    const {selectedTabIndex, isLoading, isLoadingMore, hasMore, page, requestsList} =
      this.state;
    const {t} = this.props?.i18n;

    if (!reset && (isLoading || isLoadingMore || !hasMore)) {
      return;
    }

    // Avoid onEndReached firing page 2+ while list is still empty (e.g. first request failed).
    if (!reset && !fromRefresh && requestsList.length === 0) {
      return;
    }

    const nextPage = reset ? 1 : page + 1;
    const requestId = this.latestRequestId + 1;
    this.latestRequestId = requestId;

    this.setState({
      isLoading: reset && !fromRefresh,
      isLoadingMore: !reset,
      isRefreshing: fromRefresh,
    });

  const params = {
  status: this.getStatusFromTab(selectedTabIndex),
  page: nextPage,
  limit: PAGE_LIMIT,
  sort: [
    {
      field: 'createdAt',
      order: -1,
    },
  ],
};
    try {
      const response = await makeRequestViewingListingRequest(params);

      if (requestId !== this.latestRequestId) {
        return;
      }

      const fetchedItems = this.getRequestsListFromResponse(response);
      const hasMoreItems = this.getHasMoreFromResponse(
        response,
        fetchedItems.length,
        nextPage,
      );

      this.setState(prevState => ({
        requestsList: reset
          ? fetchedItems
          : [...prevState.requestsList, ...fetchedItems],
        page: nextPage,
        hasMore: hasMoreItems,
      }));
    } catch (e) {
      if (requestId === this.latestRequestId) {
        errorToast(
          t?.('HOME_SCREEM.FAILED_TO_LOAD_VIEWING_REQUESTS', {
            defaultValue: 'Failed to load viewing requests',
          }),
          t,
        );
      }
    } finally {
      if (requestId === this.latestRequestId) {
        this.setState({
          isLoading: false,
          isLoadingMore: false,
          isRefreshing: false,
        });
      }
    }
  };

  getRequestId = item => {
    const request =
      item?.requestViewing || item?.request || item?.viewingRequest || item || {};
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

  handleRequestAction = async (item, status) => {
    const {t} = this.props?.i18n;
    const requestId = this.getRequestId(item);
    if (!requestId) {
      errorToast('Invalid request id', t);
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
          ? t?.('HOME_SCREEM.REQUEST_ACCEPTED', {
              defaultValue: 'Request accepted',
            })
          : t?.('HOME_SCREEM.REQUEST_DECLINED', {
              defaultValue: 'Request declined',
            }),
        t,
      );

      if (
        status === 'accepted' &&
        this.getStatusFromTab(this.state.selectedTabIndex) === 'accepted'
      ) {
        this.setState(prevState => ({
          requestsList: prevState.requestsList.map(requestItem =>
            this.getRequestId(requestItem) === requestId
              ? {...requestItem, status: 'accepted'}
              : requestItem,
          ),
        }));
      } else if (
        status === 'declined' &&
        this.getStatusFromTab(this.state.selectedTabIndex) === 'declined'
      ) {
        this.setState(prevState => ({
          requestsList: prevState.requestsList.map(requestItem =>
            this.getRequestId(requestItem) === requestId
              ? {...requestItem, status: 'declined'}
              : requestItem,
          ),
        }));
      } else {
        this.setState(prevState => ({
          requestsList: prevState.requestsList.filter(
            requestItem => this.getRequestId(requestItem) !== requestId,
          ),
        }));
      }
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

  handleTabChange = index => {
    this.setState(
      {
        selectedTabIndex: index,
        requestsList: [],
        page: 1,
        hasMore: true,
      },
      () => this.fetchViewingRequests({reset: true}),
    );
  };

  handleLoadMore = () => {
    this.fetchViewingRequests();
  };

  handleRefresh = () => {
    this.fetchViewingRequests({reset: true, fromRefresh: true});
  };

  handleChatWithClient = item => {
    const request =
      item?.requestViewing || item?.request || item?.viewingRequest || item;
    const client =
      (typeof request?.userId === 'object' ? request?.userId : null) ||
      request?.client ||
      request?.customer ||
      request?.user ||
      {};

    const chatId =
      request?.chatId || request?.chat?._id || request?.chat?.id || '';
    const contactName =
      client?.name ||
      client?.fullName ||
      [client?.firstName, client?.lastName].filter(Boolean).join(' ') ||
      'Client';
    const clientUserId =
      (typeof request?.userId === 'string'
        ? request?.userId
        : request?.userId?._id) ||
      client?._id ||
      client?.id ||
      '';

    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.CHAT_SCREEN,
      params: {
        chatId,
        contactName,
        userId: clientUserId,
      },
    });
  };

  renderListFooter = () => {
    if (!this.state.isLoadingMore) {
      return null;
    }

    return (
      <View style={{paddingVertical: 16}}>
        <ActivityIndicator color={COLORS.PRIMARY} size="small" />
      </View>
    );
  };

  renderListEmpty = () => {
    const {t} = this.props?.i18n;
    if (this.state.isLoading) {
      return (
        <View style={{paddingVertical: 24}}>
          <ActivityIndicator color={COLORS.PRIMARY} size="small" />
        </View>
      );
    }

    return (
      <View style={{paddingVertical: 16}}>
        <StyledText size={14} variant="semiBold" color={COLORS.GREYSCALE_500}>
          {t('HOME_SCREEM.NO_PENDING_VIEWING_REQUESTS', {
            defaultValue: 'No requests found',
          })}
        </StyledText>
      </View>
    );
  };

  render() {
    const {t} = this.props?.i18n;
    const {selectedTabIndex, requestsList, isRefreshing, actionLoadingId} =
      this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={this.props?.insets?.top + 30}>
        <CommonHeader title={t('HOME_SCREEM.VIEWING_REQUESTS')} />
        <View style={styles.tabsContainer}>
          <AnimatedButtons
            options={[
              'HOME_SCREEM.PENDING',
              'HOME_SCREEM.ACCEPTED',
              'HOME_SCREEM.DECLINED',
            ]}
            selectedIndex={selectedTabIndex}
            onSelect={this.handleTabChange}
            containerStyle={styles.tabsWrapper}
          />
        </View>
        <FlatList
          data={requestsList}
          keyExtractor={(item, index) =>
            String(
              item?.id ||
                item?._id ||
                item?.requestId ||
                item?.appointmentId ||
                index,
            )
          }
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.cardWrapper}>
              <RequestItemCard
                containerStyle={{width: SCREEN.WIDTH - 40}}
                {...this.mapRequestItemToCardProps(item)}
                onAccept={() => this.handleRequestAction(item, 'accepted')}
                onDecline={() => this.handleRequestAction(item, 'declined')}
                showChatButton={selectedTabIndex === 1}
                chatButtonTitle={t('HOME_SCREEM.CHAT_WITH_CLIENT', {
                  defaultValue: 'Chat with Client',
                })}
                onChatPress={() => this.handleChatWithClient(item)}
                showButtons={
                  selectedTabIndex === 0 &&
                  actionLoadingId !== this.getRequestId(item)
                }
              />
            </View>
          )}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.2}
          refreshing={isRefreshing}
          onRefresh={this.handleRefresh}
          ListFooterComponent={this.renderListFooter}
          ListEmptyComponent={this.renderListEmpty}
          showsVerticalScrollIndicator={false}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(ViewingRequestScreen));
