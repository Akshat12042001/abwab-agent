import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingHorizontal: SCREEN_PADDING,
    maxHeight: '90%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.GREYSCALE_300,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 20,
    marginHorizontal: SCREEN_PADDING,
    marginTop: 20,
  },
  propertyCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...SharedStyles.shadow,
  },
  propertyTitle: {
    marginBottom: 4,
  },
  propertySubtitle: {
    marginBottom: 16,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    marginBottom: 4,
  },
  verifiedBadge: {
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  feedbackSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  feedbackOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
  },
  feedbackOptionSelected: {
    backgroundColor: COLORS.PRIMARY_20,
    // borderColor: COLORS.PRIMARY_50,
  },
  feedbackOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  feedbackOptionText: {
    marginLeft: 12,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesInput: {
    backgroundColor: COLORS.GREYSCALE_50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    padding: 16,
    minHeight: 100,
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    fontFamily: 'Manrope-Regular',
  },
  actionButtons: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: SCREEN_PADDING,
  },
  submitButton: {
    marginBottom: 12,
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_400,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
