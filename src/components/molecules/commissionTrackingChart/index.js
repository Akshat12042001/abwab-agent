import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {Pattern, Rect} from 'react-native-svg';
import {COLORS, FONTS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {StyledText} from '../../atoms';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const MyPattern = () => {
  return (
    <Pattern
      id="DiagonalLines"
      patternUnits="userSpaceOnUse"
      width="10"
      height="10"
      patternTransform="rotate(-65 5 5)">
      <Rect width="5" height="10" fill={'#256543'} />
    </Pattern>
  );
};

// Chart text styles
const xAxisLabelTextStyle = {
  color: COLORS.GREYSCALE_500,
  fontSize: 12,
  fontFamily: FONTS.regular,
};

const CommissionTrackingChart = () => {
  const {t} = useTranslation();

  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  // Commission data for 7 months
  const commissionData = useMemo(() => {
    const data = [
      {value: 180, label: 'Mar', formattedValue: 'EGP 18,000'},
      {value: 250, label: 'Apr', formattedValue: 'EGP 25,000'},
      {value: 210, label: 'May', formattedValue: 'EGP 21,150'},
      {value: 220, label: 'June', formattedValue: 'EGP 22,000'},
      {value: 250, label: 'July', formattedValue: 'EGP 25,000'},
      {value: 190, label: 'Aug', formattedValue: 'EGP 19,000'},
      {value: 230, label: 'Sep', formattedValue: 'EGP 23,000'},
    ];

    return data.map((item, index) => {
      const isSelected = selectedBarIndex === index;

      return {
        ...item,
        frontColor: isSelected ? COLORS.PRIMARY : COLORS.PRIMARY_50,
        barBorderRadius: 4,
        // Add striped pattern only when bar is tapped
        ...(isSelected && {
          barBackgroundPattern: () => MyPattern(),
          patternId: 'DiagonalLines',
        }),
        // Add top label component for tooltip
        topLabelComponent: () => {
          if (isSelected) {
            return (
              <View style={styles.tooltipContainer}>
                <View style={styles.tooltip}>
                  <StyledText
                    size={10}
                    variant="bold"
                    color={COLORS.TEXT_PRIMARY}>
                    {item.formattedValue}
                  </StyledText>
                </View>
                <View style={styles.tooltipArrow} />
              </View>
            );
          }
          return null;
        },
      };
    });
  }, [selectedBarIndex]);

  return (
    <View style={styles.container}>
      <StyledText size={16} variant="bold" color={COLORS.TEXT_PRIMARY}>
        {t('HOME_SCREEM.COMMISSION_TRACKING')}
      </StyledText>
      <View style={styles.chartContainer}>
        <BarChart
          data={commissionData}
          width={SCREEN.WIDTH - SCREEN_PADDING * 4}
          height={200}
          maxValue={500}
          isAnimated
          animationDuration={1000}
          barWidth={32}
          spacing={20}
          hideRules={true}
          yAxisThickness={0}
          xAxisThickness={0}
          hideYAxisText
          noOfSections={4}
          xAxisLabelTextStyle={xAxisLabelTextStyle}
          onPress={(item, index) => {
            setSelectedBarIndex(selectedBarIndex === index ? null : index);
          }}
          showGradient={false}
        />
      </View>
    </View>
  );
};

export default CommissionTrackingChart;
