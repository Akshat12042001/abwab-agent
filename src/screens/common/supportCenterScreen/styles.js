import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  greetingText: {
    marginHorizontal: SCREEN_PADDING,
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 32,
  },
  optionCard: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: COLORS.GREYSCALE_200,
    marginBottom: 16,
  },
  iconContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_50,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default styles;
