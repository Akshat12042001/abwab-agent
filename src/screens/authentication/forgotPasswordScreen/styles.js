import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY_BG,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
  },
  logo: {
    height: 35,
    width: 111,
  },
  titleSpacing: {
    paddingVertical: 10,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerGap: {
    marginLeft: 2,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    marginTop: 20,
    height: SCREEN.HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SCREEN_PADDING,
  },
  formTopSpacing: {
    marginTop: 10,
  },
  backButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GREYSCALE_200,
  },
});

export default styles;
