import {Component} from 'react';
import {
  CustomButton,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {Image, View} from 'react-native';
import {ASSETS} from '../../../constants/assets';
import {COLORS} from '../../../constants';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {setIsOnboardingCompleted} from '../../../redux/onboarding/onboarding.reducer';

class GetStartedScreen extends Component {
  handleContinueWithEmail = () => {
    this.props.setIsOnboardingCompleted(true);
  };

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer paddingBottom={1}>
        <View style={styles.logoContainer}>
          <Image
            source={ASSETS.IMAGES.LOGO_ONE}
            style={styles.logoOne}
            resizeMode="contain"
          />
          <Image
            source={ASSETS.IMAGES.MAIN_LOGO}
            style={styles.logoTwo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <StyledText
            size={32}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textAlign="center">
            {t('GET_STARTED_SCREEN.LETS_GET_GOING')}
          </StyledText>
          <StyledText
            color={COLORS.GREYSCALE_700}
            size={14}
            textAlign="center"
            lineHeight={24}
            textStyle={styles.descriptionText}>
            {t('GET_STARTED_SCREEN.ABWAB_GIVES_YOU_EVERYTHING')}
          </StyledText>
          <CustomButton
            title={t('BUTTONS.SIGN_IN')}
            containerStyle={styles.continueButton}
            onPress={this.handleContinueWithEmail}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(
  connect(null, {setIsOnboardingCompleted})(GetStartedScreen),
);
