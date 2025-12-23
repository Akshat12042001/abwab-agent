import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {StyledText} from '../../atoms';
import {LeftIcon, RightIcon} from '../../svgs';
import {COLORS, FONTS, SCREEN, SCREEN_PADDING} from '../../../constants';
import styles from './styles';
import {useTranslation} from 'react-i18next';

// Custom data point component factory
const createDataPoint = color => () => {
  return (
    <View style={styles.dataPointContainer}>
      <View style={[styles.dataPointInner, {backgroundColor: color}]} />
    </View>
  );
};

const VisitsReservationsChart = ({showAllMonths = false, onToggleMonths}) => {
  const {t} = useTranslation();

  // First 6 months data (Jan-Jun)
  const firstHalfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const firstHalfVisits = [850, 750, 600, 850, 580, 1000];
  const firstHalfReservations = [100, 95, 220, 200, 190, 280];

  // Next 6 months data (Jul-Dec)
  const secondHalfMonths = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const secondHalfVisits = [920, 880, 950, 1020, 980, 1100];
  const secondHalfReservations = [300, 320, 350, 380, 400, 420];

  const months = showAllMonths ? secondHalfMonths : firstHalfMonths;
  const visitsData = showAllMonths ? secondHalfVisits : firstHalfVisits;
  const reservationsData = showAllMonths
    ? secondHalfReservations
    : firstHalfReservations;

  // Prepare data for LineChart with custom data points
  const visitsChartData = visitsData.map((value, index) => ({
    value,
    label: months[index],
    labelTextStyle: {
      color: COLORS.GREYSCALE_500,
      fontSize: 10,
    },
    customDataPoint: createDataPoint(COLORS.ORANGE),
  }));

  const reservationsChartData = reservationsData.map((value, index) => ({
    value,
    label: months[index],
    customDataPoint: createDataPoint(COLORS.GREEN_500),
  }));

  // Find max value for y-axis
  const maxValue = Math.max(...visitsData, ...reservationsData);
  const yAxisMax = Math.ceil(maxValue / 200) * 200; // Round up to nearest 200

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText size={16} variant="bold" color={COLORS.TEXT_PRIMARY}>
          {t('HOME_SCREEM.VISITS_VS_RESERVATIONS')}
        </StyledText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={onToggleMonths}
            activeOpacity={0.7}>
            <LeftIcon size={20} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrowButton, {marginLeft: 12}]}
            onPress={onToggleMonths}
            activeOpacity={0.7}>
            <RightIcon size={20} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={visitsChartData}
          data2={reservationsChartData}
          height={220}
          width={SCREEN.WIDTH - SCREEN_PADDING * 4}
          spacing={45}
          thickness={3}
          thickness2={3}
          color1={COLORS.ORANGE}
          color2={COLORS.GREEN_500}
          hideRules={false}
          rulesColor={COLORS.WHITE}
          rulesThickness={1}
          dataPointsColor1={COLORS.ORANGE}
          dataPointsColor2={COLORS.GREEN_500}
          yAxisColor={COLORS.WHITE}
          xAxisColor={COLORS.WHITE}
          showVerticalLines
          verticalLinesStrokeDashArray={[10, 4]}
          yAxisTextStyle={{
            color: COLORS.GREYSCALE_500,
            fontSize: 10,
            fontFamily: FONTS.regular,
          }}
          maxValue={yAxisMax}
          yAxisLabelWidth={40}
          yAxisLabelSuffix=""
          hideYAxisText={false}
          xAxisLabelTextStyle={{
            color: COLORS.GREYSCALE_900,
            fontSize: 10,
            fontFamily: FONTS.medium,
          }}
          curved
          initialSpacing={10}
          noOfSections={5}
          stepValue={200}
        />
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, {backgroundColor: COLORS.ORANGE}]} />
          <StyledText size={12} variant="semiBold" color={COLORS.GREYSCALE_500}>
            {t('HOME_SCREEM.VISITS')}
          </StyledText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, {backgroundColor: COLORS.GREEN_500}]}
          />
          <StyledText size={12} variant="semiBold" color={COLORS.GREYSCALE_500}>
            {t('HOME_SCREEM.RESERVATIONS')}
          </StyledText>
        </View>
      </View>
    </View>
  );
};

export default VisitsReservationsChart;
