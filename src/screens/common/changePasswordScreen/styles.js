import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: SCREEN_PADDING,
    marginTop: 20,
  },
  formTopSpacing: {
    height: SCREEN.HEIGHT - 200,
  },
});

export default styles;
