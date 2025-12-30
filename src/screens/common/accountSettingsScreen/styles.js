import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 8,
  },
  infoRow: {
    marginBottom: 20,
  },
  infoLabel: {
    marginBottom: 4,
  },
  infoValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  infoValue: {
    flex: 1,
    lineHeight: 20,
  },
  readMoreText: {
    // marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.GREYSCALE_100,
    marginTop: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 16,
    gap: 12,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GREYSCALE_100,
  },
  editProfileButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
  },
  editPasswordButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPasswordText: {
    textAlign: 'center',
  },
});

export default styles;
