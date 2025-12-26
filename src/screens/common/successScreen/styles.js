import {StyleSheet} from 'react-native';
import {COLORS, SCREEN} from '../../../constants';

const styles = StyleSheet.create({
  backgroundImage: {
    height: SCREEN.HEIGHT / 1.3,
    width: SCREEN.WIDTH,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 100,
  },
  iconContainer: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  descriptionText: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
});

export default styles;
