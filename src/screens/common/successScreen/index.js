import React, {Component} from 'react';
import {
  CommonHeader,
  CustomButton,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {ImageBackground, View} from 'react-native';
import {ASSETS} from '../../../constants/assets';
import {CheckIcon} from '../../../components/svgs';
import styles from './styles';

class SuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFeedback: false,
    };
  }
  render() {
    const {t} = this.props?.i18n;
    const {isFeedback} = this.state;
    const insetTop = this.props?.insets?.top || 0;

    return (
      <ScreenContainer
        paddingTop={insetTop + 30}
        backgroundColor={COLORS.WHITE}>
        <CommonHeader
          title={
            isFeedback
              ? t('SUCCESS_SCREEN.VISIT_FEEDBACK_TITLE')
              : t('SUCCESS_SCREEN.REPORT_NO_SHOW_TITLE')
          }
        />
        <ImageBackground
          source={ASSETS.IMAGES.BG_IMAGE}
          tintColor={COLORS.LIGHT_GREY_BG}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <CheckIcon size="44" color={COLORS.WHITE} />
            </View>
            <StyledText
              textStyle={styles.titleText}
              size={24}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textAlign="center">
              {isFeedback
                ? t('SUCCESS_SCREEN.FEEDBACK_SUBMITTED_SUCCESSFULLY')
                : t('SUCCESS_SCREEN.REPORT_SUBMITTED_SUCCESSFULLY')}
            </StyledText>
            <StyledText
              size={14}
              color={COLORS.GREYSCALE_500}
              textStyle={styles.descriptionText}
              textAlign="center">
              {isFeedback
                ? t('SUCCESS_SCREEN.THANK_YOU_FOR_FEEDBACK')
                : t('SUCCESS_SCREEN.NO_SHOW_RESPONSE_RECORDED')}
            </StyledText>
            <CustomButton
              title={t('SUCCESS_SCREEN.DONE')}
              onPress={() => {}}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </ImageBackground>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(SuccessScreen));
