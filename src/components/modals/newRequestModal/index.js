import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import {StyledText} from '../../atoms';
import {CheckIcon, CloseIcon} from '../../svgs';
import {ASSETS} from '../../../constants/assets';
import {COLORS} from '../../../constants';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {useTranslation} from 'react-i18next';
const NewRequestModal = ({
  visible,
  onClose,
  onAccept,
  onDecline,
  propertyName = 'Mountain View Villa',
  location = '5th Settlement, Katameya',
  agentName = 'Ahmed Elghandour',
  agentImage = ASSETS.IMAGES.PERSON,
  propertyImage = ASSETS.IMAGES.DUMMY_IMAGE,
  appointmentDate = 'Aug 5, 2023',
  appointmentTime = '2:30 PM',
  meetingPoint = 'Gate A - Main Compound Entrance',
  initialTimerSeconds = 250, // 4 minutes 10 seconds
}) => {
  const [timerSeconds, setTimerSeconds] = useState(initialTimerSeconds);
  const {t} = useTranslation();
  useEffect(() => {
    if (visible && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [visible, timerSeconds]);

  useEffect(() => {
    if (visible) {
      setTimerSeconds(initialTimerSeconds);
    }
  }, [visible, initialTimerSeconds]);

  const formatTimer = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Calculate progress percentage (0 to 1)
  const progress = (initialTimerSeconds - timerSeconds) / initialTimerSeconds;

  // SVG circle parameters
  const size = 70;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  const handleDecline = () => {
    if (onDecline) {
      onDecline();
    }
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating>
      <View style={styles.modalContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <StyledText
              size={18}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textAlign="center">
              {t('MODALS.NEW_VIEWING_REQUEST.TITLE')}
            </StyledText>
            <View style={styles.timerContainer}>
              <View style={styles.timerCircleContainer}>
                <Svg width={size} height={size} style={styles.timerSvg}>
                  <Defs>
                    <LinearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%">
                      <Stop
                        offset="0%"
                        stopColor={COLORS.PRIMARY}
                        stopOpacity="1"
                      />
                      <Stop
                        offset="100%"
                        stopColor={COLORS.PRIMARY_50}
                        stopOpacity="1"
                      />
                    </LinearGradient>
                  </Defs>
                  {/* Background circle */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={COLORS.GREYSCALE_200}
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* Progress circle with gradient */}
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  />
                </Svg>
                <View style={styles.timerTextContainer}>
                  <StyledText
                    size={14}
                    variant="bold"
                    color={COLORS.GREYSCALE_900}>
                    {formatTimer(timerSeconds)}
                  </StyledText>
                </View>
              </View>
              <StyledText
                size={14}
                variant="medium"
                color={COLORS.PRIMARY}
                textStyle={styles.respondQuicklyText}>
                {t('MODALS.NEW_VIEWING_REQUEST.RESPOND_QUICKLY')}
              </StyledText>
            </View>
          </View>
          <View
            style={{
              ...SharedStyles.shadow,
              backgroundColor: COLORS.WHITE,
              borderRadius: 12,
              padding: 12,
            }}>
            {/* Property Image */}
            <Image
              source={propertyImage}
              style={styles.propertyImage}
              resizeMode="cover"
            />

            {/* Property Info */}
            <View style={styles.propertyInfo}>
              <StyledText size={16} variant="bold" color={COLORS.GREYSCALE_900}>
                {propertyName}
              </StyledText>
              <StyledText
                size={12}
                variant="semiBold"
                color={COLORS.GREYSCALE_500}
                textStyle={styles.locationText}>
                {location}
              </StyledText>

              {/* Agent Info */}
              <View style={styles.agentRow}>
                <Image source={agentImage} style={styles.agentImage} />
                <StyledText
                  size={12}
                  variant="bold"
                  color={COLORS.PRIMARY}
                  textStyle={styles.agentNameText}>
                  {agentName}
                </StyledText>
              </View>
            </View>

            {/* Visit Information */}
            <View style={styles.section}>
              <StyledText
                size={14}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.sectionTitle}>
                {t('MODALS.NEW_VIEWING_REQUEST.VISIT_INFORMATION')}
              </StyledText>
              <View style={styles.infoRow}>
                <View style={styles.infoBox}>
                  <StyledText
                    size={12}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_500}
                    textStyle={styles.infoLabel}>
                    {t('MODALS.NEW_VIEWING_REQUEST.APPOINTMENT_DATE')}
                  </StyledText>
                  <StyledText
                    size={14}
                    variant="bold"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.infoValue}>
                    {appointmentDate}
                  </StyledText>
                </View>
                <View style={styles.infoBox}>
                  <StyledText
                    size={12}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_500}
                    textStyle={styles.infoLabel}>
                    {t('MODALS.NEW_VIEWING_REQUEST.APPOINTMENT_TIME')}
                  </StyledText>
                  <StyledText
                    size={14}
                    variant="bold"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.infoValue}>
                    {appointmentTime}
                  </StyledText>
                </View>
              </View>
            </View>
            {/* Meeting Point */}
            <View style={{marginTop: 10}}>
              <StyledText
                size={14}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.sectionTitle}>
                {t('MODALS.NEW_VIEWING_REQUEST.MEETING_POINT')}
              </StyledText>
              <View style={styles.meetingPointBox}>
                <StyledText
                  size={14}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}>
                  {meetingPoint}
                </StyledText>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
              activeOpacity={0.8}>
              <CheckIcon size={20} color={COLORS.WHITE} />
              <StyledText
                size={16}
                variant="bold"
                color={COLORS.WHITE}
                textStyle={styles.acceptButtonText}>
                {t('MODALS.NEW_VIEWING_REQUEST.ACCEPT_REQUEST')}
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={handleDecline}
              activeOpacity={0.8}>
              <CloseIcon size={20} color={COLORS.GREYSCALE_700} />
              <StyledText
                size={16}
                variant="bold"
                color={COLORS.GREYSCALE_700}
                textStyle={styles.declineButtonText}>
                {t('MODALS.NEW_VIEWING_REQUEST.DECLINE')}
              </StyledText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NewRequestModal;
