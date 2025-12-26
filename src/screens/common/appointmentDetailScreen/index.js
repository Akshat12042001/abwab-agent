import React, {Component} from 'react';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
  CustomButton,
} from '../../../components/atoms';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MapboxGL from '@rnmapbox/maps';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {ASSETS} from '../../../constants/assets';
import styles from './styles';
import {
  ReportNoShowModal,
  VisitFeedbackModal,
} from '../../../components/modals';

class AppointmentDetailScreen extends Component {
  constructor(props) {
    super(props);
    // Static dummy data
    this.state = {
      currentImageIndex: 0,
      carouselImages: [
        ASSETS.IMAGES.DUMMY_IMAGE,
        ASSETS.IMAGES.DUMMY_IMAGE,
        ASSETS.IMAGES.DUMMY_IMAGE,
      ],
      propertyTitle: 'Mountain View Villa',
      propertyLocation: '5th Settlement, Katameya',
      appointmentDate: 'Aug 5, 2023',
      appointmentTime: '2:30 PM',
      clientName: 'Ahmed Elghandour',
      clientImage: ASSETS.IMAGES.PERSON,
      isVerified: true,
      meetingLocation: 'Gate B - Palm Hills Compound, New Cairo',
      notes: 'Client prefers morning slots for future appointments',
      // Map coordinates (Cairo, Egypt)
      mapCenter: [31.2357, 30.0444],
      isVisitFeedbackModalVisible: false,
      isReportNoShowModalVisible: false,
    };
  }

  handleMarkCompleted = () => {
    console.log('Mark as completed');
    // Handle mark as completed
  };

  handleNoShow = () => {
    this.setState({isReportNoShowModalVisible: true});
    // Handle no-show
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {t} = this.props?.i18n;
    const {
      currentImageIndex,
      carouselImages,
      propertyTitle,
      propertyLocation,
      appointmentDate,
      appointmentTime,
      clientName,
      clientImage,
      isVerified,
      meetingLocation,
      notes,
      mapCenter,
      isVisitFeedbackModalVisible,
      isReportNoShowModalVisible,
    } = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <CommonHeader title={t('APPOINTMENT_DETAIL_SCREEN.TITLE')} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: insetBottom + 100},
          ]}>
          {/* Image Carousel */}
          <View style={styles.carouselContainer}>
            <Carousel
              width={SCREEN.WIDTH - 40}
              height={180}
              data={carouselImages}
              onSnapToItem={index => this.setState({currentImageIndex: index})}
              renderItem={({item}) => (
                <ImageBackground
                  source={item}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              )}
              pagingEnabled
            />
            {/* Carousel Indicators */}
            {carouselImages.length > 1 && (
              <View style={styles.carouselIndicators}>
                {carouselImages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentImageIndex && styles.indicatorActive,
                    ]}
                  />
                ))}
              </View>
            )}
            {/* Property Information */}
            <View style={styles.propertyInfoCard}>
              <StyledText
                size={16}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.propertyTitle}>
                {propertyTitle}
              </StyledText>
              <StyledText
                size={14}
                variant="medium"
                color={COLORS.GREYSCALE_500}
                textStyle={styles.propertyLocation}>
                {propertyLocation}
              </StyledText>
            </View>
          </View>

          {/* Visit Information */}
          <View style={styles.section}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('APPOINTMENT_DETAIL_SCREEN.VISIT_INFORMATION')}
            </StyledText>
            <View style={styles.visitInfoRow}>
              <View style={styles.visitInfoBox}>
                <StyledText
                  size={12}
                  variant="semiBold"
                  color={COLORS.GREYSCALE_500}
                  textStyle={styles.visitInfoLabel}>
                  {t('APPOINTMENT_DETAIL_SCREEN.APPOINTMENT_DATE')}
                </StyledText>
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.visitInfoValue}>
                  {appointmentDate}
                </StyledText>
              </View>
              <View
                style={[styles.visitInfoBox, styles.visitInfoBoxHighlighted]}>
                <StyledText
                  size={12}
                  variant="medium"
                  color={COLORS.GREYSCALE_500}
                  textStyle={styles.visitInfoLabel}>
                  {t('APPOINTMENT_DETAIL_SCREEN.APPOINTMENT_TIME')}
                </StyledText>
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.visitInfoValue}>
                  {appointmentTime}
                </StyledText>
              </View>
            </View>
          </View>

          {/* Client Information */}
          <View style={styles.section}>
            <StyledText
              size={16}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('APPOINTMENT_DETAIL_SCREEN.CLIENT_INFORMATION')}
            </StyledText>
            <View style={styles.clientInfoRow}>
              <Image
                source={clientImage}
                style={styles.clientImage}
                resizeMode="cover"
              />
              <View style={styles.clientInfo}>
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.clientName}>
                  {clientName}
                </StyledText>
                {isVerified && (
                  <View style={styles.verifiedBadge}>
                    <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                      {t('APPOINTMENT_DETAIL_SCREEN.VERIFIED_CLIENT')}
                    </StyledText>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Location on Maps */}
          <View style={{marginHorizontal: SCREEN_PADDING}}>
            <StyledText
              size={18}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('APPOINTMENT_DETAIL_SCREEN.LOCATION_ON_MAPS')}
            </StyledText>
            <View style={styles.mapContainer}>
              <MapboxGL.MapView style={styles.map}>
                <MapboxGL.Camera
                  zoomLevel={14}
                  centerCoordinate={mapCenter}
                  animationDuration={0}
                />
                <MapboxGL.PointAnnotation
                  id="appointment-location"
                  coordinate={mapCenter}
                />
              </MapboxGL.MapView>
            </View>
          </View>

          {/* Meeting Location */}
          <View style={{marginHorizontal: SCREEN_PADDING, marginTop: 16}}>
            <StyledText
              size={18}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('APPOINTMENT_DETAIL_SCREEN.MEETING_LOCATION')}
            </StyledText>
            <StyledText
              size={16}
              color={COLORS.GREYSCALE_700}
              textStyle={styles.meetingLocationText}>
              {meetingLocation}
            </StyledText>
          </View>

          {/* Notes */}
          <View
            style={{
              marginBottom: 106,
              marginHorizontal: SCREEN_PADDING,
              marginTop: 12,
            }}>
            <StyledText
              size={18}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.sectionTitle}>
              {t('APPOINTMENT_DETAIL_SCREEN.NOTES')}
            </StyledText>
            <View style={styles.notesBox}>
              <StyledText
                size={14}
                variant="regular"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.notesText}>
                {notes}
              </StyledText>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View
          style={[
            styles.actionButtonsContainer,
            {paddingBottom: insetBottom + 20},
          ]}>
          <CustomButton
            title={t('APPOINTMENT_DETAIL_SCREEN.MARK_AS_COMPLETED')}
            onPress={() => this.setState({isVisitFeedbackModalVisible: true})}
            containerStyle={styles.completedButton}
          />
          <TouchableOpacity
            style={styles.noShowButton}
            onPress={this.handleNoShow}
            activeOpacity={0.8}>
            <StyledText size={14} variant="bold" color={COLORS.GREYSCALE_700}>
              {t('APPOINTMENT_DETAIL_SCREEN.CLIENT_WERE_A_NO_SHOW')}
            </StyledText>
          </TouchableOpacity>
        </View>
        <VisitFeedbackModal
          isVisible={isVisitFeedbackModalVisible}
          onSubmitFeedback={this.handleSubmitFeedback}
          onCloseModal={() =>
            this.setState({isVisitFeedbackModalVisible: false})
          }
        />
        <ReportNoShowModal
          isVisible={isReportNoShowModalVisible}
          onCloseModal={() =>
            this.setState({isReportNoShowModalVisible: false})
          }
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(AppointmentDetailScreen));
