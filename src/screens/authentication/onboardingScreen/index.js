import {Component} from 'react';
import {
  CustomButton,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {ASSETS} from '../../../constants/assets';
import {COLORS} from '../../../constants';
import styles from './styles';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    image: ASSETS.IMAGES.ONBOARDING_ONE,
    title: 'ONBOARDING_SCREEN.REAL_LEADS_AT_YOUR_FINGERTIPS',
    description: 'ONBOARDING_SCREEN.GET_INSTANT_VIEWING_REQUESTS',
  },
  {
    id: 2,
    image: ASSETS.IMAGES.ONBOARDING_TWO,
    title: 'ONBOARDING_SCREEN.MASTER_YOUR_SCHEDULE',
    description: 'ONBOARDING_SCREEN.BROWSE_VERIFIED_LISTINGS',
  },
  {
    id: 3,
    image: ASSETS.IMAGES.ONBOARDING_THREE,
    title: 'ONBOARDING_SCREEN.ALL_COMMUNICATION_CENTRALIZED',
    description: 'ONBOARDING_SCREEN.ACCESS_CLIENT_HISTORY',
  },
];

class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  handleNext = () => {
    const {selectedIndex} = this.state;
    const nextIndex = selectedIndex + 1 < DATA.length ? selectedIndex + 1 : 0;
    this.setState({selectedIndex: nextIndex});
  };

  render() {
    const current = DATA[this.state.selectedIndex];
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer paddingTop={!!this.props?.insets?.top ? 20 : 0}>
        <View style={styles.container}>
          <ImageBackground
            source={current.image}
            resizeMode="cover"
            style={styles.heroImage}>
            <TouchableOpacity style={styles.skipButton}>
              <StyledText
                size={16}
                variant="semiBold"
                color={COLORS.GREYSCALE_900}>
                {t('BUTTONS.SKIP')}
              </StyledText>
            </TouchableOpacity>
            <View style={styles.content}>
              <StyledText size={32} variant="bold" color={COLORS.GREYSCALE_900}>
                {t(current.title)}
              </StyledText>
              <StyledText
                size={14}
                lineHeight={24}
                color={COLORS.GREYSCALE_700}
                textStyle={styles.descriptionText}>
                {t(current.description)}
              </StyledText>
            </View>

            <View style={styles.footerRow}>
              <View style={styles.dotsRow}>
                {DATA.map((i, index) => {
                  return (
                    <View
                      key={`${index}`}
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            index === this.state.selectedIndex
                              ? COLORS.PRIMARY
                              : COLORS.PRIMARY_50,
                        },
                      ]}
                    />
                  );
                })}
              </View>
              <CustomButton
                title={
                  this.state.selectedIndex === DATA.length - 1
                    ? t('BUTTONS.GET_STARTED')
                    : t('BUTTONS.NEXT')
                }
                containerStyle={styles.nextButtonSmall}
                onPress={this.handleNext}
              />
            </View>
          </ImageBackground>
        </View>
      </ScreenContainer>
    );
  }
}
export default withTranslation()(withSafeAreaInsets(OnboardingScreen));
