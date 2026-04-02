import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    maxHeight: SCREEN.HEIGHT * 0.9,
    margin: SCREEN_PADDING,
    borderRadius: 12,
    paddingVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    // paddingTop: 24,
  },
  header: {
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'center',
  },
  timerCircleContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  timerSvg: {
    position: 'absolute',
  },
  timerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  respondQuicklyText: {
    marginLeft: 4,
  },
  propertyImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
  },
  propertyInfo: {
    marginBottom: 10,
  },
  locationText: {
    marginVertical: 2,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  agentNameText: {
    marginLeft: 8,
  },
  section: {
    // marginBottom: 20,
    // marginTop: 10,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
  },
  infoLabel: {
    // marginBottom: 4,
  },
  infoValue: {
    // marginTop: 2,
  },
  meetingPointBox: {
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 12,
    padding: 12,
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  acceptButtonText: {
    marginLeft: 8,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_400,
  },
  declineButtonText: {
    marginLeft: 8,
  },
});

export default styles;
