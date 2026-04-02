import React, {Component} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {
  NotificationIcon,
  MessageBubbleIcon,
  SearchIcon,
  CloseIcon,
} from '../../../components/svgs';
import styles from './styles';
import {ASSETS} from '../../../constants/assets';
import {makeChatListRequest} from '../../../api/chat';
import {errorToast} from '../../../utils/alerts';

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      searchQuery: '',
      isSearchFocused: false,
      page: 1,
      limit: 10,
      hasMore: true,
      isLoading: false,
      isRefreshing: false,
      isLoadingMore: false,
    };
  }

  componentDidMount() {
    this.fetchChats({reset: true});
  }

  getChatsFromResponse = response => {
    const candidates = [
      response?.data?.data,
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

  formatTimeAgo = dateValue => {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return '';
    const diffMs = Date.now() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} hours ago`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD} day ago`;
  };

  mapChatToRow = chat => {
    const participant =
      chat?.client || chat?.user || chat?.customer || chat?.participant || {};
    const lastMessage = chat?.lastMessage || chat?.last_message || {};

    const resolvedChatId =
      chat?._id ||
      chat?.id ||
      chat?.chatId ||
      chat?.conversationId ||
      chat?.roomId ||
      chat?.chat?._id ||
      chat?.chat?.id ||
      chat?.conversation?._id ||
      chat?.conversation?.id ||
      '';

    return {
      id: String(resolvedChatId || Math.random().toString(16).slice(2)),
      chatId: String(resolvedChatId || ''),
      senderName:
        participant?.name ||
        participant?.fullName ||
        [participant?.firstName, participant?.lastName].filter(Boolean).join(' ') ||
        'Client',
      senderImage: participant?.image || participant?.avatar
        ? {uri: participant?.image || participant?.avatar}
        : ASSETS.IMAGES.PERSON,
      location:
        chat?.property?.name ||
        chat?.property?.title ||
        chat?.propertyName ||
        chat?.location ||
        '',
      lastMessage: lastMessage?.content || lastMessage?.text || chat?.lastMessageContent || '',
      timestamp: this.formatTimeAgo(lastMessage?.createdAt || chat?.updatedAt || chat?.createdAt),
      unreadCount: Number(chat?.unreadCount || chat?.unread || 0),
      isUnread: Number(chat?.unreadCount || chat?.unread || 0) > 0,
    };
  };

  fetchChats = async ({reset = false, fromRefresh = false} = {}) => {
    const {t} = this.props?.i18n;
    const {isLoading, isLoadingMore, hasMore, page, limit, searchQuery} = this.state;

    if (!reset && (isLoading || isLoadingMore || !hasMore)) return;

    const nextPage = reset ? 1 : page + 1;
    this.setState({
      isLoading: reset && !fromRefresh,
      isLoadingMore: !reset,
      isRefreshing: fromRefresh,
    });

    try {
      const response = await makeChatListRequest({
        search: searchQuery,
        page: nextPage,
        limit,
      });
      const list = this.getChatsFromResponse(response);
      const mapped = list.map(this.mapChatToRow);
      const pagination = response?.data?.pagination || response?.pagination;
      const totalPages = Number(pagination?.totalPages) || 0;
      const hasMoreFromPagination =
        totalPages > 0 ? nextPage < totalPages : list.length >= limit;

      this.setState(prev => ({
        chats: reset ? mapped : [...prev.chats, ...mapped],
        page: nextPage,
        hasMore: hasMoreFromPagination,
      }));
    } catch (e) {
      errorToast(
        t('MESSAGES_SCREEN.FAILED_TO_LOAD', {defaultValue: 'Failed to load chats'}),
        t,
      );
    } finally {
      this.setState({isLoading: false, isLoadingMore: false, isRefreshing: false});
    }
  };

  handleNotificationPress = () => {
    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.NOTIFICATIONS_SCREEN,
    });
  };

  handleMessagePress = item => {
    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.CHAT_SCREEN,
      params: {
        chatId: item.chatId,
        contactName: item.senderName,
        contactLocation: item.location,
      },
    });
  };

  handleSearchChange = text => {
    this.setState({searchQuery: text});
    // debounce can be added later; keep simple now
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.fetchChats({reset: true});
    }, 300);
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
              {t('MESSAGES_SCREEN.MESSAGES')}
            </StyledText>
            <StyledText
              size={14}
              variant="medium"
              color={COLORS.GREYSCALE_700}
              textStyle={styles.headerSubtitle}>
              {t('MESSAGES_SCREEN.INBOX_SUBTITLE')}
            </StyledText>
          </View>
          <Pressable
            style={styles.notificationButton}
            onPress={this.handleNotificationPress}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <NotificationIcon size={24} color={COLORS.GREYSCALE_900} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchInputContainer,
              {
                backgroundColor: this.state.isSearchFocused
                  ? COLORS.PRIMARY_20
                  : COLORS.WHITE,
                borderColor: this.state.isSearchFocused
                  ? COLORS.PRIMARY
                  : COLORS.GREYSCALE_300,
              },
            ]}>
            {!this.state.searchQuery && (
              <SearchIcon size={20} color={COLORS.GREYSCALE_700} />
            )}
            <TextInput
              onFocus={() => this.setState({isSearchFocused: true})}
              onBlur={() => this.setState({isSearchFocused: false})}
              style={styles.searchInput}
              placeholder={t('MESSAGES_SCREEN.SEARCH')}
              placeholderTextColor={COLORS.GREYSCALE_500}
              value={this.state.searchQuery}
              onChangeText={this.handleSearchChange}
            />
            {!!this.state.searchQuery && (
              <TouchableOpacity
                onPress={() => this.setState({searchQuery: ''})}
                style={styles.closeIconContainer}>
                <CloseIcon size={20} color={COLORS.GREYSCALE_900} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  renderMessageItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => this.handleMessagePress(item)}
        activeOpacity={0.7}>
        <Image
          source={item.senderImage}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.senderName}>
              {item.senderName}
            </StyledText>
            <StyledText
              size={12}
              variant="regular"
              color={COLORS.GREYSCALE_500}
              textStyle={styles.timestamp}>
              {item.timestamp}
            </StyledText>
          </View>
          <StyledText
            size={14}
            variant="regular"
            color={COLORS.GREYSCALE_500}
            textStyle={styles.locationText}>
            {item.location}
          </StyledText>
          <View style={styles.messageFooter}>
            <StyledText
              size={14}
              variant={item.isUnread ? 'semiBold' : 'regular'}
              color={item.isUnread ? COLORS.PRIMARY : COLORS.GREYSCALE_700}
              textStyle={[
                styles.lastMessage,
                item.isUnread && styles.unreadMessage,
              ]}
              numberOfLines={1}>
              {item.lastMessage}
            </StyledText>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <StyledText size={12} color={COLORS.WHITE} textAlign="center">
                  {item.unreadCount}
                </StyledText>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmptyState = () => {
    const {t} = this.props?.i18n;
    return (
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateIconContainer}>
          <MessageBubbleIcon size={50} color={COLORS.GREYSCALE_900} />
        </View>
        <StyledText
          variant="bold"
          size={18}
          color={COLORS.GREYSCALE_900}
          textStyle={styles.emptyStateTitle}>
          {t('MESSAGES_SCREEN.NO_MESSAGES_YET')}
        </StyledText>
        <StyledText
          size={14}
          variant="regular"
          color={COLORS.GREYSCALE_700}
          textStyle={styles.emptyStateDescription}
          textAlign="center">
          {t('MESSAGES_SCREEN.EMPTY_STATE_DESCRIPTION')}
        </StyledText>
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {chats, isRefreshing} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={this.renderMessageItem}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmptyState}
          contentContainerStyle={
            chats.length === 0
              ? styles.emptyListContainer
              : styles.listContainer
          }
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={() => this.fetchChats({reset: true, fromRefresh: true})}
          onEndReached={() => this.fetchChats()}
          onEndReachedThreshold={0.2}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(MessagesScreen));
