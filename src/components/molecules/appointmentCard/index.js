import React from 'react';
import {View, Image, TouchableOpacity, Pressable} from 'react-native';
import {StyledText} from '../../atoms';
import {COLORS} from '../../../constants';
import {CalenderIcon, LocationIcon, MessageBubbleIcon} from '../../svgs';
import styles from './styles';

const AppointmentCard = ({
  propertyTitle,
  developer,
  location,
  clientName,
  clientImage,
  isVerified = false,
  appointmentDate,
  onReschedule,
  onCancel,
  onLocationPress,
  onMessagePress,
  rescheduleTitle = 'Reschedule',
  cancelTitle = 'Cancel',
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {/* Property Title */}
      <StyledText
        size={16}
        variant="bold"
        color={COLORS.GREYSCALE_900}
        textStyle={styles.cardTitle}>
        {propertyTitle}
      </StyledText>
      <StyledText
        size={12}
        variant="semiBold"
        color={COLORS.GREYSCALE_500}
        textStyle={styles.cardSubtitle}>
        {developer} • {location}
      </StyledText>

      {/* Client Info */}
      <View style={styles.clientRow}>
        <Image
          source={clientImage}
          style={styles.clientImage}
          resizeMode="cover"
        />
        <View style={styles.clientInfo}>
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.clientName}>
            {clientName}
          </StyledText>
          {isVerified && (
            <View style={styles.verifiedBadge}>
              <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                Verified Client
              </StyledText>
            </View>
          )}
        </View>
        <View style={styles.clientActions}>
          <Pressable style={styles.clientActionBtn} onPress={onLocationPress}>
            <LocationIcon size={20} color={COLORS.PRIMARY_300} />
          </Pressable>
          <Pressable style={styles.clientActionBtn} onPress={onMessagePress}>
            <MessageBubbleIcon size={20} color={COLORS.PRIMARY_300} />
          </Pressable>
        </View>
      </View>

      {/* Appointment Date/Time */}
      <View style={styles.appointmentDateTimeBox}>
        <CalenderIcon size={20} color={COLORS.PRIMARY} />
        <StyledText
          size={14}
          variant="semiBold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.appointmentDateTimeText}>
          {appointmentDate}
        </StyledText>
      </View>

      {/* Action Buttons */}
      <View style={styles.cardActionsRow}>
        <TouchableOpacity
          style={[styles.cardActionButton, styles.cardActionButtonSpacing]}
          onPress={onReschedule}
          activeOpacity={0.8}>
          <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
            {rescheduleTitle}
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardActionButton}
          onPress={onCancel}
          activeOpacity={0.8}>
          <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
            {cancelTitle}
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;
