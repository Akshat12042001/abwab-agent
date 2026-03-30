import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

export default StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    paddingHorizontal: SCREEN_PADDING,
  },
  sheet: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
    maxHeight: '88%',
    ...SharedStyles.shadow,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.GREYSCALE_200,
    marginTop: 10,
    marginBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: SCREEN_PADDING,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: SCREEN_PADDING,
  },
  card: {
    marginHorizontal: SCREEN_PADDING,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_100,
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY_30,
    marginBottom: 8,
  },
  refText: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailCol: {
    flex: 1,
  },
  viewingBadge: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY_30,
  },
  sectionLabel: {
    marginBottom: 10,
    paddingHorizontal: SCREEN_PADDING,
  },
  input: {
    marginHorizontal: SCREEN_PADDING,
    minHeight: 88,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    borderRadius: 12,
    padding: 12,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  dangerBtn: {
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 14,
    paddingVertical: 16,
    backgroundColor: COLORS.RED_ERROR,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  outlineBtn: {
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
});
