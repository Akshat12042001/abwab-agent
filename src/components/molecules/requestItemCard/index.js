import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {StyledText} from '../../atoms';
import {CheckIcon, CloseIcon, MessageBubbleIcon} from '../../svgs';
import {ASSETS} from '../../../constants/assets';
import {COLORS, SCREEN} from '../../../constants';
import styles from './styles';

const RequestItemCard = ({
  propertyName = 'Mountain View Villa',
  location = '5th Settlement, Katameya',
  agentName = 'Ahmed Elghandour',
  agentImage = ASSETS.IMAGES.PERSON,
  propertyImage = ASSETS.IMAGES.DUMMY_IMAGE,
  appointmentDate = 'Aug 6, 2023 • 4:30 PM',
  appointmentType = 'In-person', // 'In-person' or 'Video'
  agentMessage,
  onAccept,
  onDecline,
  showButtons = true,
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.headerRow}>
        <Image
          source={propertyImage}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <View style={styles.propertyInfo}>
          <StyledText size={18} variant="bold" color={COLORS.GREYSCALE_900}>
            {propertyName}
          </StyledText>
          <StyledText
            size={12}
            variant="semiBold"
            color={COLORS.GREYSCALE_500}
            textStyle={styles.propertyLocationText}>
            {location}
          </StyledText>
          <View style={styles.agentRow}>
            <Image source={agentImage} style={styles.agentImage} />
            <StyledText
              size={12}
              variant="bold"
              textStyle={styles.agentNameText}
              color={COLORS.PRIMARY}>
              {agentName}
            </StyledText>
          </View>
        </View>
      </View>

      {agentMessage && (
        <View style={styles.messageContainer}>
          <MessageBubbleIcon color={COLORS.PRIMARY_50} size={16} />
          {/* <View style={styles.messageBubble}> */}
          <StyledText
            size={12}
            variant="semiBold"
            color={COLORS.GREYSCALE_500}
            textStyle={{
              marginLeft: 5,
              marginTop: -2,
              width: SCREEN.WIDTH - 120,
            }}>
            {agentMessage}
          </StyledText>
          {/* </View> */}
        </View>
      )}

      <View style={styles.appointmentContainer}>
        <StyledText size={12} variant="semiBold" color={COLORS.GREYSCALE_500}>
          Appointment Date
        </StyledText>
        <View style={styles.appointmentDateRow}>
          <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_900}>
            {appointmentDate}
          </StyledText>
          <View
            style={[
              styles.appointmentTypeTag,
              {
                backgroundColor:
                  appointmentType === 'Video'
                    ? COLORS.PRIMARY_50
                    : COLORS.PRIMARY_50,
              },
            ]}>
            <StyledText
              size={12}
              variant="semiBold"
              color={COLORS.PRIMARY}
              textStyle={styles.appointmentTypeText}>
              {appointmentType}
            </StyledText>
          </View>
        </View>
      </View>

      {showButtons && (
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
            <CloseIcon size={20} color={COLORS.GREYSCALE_700} />
            <StyledText
              size={14}
              variant="bold"
              color={COLORS.GREYSCALE_700}
              textStyle={styles.declineButtonText}>
              Decline
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
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
      )}
    </View>
  );
};

export default RequestItemCard;
