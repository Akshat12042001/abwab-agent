import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {CommonHeader, ScreenContainer} from '../../../components/atoms';
import {RequestItemCard, AnimatedButtons} from '../../../components/molecules';
import {COLORS, SCREEN} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

class ViewingRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0, // 0: Pending, 1: Accepted, 2: Declined
    };
  }

  handleTabChange = (index, value) => {
    this.setState({selectedTabIndex: index});
  };

  handleAccept = item => {
    // Handle accept logic
    console.log('Accept:', item);
  };

  handleDecline = item => {
    // Handle decline logic
    console.log('Decline:', item);
  };

  getAppointmentsData = () => {
    const {selectedTabIndex} = this.state;

    // Sample data - replace with actual data fetching
    const pendingData = [
      {
        id: '1',
        propertyName: 'Mountain View Villa',
        location: '5th Settlement, Katameya',
        agentName: 'Ahmed Elghandour',
        appointmentDate: 'Aug 6, 2023 • 4:30 PM',
        appointmentType: 'In-person',
        agentMessage:
          'I will wait you at time, you can call me when you Arrived.',
      },
      {
        id: '2',
        propertyName: 'Mountain View Villa',
        location: '5th Settlement, Katameya',
        agentName: 'Ahmed Elghandour',
        appointmentDate: 'Aug 6, 2023 • 4:30 PM',
        appointmentType: 'In-person',
        agentMessage: null,
      },
      {
        id: '3',
        propertyName: 'Mountain View Villa',
        location: '5th Settlement, Katameya',
        agentName: 'Ahmed Elghandour',
        appointmentDate: 'Aug 6, 2023 • 4:30 PM',
        appointmentType: 'Video',
        agentMessage:
          'I will wait you at time, you can call me when you Arrived.',
      },
    ];

    const acceptedData = [
      {
        id: '4',
        propertyName: 'Mountain View Villa',
        location: '5th Settlement, Katameya',
        agentName: 'Ahmed Elghandour',
        appointmentDate: 'Aug 7, 2023 • 2:00 PM',
        appointmentType: 'In-person',
        agentMessage: null,
      },
    ];

    const declinedData = [
      {
        id: '5',
        propertyName: 'Mountain View Villa',
        location: '5th Settlement, Katameya',
        agentName: 'Ahmed Elghandour',
        appointmentDate: 'Aug 8, 2023 • 10:00 AM',
        appointmentType: 'Video',
        agentMessage: null,
      },
    ];

    switch (selectedTabIndex) {
      case 0:
        return pendingData;
      case 1:
        return acceptedData;
      case 2:
        return declinedData;
      default:
        return pendingData;
    }
  };

  render() {
    const {t} = this.props?.i18n;
    const {selectedTabIndex} = this.state;
    const appointmentsData = this.getAppointmentsData();

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={this.props?.insets?.top + 30}>
        <CommonHeader title={t('HOME_SCREEM.VIEWING_REQUESTS')} />
        <View style={styles.tabsContainer}>
          <AnimatedButtons
            options={[
              'HOME_SCREEM.PENDING',
              'HOME_SCREEM.ACCEPTED',
              'HOME_SCREEM.DECLINED',
            ]}
            selectedIndex={selectedTabIndex}
            onSelect={this.handleTabChange}
            containerStyle={styles.tabsWrapper}
          />
        </View>
        <FlatList
          data={appointmentsData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <View style={styles.cardWrapper}>
              <RequestItemCard
                containerStyle={{width: SCREEN.WIDTH - 40}}
                propertyName={item.propertyName}
                location={item.location}
                agentName={item.agentName}
                appointmentDate={item.appointmentDate}
                appointmentType={item.appointmentType}
                agentMessage={item.agentMessage}
                onAccept={() => this.handleAccept(item)}
                onDecline={() => this.handleDecline(item)}
                showButtons={selectedTabIndex === 0}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(ViewingRequestScreen));
