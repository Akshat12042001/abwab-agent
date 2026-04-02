import React, {Component} from 'react';
import {View, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {
  ScreenContainer,
  CommonHeader,
  StyledText,
  CustomButton,
} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import styles from './styles';
import {ASSETS} from '../../../constants/assets';
import {makeGetAgentProfileRequest} from '../../../api/auth';
import {errorToast} from '../../../utils/alerts';

class AccountSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullBio: false,
      isLoading: true,
      rawAgent: null,
      profileData: {
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        serviceArea: '',
        languages: '',
        image: ASSETS.IMAGES.PERSON,
      },
    };
  }

  componentDidMount() {
    this.loadAgent();
    this.focusUnsub = this.props.navigation.addListener('focus', () => {
      this.loadAgent();
    });
  }

  componentWillUnmount() {
    this.focusUnsub?.();
  }

  getAgentId = () => {
    const userData = this.props.userData || {};
    return (
      userData?._id ||
      userData?.id ||
      userData?.agentId ||
      userData?.user?._id ||
      userData?.user?.id ||
      ''
    );
  };

  getRawPayload = response => {
    const candidates = [
      response?.data?.agent,
      response?.data?.data,
      response?.data,
      response?.agent,
      response,
    ];
    return (
      candidates.find(
        x => x && typeof x === 'object' && !Array.isArray(x),
      ) || {}
    );
  };

  normalizeDisplay = agent => {
    const name = agent?.name || agent?.fullName || '';
    const email = agent?.email || '';
    const phone =
      agent?.phoneNo || agent?.phone || agent?.phoneNumber || '';
    const location = agent?.address || agent?.location || '';
    const bio = agent?.bio || '';
    const serviceArea =
      agent?.specialization || agent?.serviceArea || '';
    const languagesRaw =
      agent?.languages || agent?.language || agent?.spokenLanguages;
    const languages = Array.isArray(languagesRaw)
      ? languagesRaw.filter(Boolean).join(', ')
      : String(languagesRaw || '').trim();
    const imageUri =
      agent?.image ||
      agent?.avatar ||
      agent?.profileImage ||
      agent?.photo;

    return {
      name: name || '-',
      email: email || '-',
      phone: phone || '-',
      location: location || '-',
      bio: bio || '-',
      serviceArea: serviceArea || '-',
      languages: languages || '-',
      image: imageUri ? {uri: imageUri} : ASSETS.IMAGES.PERSON,
    };
  };

  loadAgent = async () => {
    const agentId = this.getAgentId();
    const {t, i18n} = this.props;
    const tr = t || i18n?.t;
    if (!agentId) {
      this.setState({isLoading: false});
      errorToast(
        tr?.('ACCOUNT_SETTINGS_SCREEN.LOAD_FAILED', {
          defaultValue: 'Could not load account',
        }),
        tr,
      );
      return;
    }

    this.setState({isLoading: true});
    try {
      const response = await makeGetAgentProfileRequest(agentId);
      const raw = this.getRawPayload(response);
      this.setState({
        rawAgent: raw,
        profileData: this.normalizeDisplay(raw),
        isLoading: false,
      });
    } catch (e) {
      errorToast(
        e?.response?.data?.message ||
          tr?.('ACCOUNT_SETTINGS_SCREEN.LOAD_FAILED', {
            defaultValue: 'Could not load account',
          }),
        tr,
      );
      this.setState({isLoading: false});
    }
  };

  toggleBio = () => {
    this.setState(prev => ({showFullBio: !prev.showFullBio}));
  };

  handleEditProfile = () => {
    const {navigation} = this.props;
    const {rawAgent} = this.state;
    const tr = this.props.t || this.props.i18n?.t;
    const id = rawAgent?._id || rawAgent?.id || this.getAgentId();
    if (!rawAgent || !id) {
      errorToast(
        tr?.('ACCOUNT_SETTINGS_SCREEN.LOAD_FAILED', {
          defaultValue: 'Profile is still loading. Try again.',
        }),
        tr,
      );
      return;
    }
    navigation.navigate(NAVIGATION.COMMON.EDIT_PROFILE_SCREEN, {
      agent: {...rawAgent, _id: rawAgent._id || rawAgent.id || id, id},
    });
  };

  handleEditPassword = () => {
    this.props.navigation?.navigate(NAVIGATION.COMMON.CHANGE_PASSWORD_SCREEN);
  };

  renderInfoRow = (label, value, isBio = false) => {
    const {t, i18n} = this.props;
    const tr = t || i18n?.t;
    const {showFullBio} = this.state;
    const {bio} = this.state.profileData;

    let displayValue = value;
    if (isBio && typeof value === 'string') {
      const maxLength = 100;
      if (!showFullBio && value.length > maxLength) {
        displayValue = `${value.substring(0, maxLength)}...`;
      }
    }

    return (
      <View style={styles.infoRow}>
        <StyledText
          size={16}
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.infoLabel}>
          {label}
        </StyledText>
        <View style={styles.infoValueContainer}>
          <StyledText
            size={14}
            variant="regular"
            color={COLORS.GREYSCALE_700}
            textStyle={styles.infoValue}>
            {displayValue}
          </StyledText>
          {isBio && typeof bio === 'string' && bio.length > 100 && (
            <TouchableOpacity onPress={this.toggleBio} activeOpacity={0.7}>
              <StyledText
                size={14}
                variant="regular"
                color={COLORS.PRIMARY_400}
                textStyle={styles.readMoreText}>
                {showFullBio
                  ? tr('DEVELOPER_SCREEN.READ_LESS')
                  : tr('DEVELOPER_SCREEN.READ_MORE')}
              </StyledText>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {t, i18n} = this.props;
    const tr = t || i18n?.t;
    const {profileData, isLoading} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader title={tr('ACCOUNT_SETTINGS_SCREEN.TITLE')} />
        {isLoading ? (
          <View style={{paddingTop: 48, alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              {paddingBottom: insetBottom + 100},
            ]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.profileSection}>
              <Image
                source={profileData.image}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <StyledText
                size={18}
                variant="semiBold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.profileName}>
                {profileData.name}
              </StyledText>
            </View>

            <View style={styles.detailsContainer}>
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.EMAIL_ADDRESS'),
                profileData.email,
              )}
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.PHONE_NUMBER'),
                profileData.phone,
              )}
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.LOCATION'),
                profileData.location,
              )}
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.BIO'),
                profileData.bio,
                true,
              )}
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.SERVICE_AREA'),
                profileData.serviceArea,
              )}
              {this.renderInfoRow(
                tr('ACCOUNT_SETTINGS_SCREEN.LANGUAGES_SPOKEN'),
                profileData.languages,
              )}
            </View>
          </ScrollView>
        )}

        <View
          style={[styles.buttonsContainer, {paddingBottom: insetBottom + 20}]}>
          <CustomButton
            title={tr('ACCOUNT_SETTINGS_SCREEN.EDIT_PROFILE')}
            onPress={this.handleEditProfile}
            containerStyle={styles.editProfileButton}
            isDisabled={isLoading}
          />
          <TouchableOpacity
            style={styles.editPasswordButton}
            onPress={this.handleEditPassword}
            activeOpacity={0.8}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.editPasswordText}>
              {tr('ACCOUNT_SETTINGS_SCREEN.EDIT_PASSWORD')}
            </StyledText>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  userData: state?.auth?.userData,
});

export default connect(mapStateToProps)(
  withTranslation()(withSafeAreaInsets(AccountSettingsScreen)),
);
