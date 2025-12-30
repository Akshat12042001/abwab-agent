import React, {Component} from 'react';
import {TouchableOpacity, Platform, Keyboard, View} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Day,
  Composer,
  Time,
} from 'react-native-gifted-chat';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {withTranslation} from 'react-i18next';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, FONTS} from '../../../constants';
import {
  LocationIcon,
  PaperClickIcon,
  SendIcon,
  DocumentFillIcon,
  CloseIcon,
} from '../../../components/svgs';
import {
  AttachmentOptionsModal,
  SendPaymentRequestModal,
  SendContractModal,
} from '../../../components/modals';
import styles from './styles';
import {SharedStyles} from '../../../shared';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    // Get user info from route params or use default
    const {route} = this.props;
    const contactName = route?.params?.contactName || 'Ahmed Elghandour';
    const contactLocation =
      route?.params?.contactLocation || 'Palm Hills Villa - New Cairo';

    // Mock user ID - in real app, this would come from auth/state
    this.userId = 'agent_1';

    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Perfect! See you tomorrow at 10 AM. Thank you!',
          createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
          user: {
            _id: 'client_1',
            name: 'Ahmed Elghandour',
          },
        },
        {
          _id: 2,
          text: 'Just bring a valid ID and any questions you might have about the property. All the necessary documents and keys will be ready.',
          createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          user: {
            _id: this.userId,
            name: 'Agent',
          },
        },
        {
          _id: 3,
          text: 'At the villa directly. What should I bring?',
          createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
          user: {
            _id: 'client_1',
            name: 'Ahmed Elghandour',
          },
        },
        {
          _id: 4,
          text: '123 Palm Hills Drive, New Cairo. Would you like to meet there or at the office first?',
          createdAt: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
          user: {
            _id: this.userId,
            name: 'Agent',
          },
        },
        {
          _id: 5,
          text: "Tomorrow at 10 AM. What's the exact address?",
          createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
          user: {
            _id: 'client_1',
            name: 'Ahmed Elghandour',
          },
        },
        {
          _id: 6,
          text: "I'm available this afternoon at 2 PM or tomorrow morning at 10 AM. Which works better for you?",
          createdAt: new Date(Date.now() - 1000 * 60 * 0), // Just now
          user: {
            _id: this.userId,
            name: 'Agent',
          },
        },
        {
          _id: 7,
          text: "I'm interested in viewing the Palm Hills Villa. Can we schedule a visit?",
          createdAt: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
          user: {
            _id: 'client_1',
            name: 'Ahmed Elghandour',
          },
        },
      ],
      contactName,
      contactLocation,
      showAttachmentModal: false,
      showPaymentRequestModal: false,
      showContractModal: false,
      selectedContracts: [],
    };
  }

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  handleLocationPress = () => {
    console.log('Location pressed');
    // Navigate to location/map screen
  };

  handleAttachmentPress = () => {
    Keyboard.dismiss();
    this.setState({showAttachmentModal: true});
  };

  handleCloseAttachmentModal = () => {
    this.setState({showAttachmentModal: false});
  };

  handleSendContract = () => {
    this.handleCloseAttachmentModal();
    this.setState({showContractModal: true});
  };

  handleCloseContractModal = () => {
    this.setState({showContractModal: false});
  };

  handleContractDone = selectedContractIds => {
    // Map contract IDs to contract objects with labels
    const defaultContracts = [
      {id: 'noc_1', label: 'NOC Contract', type: 'noc'},
      {id: 'cce_1', label: 'CCE Contract', type: 'cce'},
      {id: 'ab_1', label: 'AB Contract', type: 'ab'},
      {id: 'noc_2', label: 'NOC Contract', type: 'noc'},
      {id: 'cce_2', label: 'CCE Contract', type: 'cce'},
      {id: 'ab_2', label: 'AB Contract', type: 'ab'},
      {id: 'noc_3', label: 'NOC Contract', type: 'noc'},
      {id: 'cce_3', label: 'CCE Contract', type: 'cce'},
      {id: 'ab_3', label: 'AB Contract', type: 'ab'},
    ];

    const contracts = selectedContractIds.map(id => {
      const contract = defaultContracts.find(c => c.id === id);
      return contract || {id, label: 'Contract'};
    });

    this.setState({selectedContracts: contracts});
    this.handleCloseContractModal();
  };

  handleSendPaymentRequest = () => {
    this.handleCloseAttachmentModal();
    this.setState({showPaymentRequestModal: true});
  };

  handleClosePaymentRequestModal = () => {
    this.setState({showPaymentRequestModal: false});
  };

  handlePaymentRequestDone = paymentType => {
    console.log('Payment Request Done:', paymentType);
    // Handle payment request submission
    this.handleClosePaymentRequestModal();
  };

  renderBubble = props => {
    const {currentMessage} = props;
    const hasContracts =
      currentMessage?.contracts && currentMessage.contracts.length > 0;

    if (hasContracts) {
      return (
        <View
          style={[
            styles.contractMessageContainer,
            currentMessage.user._id === this.userId
              ? styles.contractMessageRight
              : styles.contractMessageLeft,
          ]}>
          {currentMessage.contracts.map((contract, index) => (
            <View
              key={contract.id || index}
              style={[
                styles.contractFileItem,
                currentMessage.user._id === this.userId
                  ? {borderBottomRightRadius: 0}
                  : {borderBottomLeftRadius: 0},
                index === currentMessage.contracts.length - 1 &&
                  styles.contractFileItemLast,
              ]}>
              <DocumentFillIcon size={24} />
              <StyledText
                size={14}
                variant="regular"
                color={COLORS.PRIMARY}
                textStyle={styles.contractFileName}>
                {contract.label}.Pdf
              </StyledText>
            </View>
          ))}
        </View>
      );
    }

    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.PRIMARY,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 0,
            marginBottom: 4,
            marginRight: 4,
          },
          left: {
            backgroundColor: COLORS.GREYSCALE_200,
            borderRadius: 12,
            marginBottom: 4,
            marginLeft: 4,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.WHITE,
            fontSize: 14,
            fontFamily: 'Manrope-Regular',
          },
          left: {
            color: COLORS.GREYSCALE_900,
            fontSize: 14,
            fontFamily: 'Manrope-Regular',
          },
        }}
        timeTextStyle={{
          right: {
            color: COLORS.WHITE_80,
            fontSize: 11,
            marginTop: 4,
          },
          left: {
            color: COLORS.GREYSCALE_500,
            fontSize: 11,
            marginTop: 4,
          },
        }}
        containerStyle={{
          right: {
            marginBottom: 2,
          },
          left: {
            marginBottom: 2,
          },
        }}
      />
    );
  };

  renderComposer = props => {
    const existingTextInputProps = props.textInputProps || {};
    const {t} = this.props?.i18n;
    const {selectedContracts} = this.state;
    const hasContracts = selectedContracts.length > 0;
    return (
      <>
        {hasContracts ? (
          <View style={styles.contractsContainer}>
            <View style={styles.contractIconContainer}>
              <DocumentFillIcon size={30} />
              <View style={styles.contractBadge}>
                <StyledText size={8} variant="bold" color={COLORS.WHITE}>
                  {selectedContracts.length}
                </StyledText>
              </View>
            </View>
            <View style={styles.contractNamesContainer}>
              {selectedContracts.map((contract, index) => (
                <StyledText
                  key={contract.id}
                  size={12}
                  variant="regular"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.contractName}>
                  {contract.label}.Pdf
                  {index < selectedContracts.length - 1 ? ' ,' : ''}
                </StyledText>
              ))}
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: -8,
                top: -8,
                borderWidth: 1,
                borderColor: COLORS.GREYSCALE_900,
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
              }}
              hitSlop={SharedStyles.hitSlop10}
              onPress={() => this.setState({selectedContracts: []})}>
              <CloseIcon size={20} color={COLORS.GREYSCALE_900} />
            </TouchableOpacity>
          </View>
        ) : (
          <Composer
            {...props}
            multiline={true}
            placeholderTextColor={COLORS.GRAY_TEXT}
            textInputProps={{
              ...existingTextInputProps,
              multiline: true,
              blurOnSubmit: false,
              numberOfLines: 2,
              placeholder: t('CHAT_SCREEN.TYPE_MESSAGE'),
              style: {
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingTop: 12,
                paddingBottom: 12,
                fontSize: 14,
                fontFamily: FONTS.regular,
                color: COLORS.GREYSCALE_900,
                borderColor: COLORS.GREYSCALE_400,
                paddingRight: 40,
              },
            }}
          />
        )}

        <TouchableOpacity
          hitSlop={SharedStyles.hitSlop10}
          style={styles.sendButton}
          onPress={this.handleAttachmentPress}
          onStartShouldSetResponder={() => true}>
          <PaperClickIcon size={20} color={COLORS.WHITE} />
        </TouchableOpacity>
      </>
    );
  };

  renderSend = props => {
    const {text} = props;
    const {selectedContracts} = this.state;
    const hasText = text && text.trim().length > 0;
    const hasContracts = selectedContracts.length > 0;
    const canSend = hasText || hasContracts;

    return (
      <TouchableOpacity
        onPress={() => {
          const txt = (text || '').trim();
          if (canSend) {
            if (hasContracts) {
              // Send contracts message
              props.onSend(
                [
                  {
                    _id: Math.round(Math.random() * 1000000),
                    text: '',
                    contracts: selectedContracts,
                    createdAt: new Date(),
                    user: {
                      _id: this.userId,
                    },
                  },
                ],
                true,
              );
              // Clear contracts after sending
              this.setState({selectedContracts: []});
            } else {
              // Send regular text message
              props.onSend(
                [
                  {
                    _id: Math.round(Math.random() * 1000000),
                    text: txt,
                    createdAt: new Date(),
                    user: {
                      _id: this.userId,
                    },
                  },
                ],
                true,
              );
            }
          }
        }}
        style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
        disabled={!canSend}>
        <SendIcon size={20} color={COLORS.WHITE} />
      </TouchableOpacity>
    );
  };

  renderInputToolbar = props => {
    const {selectedContracts} = this.state;
    return (
      <View>
        <InputToolbar
          {...props}
          containerStyle={[
            styles.inputToolbarContainer,
            {
              height:
                selectedContracts?.length >= 6
                  ? 250
                  : selectedContracts.length >= 3 &&
                    selectedContracts?.length < 6
                  ? 200
                  : selectedContracts.length <= 3 &&
                    selectedContracts?.length > 0
                  ? 160
                  : 140,
            },
          ]}
          primaryStyle={styles.inputToolbarRow}
          renderComposer={this.renderComposer}
          renderSend={this.renderSend}
        />
      </View>
    );
  };

  renderDay = props => {
    return (
      <Day
        {...props}
        textStyle={styles.dayText}
        wrapperStyle={styles.dayWrapper}
      />
    );
  };

  renderTime = props => {
    return (
      <Time
        {...props}
        containerStyle={{
          left: {
            // borderWidth: 1,
            width: '100%',
            alignItems: 'flex-start',
          },
          right: {
            // borderWidth: 1,
            width: '100%',
            alignItems: 'flex-end',
          },
        }}
        wrapperStyle={{
          right: {
            alignItems: 'flex-end',
            marginTop: 4,
          },
          left: {
            alignItems: 'flex-start',
            marginTop: 4,
          },
        }}
        timeTextStyle={{
          right: {
            color: COLORS.GREYSCALE_500,
            fontSize: 11,
            // borderWidth: 1,
          },
          left: {
            color: COLORS.GREYSCALE_500,
            fontSize: 11,
          },
        }}
      />
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {messages, contactName, contactLocation} = this.state;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader
          title={contactName}
          subTitle={contactLocation}
          rightComponent={
            <TouchableOpacity
              style={styles.rightComponent}
              onPress={this.handleLocationPress}>
              <LocationIcon size={24} color={COLORS.GREYSCALE_900} />
            </TouchableOpacity>
          }
        />
        <View style={{height: 1, backgroundColor: COLORS.GREYSCALE_100}} />
        <GiftedChat
          textInputRef={this.textInputRef}
          messages={messages}
          onSend={this.onSend}
          user={{
            _id: this.userId,
          }}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderDay={this.renderDay}
          renderTime={this.renderTime}
          scrollToBottom
          scrollToBottomComponent={() => null}
          dateFormat="MMM DD, YYYY"
          timeFormat="hh:mm A"
          renderAvatar={() => null}
          keyboardAvoidingViewProps={{
            behavior: Platform.OS === 'ios' ? 'padding' : 'height',
            keyboardVerticalOffset: Platform.OS === 'ios' ? 0 : 80,
          }}
          // showUserAvatar={false}
          // showAvatarForEveryMessage={false}
          bottomOffset={insetBottom}
          // minInputToolbarHeight={60}
          // textInputStyle={styles.textInput}
          // textInputProps={{
          //   style: styles.textInputInner,
          // }}
          isTyping={false}
          infiniteScroll
          loadEarlier={false}
        />
        <AttachmentOptionsModal
          visible={this.state.showAttachmentModal}
          onClose={this.handleCloseAttachmentModal}
          onSendContract={this.handleSendContract}
          onSendPaymentRequest={this.handleSendPaymentRequest}
          bottomOffset={insetBottom}
        />
        <SendPaymentRequestModal
          visible={this.state.showPaymentRequestModal}
          onClose={this.handleClosePaymentRequestModal}
          onDone={this.handlePaymentRequestDone}
          bottomOffset={insetBottom}
          paymentTypes={[
            {label: 'Down Payment', value: 'down_payment'},
            {label: 'Installment', value: 'installment'},
            {label: 'Full Payment', value: 'full_payment'},
            {label: 'Maintenance Fee', value: 'maintenance_fee'},
          ]}
        />
        <SendContractModal
          visible={this.state.showContractModal}
          onClose={this.handleCloseContractModal}
          onDone={this.handleContractDone}
          bottomOffset={insetBottom}
          selectedContracts={this.state.selectedContracts.map(c => c.id)}
        />
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(ChatScreen));
