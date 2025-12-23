import React from 'react';
import {Component} from 'react';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ASSETS} from '../../../constants/assets';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {MedalIcon, NotificationIcon} from '../../../components/svgs';
import Carousel from 'react-native-reanimated-carousel';
import {
  RequestItemCard,
  AnimatedButtons,
  VisitsReservationsChart,
  ConversationRateBarGraph,
  CommissionTrackingChart,
} from '../../../components/molecules';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {withTranslation} from 'react-i18next';

const data = [
  {
    label: 'HOME_SCREEM.TOTAL_VISITS',
    value: 342,
  },
  {
    label: 'HOME_SCREEM.RESERVATIONS',
    value: 123,
  },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      selectedPeriodIndex: 0,
      showAllMonths: false,
    };
  }

  handlePeriodChange = (index, value) => {
    this.setState({selectedPeriodIndex: index});
  };

  handleToggleMonths = () => {
    this.setState(prevState => ({
      showAllMonths: !prevState.showAllMonths,
    }));
  };

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer paddingTop={-1} backgroundColor={COLORS.WHITE}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.profileRow}>
                <Image
                  source={ASSETS.IMAGES.PERSON}
                  style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                  <StyledText size={18} variant="semiBold" color={COLORS.WHITE}>
                    Ahmed Hassan
                  </StyledText>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.WHITE_80}>
                    Palm Hills Brokerage
                  </StyledText>
                </View>
              </View>
              <TouchableOpacity style={styles.notificationButton}>
                <NotificationIcon />
                <View style={styles.notificationBadge} />
              </TouchableOpacity>
            </View>
            <View style={styles.performanceRow}>
              <View style={styles.performanceLabelRow}>
                <MedalIcon />
                <StyledText
                  size={12}
                  variant="semiBold"
                  color={COLORS.WHITE}
                  textStyle={styles.performanceLabelText}>
                  {t('HOME_SCREEM.TODAY_PERFORMANCE')}
                </StyledText>
              </View>
              <Text style={styles.performanceText}>
                5<Text style={styles.performanceSubText}>/5</Text>
              </Text>
            </View>
            <View style={styles.progressBar} />
            <StyledText size={12} color={COLORS.GREYSCALE_300}>
              {t('HOME_SCREEM.YOU_VE_RESPONDED_TO_LEADS_IN_UNDER_2_MINUTES', {
                responded: 4,
                total: 5,
                time: '2 minutes',
              })}
            </StyledText>
          </View>
          <View style={styles.sectionHeader}>
            <StyledText size={18} variant="bold" color={COLORS.TEXT_PRIMARY}>
              {t('HOME_SCREEM.VIEWING_REQUESTS')}
            </StyledText>
            <TouchableOpacity>
              <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                {t('HOME_SCREEM.SEE_ALL')}
              </StyledText>
            </TouchableOpacity>
          </View>

          <View>
            <Carousel
              width={SCREEN.WIDTH}
              onSnapToItem={index => this.setState({currentIndex: index})}
              loop={false}
              mode="parallax"
              height={250}
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 90,
              }}
              data={[1, 2]}
              renderItem={({item}) => <RequestItemCard />}
            />
          </View>
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.TEXT_PRIMARY}
            textStyle={styles.performanceOverviewTitle}>
            {t('HOME_SCREEM.PERFORMANCE_OVERVIEW')}
          </StyledText>
          <AnimatedButtons
            options={['HOME_SCREEM.MONTHLY', 'HOME_SCREEM.YEARLY']}
            selectedIndex={this.state.selectedPeriodIndex}
            onSelect={this.handlePeriodChange}
            containerStyle={styles.segmentedControlContainer}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
            }}>
            {data.map(item => {
              return (
                <View
                  style={{
                    padding: 12,
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 12,
                    ...SharedStyles.shadow,
                    flex: 1,
                    marginHorizontal: SCREEN_PADDING,
                  }}>
                  <StyledText
                    size={12}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_500}>
                    {t(item.label)}
                  </StyledText>
                  <StyledText
                    variant="bold"
                    color={COLORS.PRIMARY}
                    lineHeight={28}>
                    {item.value}
                  </StyledText>
                </View>
              );
            })}
          </View>
          <VisitsReservationsChart
            showAllMonths={this.state.showAllMonths}
            onToggleMonths={this.handleToggleMonths}
          />
          <ConversationRateBarGraph onToggleMonths={this.handleToggleMonths} />
          <CommissionTrackingChart />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(HomeScreen);
