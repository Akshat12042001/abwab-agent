import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import {COLORS} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {StyledText} from '../../atoms';
import {ASSETS} from '../../../constants/assets';

const ReportNoShowModal = ({
  isVisible,
  onCloseModal,
  onConfirmNoShow,
  propertyTitle = '2 Bedroom Apartment in NewKairo',
  developer = 'SODIC',
  location = 'New Cairo',
  clientName = 'Ahmed Elghandour',
  clientImage = ASSETS.IMAGES.PERSON,
}) => {
  const {t} = useTranslation();
  const [privateNote, setPrivateNote] = useState('');

  const handleConfirm = () => {
    if (onConfirmNoShow) {
      onConfirmNoShow({
        note: privateNote.trim(),
      });
    }
    onCloseModal();
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        {/* Title */}
        <StyledText
          size={18}
          variant="bold"
          textAlign="center"
          textStyle={styles.title}
          color={COLORS.GREYSCALE_900}>
          {t('REPORT_NO_SHOW_MODAL.TITLE')}
        </StyledText>

        {/* Description */}
        <StyledText
          size={14}
          variant="medium"
          textAlign="center"
          textStyle={styles.description}
          color={COLORS.GREYSCALE_900}>
          {t('REPORT_NO_SHOW_MODAL.DESCRIPTION')}
        </StyledText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Appointment Information Card */}
          <View style={styles.appointmentCard}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.propertyTitle}>
              {propertyTitle}
            </StyledText>
            <StyledText
              size={12}
              variant="semiBold"
              color={COLORS.GREYSCALE_500}
              textStyle={styles.propertySubtitle}>
              {developer} • {location}
            </StyledText>
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
                <View style={styles.verifiedBadge}>
                  <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                    {t('REPORT_NO_SHOW_MODAL.VERIFIED_CLIENT')}
                  </StyledText>
                </View>
              </View>
            </View>
          </View>

          {/* Private Note Section */}
          <View style={styles.noteSection}>
            <StyledText
              size={14}
              variant="medium"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('REPORT_NO_SHOW_MODAL.ADD_PRIVATE_NOTE')}
            </StyledText>
            <TextInput
              style={styles.noteInput}
              placeholder={t('REPORT_NO_SHOW_MODAL.NOTE_PLACEHOLDER')}
              placeholderTextColor={COLORS.GREYSCALE_500}
              multiline
              numberOfLines={4}
              value={privateNote}
              onChangeText={setPrivateNote}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.WHITE}>
              {t('REPORT_NO_SHOW_MODAL.CONFIRM_AND_LOG')}
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCloseModal}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
              {t('REPORT_NO_SHOW_MODAL.CANCEL')}
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportNoShowModal;
