import React, {Component} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {
  NotificationIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../../../components/svgs';
import {ASSETS} from '../../../constants/assets';
import {PROFILE_MENU_CONFIG, PROFILE_STATS} from './config';
import styles from './styles';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {
        name: 'Ahmed Hassan',
        image: ASSETS.IMAGES.PERSON,
        isVerified: true,
      },
    };
  }

  handleMenuItemPress = itemId => {
    console.log('Menu item pressed:', itemId);
    // Handle navigation to respective screens
  };

  handleLogout = () => {
    console.log('Logout pressed');
    // Handle logout
  };

  handleNotificationPress = () => {
    console.log('Notification pressed');
    // Navigate to notifications screen
  };

  renderProfileCard = () => {
    const {t} = this.props?.i18n;
    const {profileData} = this.state;

    return (
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image
            source={profileData.image}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <StyledText
              size={16}
              variant="semiBold"
              color={COLORS.WHITE}
              textStyle={styles.profileName}>
              {profileData.name}
            </StyledText>
            {profileData.isVerified && (
              <View style={styles.verifiedBadge}>
                <View style={styles.checkContainer}>
                  <CheckIcon size={12} color={COLORS.WHITE} />
                </View>
                <StyledText
                  size={12}
                  variant="bold"
                  color={COLORS.WHITE}
                  textStyle={styles.verifiedText}>
                  {t('PROFILE_SCREEN.VERIFIED_AGENT')}
                </StyledText>
              </View>
            )}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {PROFILE_STATS.map(stat => (
            <View key={stat.id} style={styles.statBox}>
              <StyledText
                size={20}
                variant="bold"
                color={COLORS.WHITE}
                textStyle={styles.statValue}>
                {stat.value}
              </StyledText>
              <StyledText
                size={12}
                variant="medium"
                color={COLORS.PRIMARY_50}
                textStyle={styles.statLabel}>
                {t(stat.label)}
              </StyledText>
            </View>
          ))}
        </View>
      </View>
    );
  };

  renderMenuItemSeparator = () => {
    return <View style={styles.menuItemSeparator} />;
  };

  renderMenuItem = ({item}) => {
    const {t} = this.props?.i18n;
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => this.handleMenuItemPress(item.id)}
        activeOpacity={0.7}>
        <View style={styles.menuItemLeft}>
          {/* Icon placeholder - will be replaced with actual icon component */}
          <View style={styles.menuItemIcon}>{item.icon}</View>
          <View style={styles.menuItemText}>
            <StyledText
              size={14}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.menuItemTitle}>
              {t(item.title)}
            </StyledText>
            <StyledText
              size={12}
              variant="regular"
              color={COLORS.GREYSCALE_700}
              textStyle={styles.menuItemSubtitle}>
              {t(item.subtitle)}
            </StyledText>
          </View>
        </View>
        <ArrowRightIcon color={COLORS.GREYSCALE_700} />
      </TouchableOpacity>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {t} = this.props?.i18n;

    // Group by section for rendering
    const sections = PROFILE_MENU_CONFIG.map(section => ({
      ...section,
      data: section.items,
    }));

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        {/* Header */}
        <View style={styles.header}>
          <StyledText
            size={24}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.headerTitle}>
            {t('PROFILE_SCREEN.MY_PROFILE')}
          </StyledText>
          <Pressable
            style={styles.notificationButton}
            onPress={this.handleNotificationPress}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <NotificationIcon size={24} color={COLORS.GREYSCALE_900} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: insetBottom + 20},
          ]}>
          {/* Profile Card */}
          {this.renderProfileCard()}

          {/* Menu Sections */}
          {sections.map(section => (
            <View key={section.id} style={styles.section}>
              <StyledText
                size={16}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.sectionTitle}>
                {t(section.sectionTitle)}
              </StyledText>
              <FlatList
                data={section.items}
                renderItem={this.renderMenuItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                ItemSeparatorComponent={this.renderMenuItemSeparator}
              />
            </View>
          ))}

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this.handleLogout}
              activeOpacity={0.8}>
              <StyledText
                size={14}
                variant="bold"
                color={COLORS.RED_NOTIFICATION}>
                {t('PROFILE_SCREEN.LOGOUT')}
              </StyledText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(ProfileScreen));
