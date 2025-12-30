import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  ScreenContainer,
  CommonHeader,
  StyledText,
  CustomButton,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {ASSETS} from '../../../constants/assets';

class LanguageScreen extends Component {
  constructor(props) {
    super(props);
    const {i18n} = this.props;
    const currentLanguage = i18n.language || 'en';
    this.state = {
      selectedLanguage: currentLanguage,
    };
  }

  handleLanguageSelect = languageCode => {
    this.setState({selectedLanguage: languageCode});
  };

  handleSaveChanges = () => {
    const {i18n} = this.props;
    const {selectedLanguage} = this.state;
    i18n.changeLanguage(selectedLanguage);
    // Navigate back or show success message
    this.props.navigation?.goBack();
  };

  getLanguages = () => {
    const {t} = this.props?.i18n;
    return [
      {
        code: 'ar',
        label: t('LANGUAGE_SCREEN.ARABIC'),
        flag: ASSETS.IMAGES.AR_IMAGE,
      },
      {
        code: 'en',
        label: t('LANGUAGE_SCREEN.ENGLISH'),
        flag: ASSETS.IMAGES.ENG_IMAGE,
      },
    ];
  };

  renderLanguageOption = language => {
    const {selectedLanguage} = this.state;
    const isSelected = selectedLanguage === language.code;

    return (
      <View key={language.code}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => this.handleLanguageSelect(language.code)}
          activeOpacity={0.7}>
          <View style={styles.languageContent}>
            <Image source={language.flag} style={styles.flagIcon} />
            <StyledText
              size={16}
              variant="regular"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.languageLabel}>
              {language.label}
            </StyledText>
          </View>
          <View
            style={[
              styles.radioButton,
              isSelected && styles.radioButtonSelected,
            ]}>
            {/* {isSelected && <View style={styles.radioButtonInner} />} */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {t} = this.props?.i18n;
    const languages = this.getLanguages();

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader title={t('LANGUAGE_SCREEN.TITLE')} />
        <View style={styles.contentContainer}>
          {languages.map(language => this.renderLanguageOption(language))}
        </View>
        <View
          style={[styles.buttonContainer, {paddingBottom: insetBottom + 20}]}>
          <CustomButton
            title={t('LANGUAGE_SCREEN.SAVE_CHANGES')}
            onPress={this.handleSaveChanges}
            containerStyle={styles.saveButton}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(LanguageScreen));
