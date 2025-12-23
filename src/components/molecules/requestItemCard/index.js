import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {StyledText} from '../../atoms';
import {CheckIcon, CloseIcon} from '../../svgs';
import {ASSETS} from '../../../constants/assets';
import {COLORS} from '../../../constants';
import styles from './styles';

const RequestItemCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Image
          source={ASSETS.IMAGES.DUMMY_IMAGE}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <View style={styles.propertyInfo}>
          <StyledText size={18} variant="bold" color={COLORS.GREYSCALE_900}>
            Mountain View Villa
          </StyledText>
          <StyledText
            size={12}
            variant="semiBold"
            color={COLORS.GREYSCALE_500}
            textStyle={styles.propertyLocationText}>
            5th Settlement, Katameya
          </StyledText>
          <View style={styles.agentRow}>
            <Image source={ASSETS.IMAGES.PERSON} style={styles.agentImage} />
            <StyledText
              size={12}
              variant="bold"
              textStyle={styles.agentNameText}
              color={COLORS.PRIMARY}>
              Ahmed Elghandour
            </StyledText>
          </View>
        </View>
      </View>

      <View style={styles.appointmentContainer}>
        <StyledText size={12} variant="semiBold" color={COLORS.GREYSCALE_500}>
          Appointment Date
        </StyledText>
        <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
          Aug 6, 2023 • 4:30 PM
        </StyledText>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.declineButton}>
          <CloseIcon size={20} color={COLORS.GREYSCALE_700} />
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_700}
            textStyle={styles.declineButtonText}>
            Decline
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton}>
          <CheckIcon size={20} color={COLORS.WHITE} />
          <StyledText
            size={14}
            variant="semiBold"
            color={COLORS.WHITE}
            textStyle={styles.acceptButtonText}>
            Accept
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestItemCard;
