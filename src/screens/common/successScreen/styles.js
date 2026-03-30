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
    height: 88,
    width: 88,
    borderRadius: 44,
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
    marginTop: 28,
    width: '88%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});

export default styles;
