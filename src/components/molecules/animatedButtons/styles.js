import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    left: 10,
    top: 10,
    bottom: 10,
    borderRadius: 100,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default styles;
