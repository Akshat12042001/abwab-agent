import React, {Component} from 'react';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS, NAVIGATION} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {CalenderIcon, SettingsIcon} from '../../../components/svgs';
import {ASSETS} from '../../../constants/assets';
import {AppointmentCard} from '../../../components/molecules';
import {DatePickerModal} from '../../../components/modals';
import styles from './styles';

class AppointmentsScreen extends Component {
  constructor(props) {
    super(props);
    // Generate dates for the next 7 days
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: i,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en-US', {weekday: 'short'}),
        date: date,
      });
    }
    // Mock appointment data
    const mockAppointments = [
      {
        id: '1',
        propertyTitle: '2 Bedroom Apartment in NewKairo',
        developer: 'SODIC',
        location: 'New Cairo',
        clientName: 'Ahmed Elghandour',
        clientImage: ASSETS.IMAGES.PERSON,
        isVerified: true,
        appointmentDate: 'June 15, 2025 • 4:30 PM',
      },
      {
        id: '2',
        propertyTitle: '3 Bedroom Villa in Palm Hills',
        developer: 'Palm Hills',
        location: '6th October',
        clientName: 'Fatima Ali',
        clientImage: ASSETS.IMAGES.PERSON,
        isVerified: true,
        appointmentDate: 'June 15, 2025 • 2:00 PM',
      },
      {
        id: '3',
        propertyTitle: '1 Bedroom Studio in New Capital',
        developer: 'SODIC',
        location: 'New Administrative Capital',
        clientName: 'Mohamed Hassan',
        clientImage: ASSETS.IMAGES.PERSON,
        isVerified: false,
        appointmentDate: 'June 15, 2025 • 6:00 PM',
      },
    ];

    this.state = {
      selectedDateIndex: 2, // Default to 15 Thu (index 2)
      dates: dates,
      appointments: mockAppointments,
      showDatePickerModal: false,
    };
  }

  handleDateSelect = index => {
    this.setState({selectedDateIndex: index});
  };

  handleReschedule = appointmentId => {
    // Handle reschedule action
    console.log('Reschedule appointment:', appointmentId);
  };

  handleCancel = appointmentId => {
    // Handle cancel action
    console.log('Cancel appointment:', appointmentId);
  };

  handleLocationPress = appointmentId => {
    // Handle location press
    console.log('Location pressed for appointment:', appointmentId);
  };

  handleMessagePress = appointmentId => {
    // Handle message press
    console.log('Message pressed for appointment:', appointmentId);
  };

  handleOpenDatePicker = () => {
    this.setState({showDatePickerModal: true});
  };

  handleCloseDatePicker = () => {
    this.setState({showDatePickerModal: false});
  };

  handleDateConfirm = selectedDate => {
    // Handle date selection
    console.log('Selected date:', selectedDate);
    // You can update the dates array and selectedDateIndex here
    this.setState({showDatePickerModal: false});
  };

  handleLoadMore = () => {
    // Handle pagination - load more appointments
    console.log('Load more appointments');
    // Add your pagination logic here
  };

  renderHeader = () => {
    const {t} = this.props?.i18n;
    return (
      <View>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <StyledText
              size={24}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.headerTitle}>
              {t('APPOINTMENTS_SCREEN.APPOINTMENTS')}
            </StyledText>
            <StyledText
              size={14}
              variant="medium"
              color={COLORS.GREYSCALE_700}
              textStyle={styles.headerSubtitle}>
              {t(
                'APPOINTMENTS_SCREEN.TRACK_YOUR_UPCOMING_VIEWINGS_APPOINTMENTS',
              )}
            </StyledText>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              style={styles.headerIconBtn}
              onPress={this.handleOpenDatePicker}>
              <CalenderIcon size={24} color={COLORS.GREYSCALE_900} />
            </Pressable>
            <Pressable
              onPress={() =>
                this.props.navigation.navigate(NAVIGATION.STACKS.COMMON, {
                  screen: NAVIGATION.COMMON.CALENDER_MANAGEMENT_SCREEN,
                })
              }
              style={[styles.headerIconBtn, styles.headerIconBtnSpacing]}>
              <SettingsIcon size={24} color={COLORS.GREYSCALE_900} />
            </Pressable>
          </View>
        </View>

        {/* Date Selection Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScrollView}
          contentContainerStyle={styles.dateScrollContainer}>
          {this.state.dates.map((dateItem, index) => {
            const isSelected = index === this.state.selectedDateIndex;
            return (
              <TouchableOpacity
                key={dateItem.id}
                onPress={() => this.handleDateSelect(index)}
                style={[
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                ]}>
                <StyledText
                  size={18}
                  variant="bold"
                  color={isSelected ? COLORS.WHITE : COLORS.GREYSCALE_900}>
                  {dateItem.day}
                </StyledText>
                <StyledText
                  size={14}
                  color={isSelected ? COLORS.WHITE : COLORS.GREYSCALE_500}>
                  {dateItem.dayName}
                </StyledText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Today Appointments Section Title */}
        <View style={styles.appointmentsSection}>
          <StyledText
            size={18}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.sectionTitle}>
            {t('APPOINTMENTS_SCREEN.TODAY_APPOINTMENTS')}
          </StyledText>
        </View>
      </View>
    );
  };

  renderAppointmentCard = ({item}) => {
    return (
      <AppointmentCard
        propertyTitle={item.propertyTitle}
        developer={item.developer}
        location={item.location}
        clientName={item.clientName}
        clientImage={item.clientImage}
        isVerified={item.isVerified}
        appointmentDate={item.appointmentDate}
        onReschedule={() => this.handleReschedule(item.id)}
        onCancel={() => this.handleCancel(item.id)}
        onLocationPress={() => this.handleLocationPress(item.id)}
        onMessagePress={() => this.handleMessagePress(item.id)}
      />
    );
  };

  renderEmptyState = () => {
    const {t} = this.props?.i18n;
    return (
      <View style={styles.emptyStateContainer}>
        <View style={styles.emptyStateIconContainer}>
          <CalenderIcon size={50} color={COLORS.GREYSCALE_900} />
        </View>
        <StyledText
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.emptyStateTitle}>
          {t('APPOINTMENTS_SCREEN.EMPTY_STATE_TITLE')}
        </StyledText>
        <StyledText
          size={14}
          variant="regular"
          color={COLORS.GREYSCALE_700}
          textStyle={styles.emptyStateDescription}
          textAlign="center">
          {t('APPOINTMENTS_SCREEN.EMPTY_STATE_DESCRIPTION')}
        </StyledText>
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {appointments} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 30}>
        <FlatList
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={this.renderAppointmentCard}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmptyState}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />

        {/* Date Picker Modal */}
        <DatePickerModal
          visible={this.state.showDatePickerModal}
          onClose={this.handleCloseDatePicker}
          onConfirm={this.handleDateConfirm}
          initialDate={
            this.state.dates[this.state.selectedDateIndex]?.date
              ?.toISOString()
              .split('T')[0]
          }
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(AppointmentsScreen));
