import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS, FONTS} from '../../../constants';
import StyledText from '../styledText';
import styles from './styles';
// import {ArrowBackIcon} from '../../svgs';

const DropdownComponent = ({
  onChange = undefined,
  placeholder = '',
  value = '',
  data = [],
  error = '',
  containerStyle = {},
  isSearchActive = false,
  label = '',
  ...props
}) => {
  const renderLabel = () => {
    return <Text style={styles.placeholder}>{label}</Text>;
  };
  return (
    <Fragment>
      <View style={[styles.wrapper, containerStyle]}>
        {renderLabel()}
        <Dropdown
          {...props}
          style={[styles.dropdown]}
          // mode="modal"
          placeholderStyle={styles.placeholderStyle}
          // selectedTextProps={{style: {color: COLORS.WHITE}}}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          dropdownPosition="bottom"
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={value}
          onFocus={() => console.log('innn')}
          onBlur={() => console.log('outt')}
          onChange={onChange}
          autoScroll
          fontFamily={FONTS.regular}
          maxHeight={200}
          activeColor={COLORS.ORANGE}
          containerStyle={styles.listContainerStyles}
          itemTextStyle={styles.itemTextStyle}
          search={isSearchActive}
          searchPlaceholder="Search..."
        />
      </View>
      {!!error && (
        <View style={styles.erroContainer}>
          <StyledText size={14} color={COLORS.RED_ERROR}>
            {error}
          </StyledText>
        </View>
      )}
    </Fragment>
  );
};

export default DropdownComponent;
