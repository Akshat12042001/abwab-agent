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
import {StyledText, CustomButton} from '../../atoms';
import {ASSETS} from '../../../constants/assets';
import {CheckIcon} from '../../svgs';

const VisitFeedbackModal = ({
  isVisible,
  onCloseModal,
  onSubmitFeedback,
  isSubmitting = false,
  propertyTitle = '2 Bedroom Apartment in NewKairo',
  developer = 'SODIC',
  location = 'New Cairo',
  clientName = 'Ahmed Elghandour',
  clientImage = ASSETS.IMAGES.PERSON,
}) => {
  const {t} = useTranslation();
  const [selectedFeedback, setSelectedFeedback] = useState('interested');
  const [notes, setNotes] = useState('');

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!onSubmitFeedback) {
      onCloseModal();
      return;
    }
    const result = await onSubmitFeedback({
      feedback: selectedFeedback,
      notes: notes.trim(),
    });
    if (result === false) return;
    // `true`: parent navigated away (e.g. success screen); avoid onCloseModal on unmounted tree.
    if (result === true) return;
    onCloseModal();
  };

  const feedbackOptions = [
    {
      id: 'interested',
      label: t('VISIT_FEEDBACK_MODAL.CLIENT_INTERESTED'),
      emoji: '👍',
      color: COLORS.PRIMARY,
    },
    {
      id: 'undecided',
      label: t('VISIT_FEEDBACK_MODAL.UNDECIDED'),
      emoji: '🤔',
      color: COLORS.GREYSCALE_700,
    },
    {
      id: 'not_interested',
      label: t('VISIT_FEEDBACK_MODAL.NOT_INTERESTED'),
      emoji: '👎',
      color: COLORS.GREYSCALE_700,
    },
  ];

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
          {t('VISIT_FEEDBACK_MODAL.TITLE')}
        </StyledText>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Property Details Card */}
          <View style={styles.propertyCard}>
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
                    {t('VISIT_FEEDBACK_MODAL.VERIFIED_CLIENT')}
                  </StyledText>
                </View>
              </View>
            </View>
          </View>

          {/* How did the visit go? Section */}
          <View style={styles.feedbackSection}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('VISIT_FEEDBACK_MODAL.HOW_DID_THE_VISIT_GO')}
            </StyledText>
            {feedbackOptions.map(option => {
              const isSelected = selectedFeedback === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.feedbackOption,
                    isSelected && styles.feedbackOptionSelected,
                  ]}
                  onPress={() => setSelectedFeedback(option.id)}
                  activeOpacity={0.7}>
                  <View style={styles.feedbackOptionContent}>
                    <StyledText size={24}>{option.emoji}</StyledText>
                    <StyledText
                      size={14}
                      variant="bold"
                      color={isSelected ? COLORS.PRIMARY : COLORS.GREYSCALE_700}
                      textStyle={styles.feedbackOptionText}>
                      {option.label}
                    </StyledText>
                  </View>
                  {isSelected && (
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 10,
                        backgroundColor: COLORS.PRIMARY,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CheckIcon size={16} color={COLORS.WHITE} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notes Section */}
          <View style={styles.notesSection}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('VISIT_FEEDBACK_MODAL.NOTES_OPTIONAL')}
            </StyledText>
            <TextInput
              style={styles.notesInput}
              placeholder={t('VISIT_FEEDBACK_MODAL.NOTES_PLACEHOLDER')}
              placeholderTextColor={COLORS.GREYSCALE_500}
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <CustomButton
            title={t('VISIT_FEEDBACK_MODAL.SUBMIT_FEEDBACK')}
            onPress={handleSubmit}
            containerStyle={styles.submitButton}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCloseModal}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
              {t('VISIT_FEEDBACK_MODAL.CANCEL')}
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VisitFeedbackModal;
