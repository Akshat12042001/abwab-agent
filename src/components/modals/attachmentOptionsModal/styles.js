import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingHorizontal: SCREEN_PADDING,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 0,
    overflow: 'hidden',
    ...SharedStyles.shadow,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
    backgroundColor: COLORS.PRIMARY_50,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    // Icon placeholder - will be replaced with actual icon
  },
  optionText: {
    flex: 1,
    marginLeft: 8,
  },
  optionDivider: {
    paddingBottom: 16,
    // height: 1,
    // backgroundColor: COLORS.GREYSCALE_200,
    // marginHorizontal: 16,
  },
  optionPressed: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },
});

export default styles;
