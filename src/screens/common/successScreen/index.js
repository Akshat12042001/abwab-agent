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
import {makeRequestViewingActionRequest} from '../../../api/auth';
import {errorToast} from '../../../utils/alerts';
import styles from './styles';

const VARIANT_VISIT_FEEDBACK = 'visitFeedback';
const STATUS_COMPLETED = 'completed';

class SuccessScreen extends Component {
  state = {
    actionSubmitting: false,
  };

  getVariant = () => this.props.route?.params?.variant;

  getRequestId = () => this.props.route?.params?.requestId;

  isVisitFeedback = () => this.getVariant() === VARIANT_VISIT_FEEDBACK;

  handleDone = async () => {
    const {navigation} = this.props;
    const t = this.props.t || this.props.i18n?.t;

    if (this.isVisitFeedback() && this.getRequestId()) {
      if (this.state.actionSubmitting) {
        return;
      }
      this.setState({actionSubmitting: true});
      try {
        await makeRequestViewingActionRequest({
          requestId: this.getRequestId(),
          status: STATUS_COMPLETED,
          updateMessage: '',
        });
        navigation.goBack();
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          t?.('SUCCESS_SCREEN.COMPLETE_VISIT_FAILED', {
            defaultValue: 'Could not mark visit as completed',
          });
        errorToast(msg, t);
      } finally {
        this.setState({actionSubmitting: false});
      }
      return;
    }

    navigation.goBack();
  };

  render() {
    const {t} = this.props?.i18n;
    const insetTop = this.props?.insets?.top || 0;
    const feedbackUi = this.isVisitFeedback();

    return (
      <ScreenContainer
        paddingTop={insetTop + 30}
        backgroundColor={COLORS.WHITE}>
        <CommonHeader
          title={
            feedbackUi
              ? t('SUCCESS_SCREEN.VISIT_FEEDBACK_TITLE')
              : t('SUCCESS_SCREEN.REPORT_NO_SHOW_TITLE')
          }
          customBackHandler={
            this.isVisitFeedback() && this.getRequestId()
              ? this.handleDone
              : undefined
          }
        />
        <ImageBackground
          source={ASSETS.IMAGES.BG_IMAGE}
          tintColor={COLORS.LIGHT_GREY_BG}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <CheckIcon size={44} color={COLORS.WHITE} />
            </View>
            <StyledText
              textStyle={styles.titleText}
              size={24}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textAlign="center">
              {feedbackUi
                ? t('SUCCESS_SCREEN.FEEDBACK_SUBMITTED_SUCCESSFULLY')
                : t('SUCCESS_SCREEN.REPORT_SUBMITTED_SUCCESSFULLY')}
            </StyledText>
            <StyledText
              size={14}
              color={COLORS.GREYSCALE_500}
              textStyle={styles.descriptionText}
              textAlign="center">
              {feedbackUi
                ? t('SUCCESS_SCREEN.THANK_YOU_FOR_FEEDBACK')
                : t('SUCCESS_SCREEN.NO_SHOW_RESPONSE_RECORDED')}
            </StyledText>
            <CustomButton
              title={t('SUCCESS_SCREEN.DONE')}
              onPress={this.handleDone}
              containerStyle={styles.buttonContainer}
              isLoading={this.state.actionSubmitting}
              isDisabled={this.state.actionSubmitting}
            />
          </View>
        </ImageBackground>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(SuccessScreen));
