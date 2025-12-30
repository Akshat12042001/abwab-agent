import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingHorizontal: SCREEN_PADDING,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 24,
    ...SharedStyles.shadow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  content: {
    marginBottom: 24,
  },
  sectionLabel: {
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contractItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 12,
    right: 0,
    zIndex: 10,
  },
  checkmarkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.PRIMARY_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contractLabel: {
    textAlign: 'center',
  },
  doneButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
  },
});

export default styles;
