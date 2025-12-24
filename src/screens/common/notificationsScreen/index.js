import React, {Component} from 'react';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {NotificationIcon, CalenderIcon} from '../../../components/svgs';
import styles from './styles';

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          id: '1',
          dateGroup: 'Today',
          title: 'New Viewing Request!',
          description:
            'Ahmed R. wants to see The Palm Jumeirah Villa tomorrow at 3:00 PM. Please respond within 5 minutes.',
          timestamp: '8:15 PM',
        },
        {
          id: '2',
          dateGroup: 'Today',
          title: 'Viewing Rescheduled',
          description:
            'Fatima A. has requested a new time for Jumeirah Beach Residence. New proposed time: Tomorrow, 5:00 PM.',
          timestamp: '8:15 PM',
        },
        {
          id: '3',
          dateGroup: 'Yesterday',
          title: 'KPI Goal Achieved!',
          description:
            'Your average lead response time is now under 2 minutes! Keep up the great work.',
          timestamp: '8:15 PM',
        },
        {
          id: '4',
          dateGroup: 'Yesterday',
          title: "You've Been Rated!",
          description:
            'Very professional and knowledgeable!" - From your viewing with Leila F..',
          timestamp: '8:15 PM',
        },
      ],
    };
  }

  renderNotificationItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.notificationCard}
        activeOpacity={0.9}
        onPress={() => {}}>
        <View style={styles.iconContainer}>
          <CalenderIcon size={20} color={COLORS.WHITE} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <StyledText
              size={14}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.title}>
              {item.title}
            </StyledText>
            <StyledText
              size={12}
              color={COLORS.GREYSCALE_700}
              textStyle={styles.timestamp}>
              {item.timestamp}
            </StyledText>
          </View>
          <StyledText
            size={12}
            variant="regular"
            color={COLORS.GREYSCALE_500}
            textStyle={styles.description}
            lineHeight={20}>
            {item.description}
          </StyledText>
        </View>
      </TouchableOpacity>
    );
  };

  renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <StyledText
          size={14}
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.sectionTitle}>
          {section.title}
        </StyledText>
      </View>
    );
  };

  renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <NotificationIcon size={50} />
        </View>
        <StyledText
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.emptyTitle}>
          No notifications yet
        </StyledText>
        <StyledText
          color={COLORS.GREYSCALE_700}
          size={14}
          textStyle={styles.emptyDescription}
          textAlign="center"
          lineHeight={24}>
          We'll notify you when there's something important — like new listings,
          special deals, or updates on your posted property.
        </StyledText>
      </View>
    );
  };

  getGroupedNotifications = () => {
    const {notifications} = this.state;
    const grouped = {};

    notifications.forEach(notification => {
      const group = notification.dateGroup;
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(notification);
    });

    const sections = Object.keys(grouped).map(group => ({
      title: group,
      data: grouped[group],
    }));

    return sections;
  };

  render() {
    const {t} = this.props?.i18n;
    const sections = this.getGroupedNotifications();

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={this.props?.insets?.top + 30}>
        <CommonHeader title={t('LABELS.NOTIFICATIONS')} />

        <FlatList
          data={sections}
          keyExtractor={(item, index) => `section-${index}`}
          renderItem={({item: section}) => (
            <View>
              {this.renderSectionHeader({section})}
              {section.data.map(notification => (
                <View key={notification.id} style={styles.itemWrapper}>
                  {this.renderNotificationItem({item: notification})}
                </View>
              ))}
            </View>
          )}
          ListEmptyComponent={this.renderEmptyComponent}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(NotificationsScreen));
