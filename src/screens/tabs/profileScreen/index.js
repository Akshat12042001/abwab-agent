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
import {COLORS, NAVIGATION} from '../../../constants';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {
  NotificationIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../../../components/svgs';
import {ASSETS} from '../../../constants/assets';
import {PROFILE_MENU_CONFIG, PROFILE_STATS} from './config';
import styles from './styles';
import {makeGetAgentProfileRequest} from '../../../api/auth';
import {errorToast} from '../../../utils/alerts';
import {reset} from '../../../redux/auth/auth.reducer';
import {ChatSocketService} from '../../../services';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingProfile: false,
      profileData: {
        name: 'Ahmed Hassan',
        image: ASSETS.IMAGES.PERSON,
        isVerified: true,
        stats: PROFILE_STATS,
      },
    };
  }

  componentDidMount() {
    this.fetchAgentProfile();
  }

  getAgentIdFromState = () => {
    const userData = this.props?.userData || {};
    return (
      userData?._id ||
      userData?.id ||
      userData?.agentId ||
      userData?.user?._id ||
      userData?.user?.id ||
      ''
    );
  };

  getProfilePayload = response => {
    const candidates = [
      response?.data?.agent,
      response?.data?.data,
      response?.data,
      response?.agent,
      response,
    ];
    return candidates.find(item => item && typeof item === 'object') || {};
  };

  buildProfileData = payload => {
    const firstName = payload?.firstName || payload?.first_name || '';
    const lastName = payload?.lastName || payload?.last_name || '';
    const fallbackName = [firstName, lastName].filter(Boolean).join(' ').trim();
    const name = payload?.name || payload?.fullName || fallbackName || 'Agent';
    const imageUri =
      payload?.image || payload?.avatar || payload?.profileImage || payload?.photo;
    const isVerified =
      payload?.isVerified ?? payload?.verified ?? payload?.verificationStatus === 'verified';

    const profileStats = PROFILE_STATS.map(stat => {
      if (stat.id === 'rating') {
        return {
          ...stat,
          value: String(payload?.rating ?? payload?.averageRating ?? stat.value),
        };
      }
      if (stat.id === 'completed') {
        return {
          ...stat,
          value: String(
            payload?.completedRequests ??
              payload?.completedViewings ??
              payload?.completed ??
              stat.value,
          ),
        };
      }
      if (stat.id === 'viewings') {
        return {
          ...stat,
          value: String(
            payload?.viewingsCount ??
              payload?.totalViewings ??
              payload?.totalRequests ??
              stat.value,
          ),
        };
      }
      return stat;
    });

    return {
      name,
      image: imageUri ? {uri: imageUri} : ASSETS.IMAGES.PERSON,
      isVerified: Boolean(isVerified),
      stats: profileStats,
    };
  };

  fetchAgentProfile = async () => {
    const agentId = this.getAgentIdFromState();
    const {t} = this.props?.i18n;
    if (!agentId) {
      return;
    }

    this.setState({isLoadingProfile: true});
    try {
      const response = await makeGetAgentProfileRequest(agentId);
      const payload = this.getProfilePayload(response);
      this.setState({profileData: this.buildProfileData(payload)});
    } catch (e) {
      errorToast(
        t('PROFILE_SCREEN.FAILED_TO_LOAD_PROFILE', {
          defaultValue: 'Failed to load profile',
        }),
        t,
      );
    } finally {
      this.setState({isLoadingProfile: false});
    }
  };

  handleMenuItemPress = itemId => {
    console.log('Menu item pressed:', itemId);
    // Handle navigation to respective screens
  };

  handleLogout = () => {
    ChatSocketService.disconnect();
    this.props.reset();
  };

  handleNotificationPress = () => {
    this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
      screen: NAVIGATION.COMMON.NOTIFICATIONS_SCREEN,
    });
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
          {(profileData?.stats || PROFILE_STATS).map(stat => (
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

const mapStateToProps = state => ({
  userData: state?.auth?.userData,
});

export default connect(mapStateToProps, {reset})(
  withTranslation()(withSafeAreaInsets(ProfileScreen)),
);
