import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  tabsContainer: {
    backgroundColor: 'transparent',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  root: {
    flexDirection: 'row',
    backgroundColor: '#FCFCFDCC',
    paddingVertical: 15,
    paddingHorizontal: SCREEN_PADDING - 10,
    justifyContent: 'space-between',
  },
  rootExtraPaddingBottom: {
    paddingBottom: 20,
  },
  rootPaddingBottom: {
    paddingBottom: 10,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTopLabelBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  avatarInitials: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  notiIcon: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.RED_NOTIFICATION,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -3,
  },
});

export default styles;
