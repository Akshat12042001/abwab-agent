import React from 'react';
import {Component} from 'react';
import {StyledText} from '../../../components/atoms';
import {ImageBackground, View} from 'react-native';
import {COLORS} from '../../../constants';
import {ASSETS} from '../../../constants/assets';
import styles from './styles';
import DeviceInfo from 'react-native-device-info';
import {withTranslation} from 'react-i18next';

class SplashScreen extends Component {
  render() {
    const {t} = this.props?.i18n;
    return (
      <ImageBackground
        source={ASSETS.IMAGES.SPLASH_SCREEN}
        style={styles.root}
        resizeMode="contain">
        <StyledText
          color={COLORS.GREYSCALE_50}
          textAlign="center"
          size={14}
          textStyle={{marginBottom: 40}}>
          {t('PLACEHOLDERS.VERSION')} {DeviceInfo.getVersion()}
        </StyledText>
      </ImageBackground>
    );
  }
}

export default withTranslation()(SplashScreen);
