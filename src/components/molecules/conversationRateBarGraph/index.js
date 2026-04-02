import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {COLORS, FONTS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';
import styles from './styles';
import {StyledText} from '../../atoms';
import {LeftIcon, RightIcon} from '../../svgs';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

const ConversationRateBarGraph = ({}) => {
  const {t} = useTranslation();

  const [showNext6Months, setShowNext6Months] = useState(false);
  const barData = useMemo(() => {
    let data = [
      {
        value: 15,
        label: 'Jan',
      },
      {
        value: 40,
        label: 'Feb',
      },
      {value: 10, label: 'Mar'},
      {value: 30, label: 'Apr'},
      {value: 10, label: 'May'},
      {value: 30, label: 'Jun'},
    ];
    if (showNext6Months) {
      data = [
        {value: 10, label: 'Jul'},
        {value: 30, label: 'Aug'},
        {value: 10, label: 'Sep'},
        {value: 30, label: 'Oct'},
        {value: 10, label: 'Nov'},
        {value: 30, label: 'Dec'},
      ];
    }
    return data;
  }, [showNext6Months]);
  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        ...SharedStyles.shadow,
        marginHorizontal: SCREEN_PADDING,
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
      }}>
      <View style={styles.header}>
        <StyledText size={16} variant="bold" color={COLORS.TEXT_PRIMARY}>
          {t('HOME_SCREEM.CONVERSION_RATE_TREND')}
        </StyledText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => setShowNext6Months(!showNext6Months)}
            activeOpacity={0.7}>
            <LeftIcon size={20} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrowButton, {marginLeft: 12}]}
            onPress={() => setShowNext6Months(!showNext6Months)}
            activeOpacity={0.7}>
            <RightIcon size={20} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>
      <BarChart
        data={barData}
        width={SCREEN.WIDTH}
        isAnimated
        animationDuration={1000}
        barBorderWidth={10}
        barBorderRadius={30}
        animationType="spring"
        barBorderColor={COLORS.WHITE}
        animationConfig={{
          damping: 10,
          stiffness: 100,
          mass: 1,
        }}
        patternId="paint0_linear_187_1709"
        hideRules
        yAxisThickness={0}
        frontColor={COLORS.PRIMARY_50}
        xAxisThickness={0}
        noOfSections={5}
        spacing={SCREEN.WIDTH / barData?.length - 48}
        initialSpacing={10}
        xAxisLabelTextStyle={{
          color: COLORS.GREYSCALE_500,
          fontSize: 12,
          fontFamily: FONTS.medium,
        }}
        yAxisTextStyle={{
          fontSize: 12,
          fontFamily: FONTS.medium,
          color: COLORS.GREYSCALE_500,
        }}
      />
    </View>
  );
};

export default ConversationRateBarGraph;
