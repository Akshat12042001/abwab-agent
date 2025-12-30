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
import {COLORS} from '../../../constants';
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

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
    // Mock messages data - in real app, this would come from API/state management
    const mockMessages = [
      {
        id: '1',
        senderName: 'Ahmed Elghandour',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Thanks for sharing.',
        timestamp: '2 min ago',
        unreadCount: 0,
        isUnread: false,
      },
      {
        id: '2',
        senderName: 'Sarah Ali',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Okay, got it.',
        timestamp: '30 minute ago',
        unreadCount: 0,
        isUnread: false,
      },
      {
        id: '3',
        senderName: 'Robert Willions',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'We can schedule our home tour?',
        timestamp: '2 hours ago',
        unreadCount: 2,
        isUnread: true,
      },
      {
        id: '4',
        senderName: 'Perry Mate',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Can we have call now?',
        timestamp: '1 day ago',
        unreadCount: 0,
        isUnread: false,
      },
      {
        id: '5',
        senderName: 'Adam Mostafa',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Can you share your location details',
        timestamp: '1 day ago',
        unreadCount: 0,
        isUnread: false,
      },
      {
        id: '6',
        senderName: 'Alexa Johnson',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Can you share your location details',
        timestamp: '1 day ago',
        unreadCount: 0,
        isUnread: false,
      },
      {
        id: '7',
        senderName: 'Nancy Malak',
        senderImage: ASSETS.IMAGES.PERSON,
        location: 'Palm Hills Villa - New Cairo',
        lastMessage: 'Thanks.',
        timestamp: '3 day ago',
        unreadCount: 0,
        isUnread: false,
      },
    ];

    this.state = {
      messages: mockMessages,
      searchQuery: '',
      isSearchFocused: false,
    };
  }

  handleNotificationPress = () => {
    console.log('Notification pressed');
    // Navigate to notifications screen
  };

  handleMessagePress = messageId => {
    console.log('Message pressed:', messageId);
    // Navigate to chat screen
  };

  handleSearchChange = text => {
    this.setState({searchQuery: text});
    // Filter messages based on search query
    // In real app, this would filter the messages array
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
        onPress={() => this.handleMessagePress(item.id)}
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
    const {messages} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={this.renderMessageItem}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmptyState}
          contentContainerStyle={
            messages.length === 0
              ? styles.emptyListContainer
              : styles.listContainer
          }
          showsVerticalScrollIndicator={false}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(MessagesScreen));
