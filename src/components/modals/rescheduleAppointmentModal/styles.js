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
    maxHeight: '92%',
    ...SharedStyles.shadow,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.GREYSCALE_200,
    marginTop: 10,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: SCREEN_PADDING,
  },
  card: {
    marginHorizontal: SCREEN_PADDING,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_100,
    backgroundColor: COLORS.WHITE,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY_30,
    marginBottom: 8,
  },
  refText: {
    marginBottom: 12,
  },
  sectionLabel: {
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: SCREEN_PADDING,
  },
  chipsScroll: {
    marginBottom: 16,
    paddingLeft: SCREEN_PADDING,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_PADDING,
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    backgroundColor: COLORS.WHITE,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.PRIMARY_30,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 12,
  },
  timeChip: {
    width: '31%',
    paddingVertical: 10,
    marginRight: '3.5%',
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    alignItems: 'center',
  },
  timeChipEvery3: {
    marginRight: 0,
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
    marginBottom: 16,
  },
  confirmBtn: {
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 14,
    paddingVertical: 16,
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
});
