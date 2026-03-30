import {StyleSheet} from 'react-native';
import {SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: SCREEN_PADDING,
    marginTop: 20,
    paddingBottom: 40,
  },
  formTopSpacing: {
    gap: 4,
  },
  submitBtn: {
    marginTop: 28,
  },
});

export default styles;
