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
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 0,
    zIndex: 1000,
  },
  doneButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
  },
});

export default styles;
