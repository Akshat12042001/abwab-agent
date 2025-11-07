import React, {Component} from 'react';
import {
  CustomButton,
  OtpInput,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {LeftArrowIcon} from '../../../components/svgs';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {SharedStyles} from '../../../shared';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

class VerificationCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: [],
      error: '',
      canResend: true,
      resendSeconds: 60,
    };
  }

  componentWillUnmount() {
    // if (this.resendInterval) {
    //   clearInterval(this.resendInterval);
    // }
  }

  startResendTimer = () => {
    if (this.resendInterval) clearInterval(this.resendInterval);
    this.setState({canResend: false, resendSeconds: 60});
    this.resendInterval = setInterval(() => {
      this.setState(prev => {
        const next = prev.resendSeconds - 1;
        if (next <= 0) {
          clearInterval(this.resendInterval);
          return {resendSeconds: 0, canResend: true};
        }
        return {resendSeconds: next};
      });
    }, 1000);
  };

  handleResend = () => {
    if (!this.state.canResend) return;
    // TODO: trigger resend code API here if available
    this.startResendTimer();
  };

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer
        paddingTop={!!this.props?.insets?.top ? 30 : 0}
        backgroundColor={COLORS.WHITE}>
        <TouchableOpacity style={styles.backButton}>
          <LeftArrowIcon />
        </TouchableOpacity>
        <View style={styles.container}>
          <StyledText color={COLORS.GREYSCALE_900} size={32} variant="bold">
            {t('VERIFICATION_SCREEN.ENTER_VERIFICATION_CODE')}
          </StyledText>
          <StyledText
            size={14}
            variant="regular"
            textStyle={styles.helperText}
            color={COLORS.GREYSCALE_700}
            lineHeight={24}>
            {t('VERIFICATION_SCREEN.DESCRIPTION')}
          </StyledText>
          <View style={styles.otpWrap}>
            <OtpInput
              otp={this.state.otp}
              length={6}
              setOtp={text => this.setState({otp: text, error: ''})}
              onSubmit={() => {}}
              error={this.state.error}
            />
          </View>
          <CustomButton title={t('BUTTONS.VERIFY')} isDisabled={true} />
          <View style={styles.resendWrap}>
            {this.state.canResend ? (
              <Pressable style={styles.rowStart} onPress={this.handleResend}>
                <StyledText
                  size={14}
                  variant="regular"
                  color={COLORS.GREYSCALE_700}>
                  {t('VERIFICATION_SCREEN.DIDNT_RECEIVE_CODE')}
                </StyledText>
                <StyledText
                  size={14}
                  variant="bold"
                  color={COLORS.PRIMARY}
                  textStyle={styles.registerGap}>
                  {t('VERIFICATION_SCREEN.RESEND_CODE')}
                </StyledText>
              </Pressable>
            ) : (
              <Pressable
                style={SharedStyles.center}
                onPress={this.handleResend}>
                <StyledText
                  size={14}
                  variant="regular"
                  color={COLORS.GREYSCALE_700}>
                  {t('VERIFICATION_SCREEN.RESEND_IN_SECONDS', {
                    seconds: this.state.resendSeconds,
                  })}
                </StyledText>
                <StyledText
                  size={14}
                  variant="bold"
                  color={COLORS.PRIMARY_50}
                  textStyle={styles.registerGap}>
                  {t('VERIFICATION_SCREEN.RESEND_CODE')}
                </StyledText>
              </Pressable>
            )}
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(VerificationCodeScreen));
