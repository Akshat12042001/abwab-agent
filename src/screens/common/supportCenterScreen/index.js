import React, {Component} from 'react';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity, View} from 'react-native';
import {ArrowRightIcon, HelpIcon} from '../../../components/svgs';
import styles from './styles';

class SupportCenterScreen extends Component {
  constructor(props) {
    super(props);
  }

  getSupportOptions = () => {
    const {t} = this.props?.i18n;
    return [
      {
        id: 'live-chat',
        title: t('SUPPORT_CENTER_SCREEN.LIVE_CHAT_TITLE'),
        subtitle: t('SUPPORT_CENTER_SCREEN.LIVE_CHAT_SUBTITLE'),
      },
      {
        id: 'call-center',
        title: t('SUPPORT_CENTER_SCREEN.CALL_CENTER_TITLE'),
        subtitle: t('SUPPORT_CENTER_SCREEN.CALL_CENTER_SUBTITLE'),
      },
      {
        id: 'email-support',
        title: t('SUPPORT_CENTER_SCREEN.EMAIL_SUPPORT_TITLE'),
        subtitle: t('SUPPORT_CENTER_SCREEN.EMAIL_SUPPORT_SUBTITLE'),
      },
      {
        id: 'faqs',
        title: t('SUPPORT_CENTER_SCREEN.FAQS_TITLE'),
        subtitle: t('SUPPORT_CENTER_SCREEN.FAQS_SUBTITLE'),
      },
    ];
  };

  handleOptionPress = optionId => {
    console.log('Option pressed:', optionId);
    // Handle navigation or action based on optionId
  };

  renderSupportOption = item => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.optionCard}
        onPress={() => this.handleOptionPress(item.id)}
        activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <HelpIcon size={17} fill={COLORS.GREYSCALE_900} />
        </View>
        <View style={styles.textContainer}>
          <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
            {item.title}
          </StyledText>
          <StyledText size={12} color={COLORS.GREYSCALE_500}>
            {item.subtitle}
          </StyledText>
        </View>
        <ArrowRightIcon size={24} color={COLORS.GREYSCALE_500} />
      </TouchableOpacity>
    );
  };

  render() {
    const {t} = this.props?.i18n;
    const insetTop = this.props?.insets?.top || 0;
    const supportOptions = this.getSupportOptions();
    return (
      <ScreenContainer
        backgroundColor={COLORS.LIGHT_GREY_BG}
        paddingTop={insetTop + 20}>
        <CommonHeader title={t('SUPPORT_CENTER_SCREEN.TITLE')} />
        <StyledText
          size={32}
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.greetingText}>
          {t('SUPPORT_CENTER_SCREEN.GREETING')}
        </StyledText>
        <View style={styles.optionsContainer}>
          {supportOptions.map(item => this.renderSupportOption(item))}
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(SupportCenterScreen));
