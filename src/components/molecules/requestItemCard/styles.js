import {StyleSheet} from 'react-native';
import {COLORS, SCREEN} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 12,
    width: SCREEN.WIDTH - 60,
    ...SharedStyles.shadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  propertyInfo: {
    marginLeft: 12,
    flex: 1,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  agentImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  appointmentContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: COLORS.LIGHT_GREY_BG,
    borderRadius: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 10,
  },
  declineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_400,
    backgroundColor: COLORS.WHITE,
    marginRight: 6,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    marginLeft: 12,
  },
  propertyLocationText: {
    marginTop: 4,
  },
  agentNameText: {
    marginLeft: 6,
  },
  declineButtonText: {
    marginLeft: 6,
  },
  acceptButtonText: {
    marginLeft: 6,
  },
});

export default styles;
