import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 10,
  },
  mainTitle: {
    // marginBottom: 24,
    marginHorizontal: SCREEN_PADDING,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GREYSCALE_50,
    borderRadius: 16,
    paddingHorizontal: 16,
    // paddingVertical: 12,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    height: 47,
    marginHorizontal: SCREEN_PADDING,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: COLORS.GREYSCALE_900,
  },
  faqListContainer: {
    flex: 1,
  },
  faqListContent: {
    paddingBottom: 20,
  },
  faqItem: {
    paddingVertical: 16,
  },
  faqQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    // flex: 1,
    marginRight: 12,
    width: SCREEN.WIDTH - 80,
    // lineHeight: 20,
  },
  faqAnswerContainer: {
    // marginTop: 12,
    paddingLeft: 0,
  },
  faqAnswer: {
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.GREYSCALE_100,
    // marginTop: 16,
  },
});

export default styles;
