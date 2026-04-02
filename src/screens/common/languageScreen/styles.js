import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 24,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.GREYSCALE_100,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  languageLabel: {},
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.GREYSCALE_300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 7,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.GREYSCALE_100,
    marginLeft: 44,
  },
  buttonContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 24,
    backgroundColor: COLORS.WHITE,
    ...SharedStyles.shadow,
  },
  saveButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
  },
});

export default styles;
