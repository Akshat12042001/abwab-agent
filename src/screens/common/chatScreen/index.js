import React, {Component} from 'react';
import {TouchableOpacity, Platform, View} from 'react-native';
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
  SendIcon,
} from '../../../components/svgs';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {connect} from 'react-redux';
import {ChatSocketService} from '../../../services';
import {
  makeChatListRequest,
  makeChatMarkReadRequest,
  makeChatMessagesRequest,
  makeChatSendMessageRequest,
} from '../../../api/chat';
import {errorToast} from '../../../utils/alerts';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    // Get user info from route params or use default
    const {route} = this.props;
    const contactName = route?.params?.contactName || 'Ahmed Elghandour';
    const contactLocation =
      route?.params?.contactLocation || 'Palm Hills Villa - New Cairo';

    const {userData} = this.props;
    this.userId =
      userData?._id ||
      userData?.id ||
      userData?.agentId ||
      userData?.user?._id ||
      userData?.user?.id ||
      'agent';

    this.chatId = route?.params?.chatId || route?.params?.requestId || '';
    this.otherUserId = route?.params?.userId || '';
    this.socket = null;
    this.typingTimeout = null;

    this.state = {
      messages: [],
      contactName,
      contactLocation,
      selectedContracts: [],
      isOtherUserTyping: false,
      isLoadingMessages: false,
      page: 1,
      limit: 20,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.initializeChat();
  }

  componentWillUnmount() {
    this.cleanupSocket();
  }

  initializeChat = async () => {
    console.log('[Chat][Init] route params', this.props?.route?.params);
    console.log('[Chat][Init] currentUserId', this.userId, 'otherUserId', this.otherUserId);
    await this.resolveChatIdFromList();
    console.log('[Chat][Init] resolved chatId', this.chatId || '(empty)');
    this.setupSocket();
    this.fetchMessages({reset: true});
    this.markChatRead();
  };

  resolveChatIdFromList = async () => {
    if (this.chatId || !this.otherUserId) {
      return;
    }

    try {
      const response = await makeChatListRequest({search: '', page: 1, limit: 50});
      const list =
        response?.data?.data ||
        response?.data?.items ||
        response?.data?.docs ||
        response?.data?.list ||
        response?.data ||
        [];

      if (!Array.isArray(list)) {
        return;
      }
      console.log('[Chat][ResolveByList] list diagnostics', {
        total: list.length,
        firstItemKeys: list?.[0] ? Object.keys(list[0]) : [],
      });

      const matchedChat = list.find(chat => {
        const members = Array.isArray(chat?.members) ? chat.members : [];
        const candidateIds = [
          chat?.other,
          chat?.otherId,
          chat?.userId,
          chat?.clientId,
          chat?.participantId,
          chat?.receiverId,
          chat?.senderId,
          chat?.other?._id,
          chat?.other?.id,
          chat?.user?._id,
          chat?.user?.id,
          chat?.client?._id,
          chat?.client?.id,
          chat?.participant?._id,
          chat?.participant?.id,
          ...members.map(member => member?._id || member?.id || member),
        ]
          .filter(Boolean)
          .map(String);
        const otherAsString = String(this.otherUserId);
        if (candidateIds.includes(otherAsString)) {
          return true;
        }
        // Last-resort fallback when backend shape is unknown.
        return JSON.stringify(chat).includes(otherAsString);
      });

      const resolvedId =
        matchedChat?._id ||
        matchedChat?.id ||
        matchedChat?.chatId ||
        matchedChat?.conversationId ||
        matchedChat?.roomId ||
        matchedChat?.chat?._id ||
        matchedChat?.chat?.id ||
        matchedChat?.conversation?._id ||
        matchedChat?.conversation?.id ||
        '';
      this.chatId = String(resolvedId || '');
      console.log('[Chat][ResolveByList] matched chat', {
        otherUserId: this.otherUserId,
        resolvedChatId: this.chatId,
        matchedChatPreview: matchedChat
          ? {
              keys: Object.keys(matchedChat || {}),
              idCandidates: {
                _id: matchedChat?._id,
                id: matchedChat?.id,
                chatId: matchedChat?.chatId,
                conversationId: matchedChat?.conversationId,
                roomId: matchedChat?.roomId,
                nestedChatId: matchedChat?.chat?._id || matchedChat?.chat?.id,
                nestedConversationId:
                  matchedChat?.conversation?._id || matchedChat?.conversation?.id,
              },
            }
          : null,
      });
    } catch (e) {
      console.log(
        '[Chat][ResolveByList] failed',
        e?.response?.data || e?.message || e,
      );
    }
  };

  getMessagesFromResponse = response => {
    const candidates = [
      response?.data?.data,
      response?.data?.messages,
      response?.data?.items,
      response?.data?.docs,
      response?.data?.list,
      response?.data,
      response?.items,
      response?.results,
      response,
    ];
    return candidates.find(Array.isArray) || [];
  };

  mapApiMessageToGifted = msg => {
    const sender =
      msg?.sender || msg?.user || msg?.from || msg?.createdBy || msg?.agent || {};
    const senderId = sender?._id || sender?.id || msg?.senderId || msg?.userId;
    const createdAt = new Date(msg?.createdAt || msg?.created_at || msg?.sentAt || Date.now());
    return {
      _id: msg?._id || msg?.id || msg?.messageId || Math.random().toString(16).slice(2),
      text: msg?.content || msg?.text || '',
      createdAt,
      user: {
        _id: senderId || 'unknown',
        name: sender?.name || sender?.fullName || 'User',
      },
    };
  };

  fetchMessages = async ({reset = false} = {}) => {
    const {t} = this.props?.i18n;
    const {isLoadingMessages, hasMore, page, limit} = this.state;
    if (!this.chatId) return;
    if (!reset && (isLoadingMessages || !hasMore)) return;

    const nextPage = reset ? 1 : page + 1;
    this.setState({isLoadingMessages: true});
    try {
      const response = await makeChatMessagesRequest({
        chatId: this.chatId,
        page: nextPage,
        limit,
      });
      console.log('[Chat][Messages] request payload', {
        chatId: this.chatId,
        page: nextPage,
        limit,
      });
      console.log('[Chat][Messages] response', response);
      const list = this.getMessagesFromResponse(response);
      const mapped = list.map(this.mapApiMessageToGifted);
      // GiftedChat expects newest first
      mapped.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const pagination = response?.data?.pagination || response?.pagination;
      const totalPages = Number(pagination?.totalPages) || 0;
      const hasMoreFromPagination =
        totalPages > 0 ? nextPage < totalPages : list.length >= limit;

      this.setState(prev => ({
        messages: reset ? mapped : GiftedChat.append(prev.messages, mapped),
        page: nextPage,
        hasMore: hasMoreFromPagination,
      }));
    } catch (e) {
      console.log('[Chat][Messages] failed', e?.response?.data || e?.message || e);
      errorToast(
        t('CHAT_SCREEN.FAILED_TO_LOAD', {defaultValue: 'Failed to load messages'}),
        t,
      );
    } finally {
      this.setState({isLoadingMessages: false});
    }
  };

  markChatRead = async () => {
    try {
      if (!this.chatId) return;
      await makeChatMarkReadRequest({chatId: this.chatId});
      console.log('[Chat][Read] marked read', {
        chatId: this.chatId,
      });
    } catch (e) {
      console.log('[Chat][Read] failed', e?.response?.data || e?.message || e);
    }
  };

  getToken = () => {
    const userData = this.props?.userData || {};
    return userData?.token || userData?.data?.token || '';
  };

  setupSocket = () => {
    const token = this.getToken();
    if (!token || !this.chatId) {
      console.log('[Chat][Socket] skip setup', {
        hasToken: Boolean(token),
        chatId: this.chatId,
      });
      return;
    }
    console.log('[Chat][Socket] setup', {
      chatId: this.chatId,
      userId: this.userId,
      hasToken: Boolean(token),
    });
    if (!ChatSocketService.isConnected()) {
      ChatSocketService.connect(token);
    }

    ChatSocketService.on('connect', this.onSocketConnect);
    ChatSocketService.on('disconnect', this.onSocketDisconnect);
    ChatSocketService.on('error', this.onSocketError);
    ChatSocketService.on('auth:error', this.onSocketAuthError);

    ChatSocketService.on('chat:userOnline', this.onUserOnline);
    ChatSocketService.on('chat:userOffline', this.onUserOffline);
    ChatSocketService.on('chat:userTyping', this.onUserTyping);
    ChatSocketService.on('chat:messageDelivered', this.onMessageDelivered);
    ChatSocketService.on('chat:messageRead', this.onMessageRead);

    ChatSocketService.joinRoom({chatId: this.chatId, userId: this.userId});
    console.log('[Chat][Socket] joinRoom', {
      chatId: this.chatId,
      userId: this.userId,
    });
  };

  cleanupSocket = () => {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }

    if (this.chatId && this.userId) {
      ChatSocketService.leaveRoom({chatId: this.chatId, userId: this.userId});
    }

    ChatSocketService.off('connect', this.onSocketConnect);
    ChatSocketService.off('disconnect', this.onSocketDisconnect);
    ChatSocketService.off('error', this.onSocketError);
    ChatSocketService.off('auth:error', this.onSocketAuthError);

    ChatSocketService.off('chat:userOnline', this.onUserOnline);
    ChatSocketService.off('chat:userOffline', this.onUserOffline);
    ChatSocketService.off('chat:userTyping', this.onUserTyping);
    ChatSocketService.off('chat:messageDelivered', this.onMessageDelivered);
    ChatSocketService.off('chat:messageRead', this.onMessageRead);
  };

  onSocketConnect = () => {
    console.log('[Chat][Socket] connected');
  };
  onSocketDisconnect = reason => {
    console.log('[Chat][Socket] disconnected', reason);
  };
  onSocketError = error => {
    console.log('[Chat][Socket] error', error);
  };
  onSocketAuthError = error => {
    console.log('[Chat][Socket] auth:error', error);
  };

  onUserOnline = data => {
    console.log('[Chat][Socket] user online', data);
  };
  onUserOffline = data => {
    console.log('[Chat][Socket] user offline', data);
  };

  onUserTyping = data => {
    console.log('[Chat][Socket] user typing', data);
    if (data?.userId && data.userId === this.userId) {
      return;
    }
    this.setState({isOtherUserTyping: Boolean(data?.isTyping)});
  };

  onMessageDelivered = data => {
    console.log('[Chat][Socket] message delivered', data);
  };
  onMessageRead = data => {
    console.log('[Chat][Socket] message read', data);
  };

  emitTyping = isTyping => {
    if (!this.chatId) {
      return;
    }
    ChatSocketService.typing({chatId: this.chatId, userId: this.userId, isTyping});
  };

  handleInputTextChanged = text => {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    const hasText = (text || '').trim().length > 0;
    this.emitTyping(hasText);

    // Stop typing after 1.2s of inactivity
    this.typingTimeout = setTimeout(() => {
      this.emitTyping(false);
    }, 1200);
  };

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    this.emitTyping(false);
    this.sendMessageToApi(messages?.[0]);
  };

  sendMessageToApi = async giftedMessage => {
    const {t} = this.props?.i18n;
    if (!this.chatId || !giftedMessage) {
      errorToast('Chat is not ready yet', t);
      return;
    }
    try {
      const payload = {
        chatId: this.chatId,
        content: giftedMessage.text || '',
        attachments: giftedMessage.attachments || [],
      };
      console.log('[Chat][Send] payload', payload);
      const response = await makeChatSendMessageRequest(payload);
      console.log('[Chat][Send] response', response);
    } catch (e) {
      console.log('[Chat][Send] failed', e?.response?.data || e?.message || e);
      errorToast(
        t('CHAT_SCREEN.FAILED_TO_SEND', {defaultValue: 'Failed to send message'}),
        t,
      );
    }
  };

  // Attachments temporarily disabled

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
    return (
      <>
        <View style={styles.inputPill}>
          <Composer
            {...props}
            placeholderTextColor={COLORS.GREYSCALE_400}
            textInputProps={{
              ...existingTextInputProps,
              multiline: false,
              blurOnSubmit: false,
              placeholder: t('CHAT_SCREEN.TYPE_MESSAGE', {
                defaultValue: 'Type Message...',
              }),
              style: styles.composerTextInput,
            }}
          />
        </View>
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
          containerStyle={{height: 54, paddingBottom: 20}}
          title={contactName}
          subTitle={contactLocation}
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
          onInputTextChanged={this.handleInputTextChanged}
          isTyping={this.state.isOtherUserTyping}
          infiniteScroll
          loadEarlier={this.state.hasMore}
          onLoadEarlier={() => this.fetchMessages()}
        />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  userData: state?.auth?.userData,
});

export default connect(mapStateToProps)(
  withTranslation()(withSafeAreaInsets(ChatScreen)),
);
