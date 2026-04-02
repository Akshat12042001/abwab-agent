import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  scrollContent: {
    // padding: SCREEN_PADDING,
    paddingBottom: 40,
    paddingLeft: 20,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.GREYSCALE_200,
    paddingBottom: 12,
    // marginBottom: 16,
  },
  headerCell: {
    // flex: 1,
    alignItems: 'flex-start',
    width: SCREEN.WIDTH / 5 - 4,
    // borderWidth: 1,
  },
  dayRow: {
    marginBottom: 8,
    flex: 1,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
  },
  timeSlotRowIndented: {
    marginLeft: 60, // Indent for additional time slots
  },
  dayCell: {
    flex: 1.2,
    justifyContent: 'center',
  },
  checkboxCell: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  timeInputCell: {
    flex: 1,
    // marginHorizontal: 4,
  },
  timeInput: {
    backgroundColor: COLORS.GREYSCALE_50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    // paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCell: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    // gap: 8,
  },
  addButton: {
    width: 20,
    height: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.GREYSCALE_500,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: SCREEN_PADDING,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
});

export default styles;
