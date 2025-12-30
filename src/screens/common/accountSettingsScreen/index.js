import React, {Component} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
  ScreenContainer,
  CommonHeader,
  StyledText,
  CustomButton,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {NAVIGATION} from '../../../constants';
import styles from './styles';
import {ASSETS} from '../../../constants/assets';

class AccountSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullBio: false,
      profileData: {
        name: 'Ahmed Hassan',
        email: 'hello@kamaluiux.com',
        phone: '+201012346663',
        location: 'Zamalek, Egypt',
        bio: 'Experienced real estate broker specializing in luxury villas and family communities in New Cairo. With over 10 years in the industry, I help clients find their perfect home.',
        serviceArea: 'New Cairo, Sheikh Zayed, Zamalek, Giza, 6th October',
        languages: 'English, Arabic',
        image: ASSETS.IMAGES.PERSON,
      },
    };
  }

  toggleBio = () => {
    this.setState(prevState => ({
      showFullBio: !prevState.showFullBio,
    }));
  };

  handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Edit Profile pressed');
  };

  handleEditPassword = () => {
    const {navigation} = this.props;
    navigation?.navigate(NAVIGATION.COMMON.CHANGE_PASSWORD_SCREEN);
  };

  renderInfoRow = (label, value, isBio = false) => {
    const {t} = this.props?.i18n;
    const {showFullBio} = this.state;
    const {bio} = this.state.profileData;

    let displayValue = value;
    if (isBio) {
      const maxLength = 100;
      if (!showFullBio && value.length > maxLength) {
        displayValue = value.substring(0, maxLength) + '...';
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
          {isBio && bio.length > 100 && (
            <TouchableOpacity onPress={this.toggleBio} activeOpacity={0.7}>
              <StyledText
                size={14}
                variant="regular"
                color={COLORS.PRIMARY_400}
                textStyle={styles.readMoreText}>
                {showFullBio
                  ? t('DEVELOPER_SCREEN.READ_LESS')
                  : t('DEVELOPER_SCREEN.READ_MORE')}
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
    const {t} = this.props?.i18n;
    const {profileData} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader title={t('ACCOUNT_SETTINGS_SCREEN.TITLE')} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: insetBottom + 100},
          ]}
          showsVerticalScrollIndicator={false}>
          {/* Profile Picture and Name */}
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

          {/* Account Details */}
          <View style={styles.detailsContainer}>
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.EMAIL_ADDRESS'),
              profileData.email,
            )}
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.PHONE_NUMBER'),
              profileData.phone,
            )}
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.LOCATION'),
              profileData.location,
            )}
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.BIO'),
              profileData.bio,
              true,
            )}
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.SERVICE_AREA'),
              profileData.serviceArea,
            )}
            {this.renderInfoRow(
              t('ACCOUNT_SETTINGS_SCREEN.LANGUAGES_SPOKEN'),
              profileData.languages,
            )}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View
          style={[styles.buttonsContainer, {paddingBottom: insetBottom + 20}]}>
          <CustomButton
            title={t('ACCOUNT_SETTINGS_SCREEN.EDIT_PROFILE')}
            onPress={this.handleEditProfile}
            containerStyle={styles.editProfileButton}
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
              {t('ACCOUNT_SETTINGS_SCREEN.EDIT_PASSWORD')}
            </StyledText>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(AccountSettingsScreen));
