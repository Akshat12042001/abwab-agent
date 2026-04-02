import {StyleSheet} from 'react-native';
import {SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 16,
  },
  tabsWrapper: {
    marginHorizontal: 0,
  },
  listContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 100,
    paddingTop: 20,
  },
  cardWrapper: {
    marginBottom: 16,
  },
});

export default styles;
