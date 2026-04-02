import {APIClient} from './client';

const CHAT_ENDPOINTS = {
  LIST: '/chat/list',
  START_CHAT: '/chat/start-read',
  MESSAGES: '/chat/messages',
  MARK_READ: '/chat/mark-read',
  SEND_MESSAGE: '/chat/send-message',
  UPLOAD_ATTACHMENTS: '/chat/upload-attachments',
};

export const makeChatListRequest = ({search = '', page = 1, limit = 10} = {}) => {
  const payload = {page, limit};
  const trimmedSearch = (search || '').trim();
  if (trimmedSearch.length > 0) {
    payload.search = trimmedSearch;
  }

  return APIClient()
    .post(CHAT_ENDPOINTS.LIST, payload)
    .then(res => res.data);
};

export const makeChatMessagesRequest = ({
  chatId,
  other,
  page = 1,
  limit = 20,
} = {}) => {
  const payload = {
    page,
    limit,
  };
  if (chatId) {
    payload.chatId = chatId;
  }
  if (other) {
    payload.other = other;
  }

  return APIClient()
    .post(CHAT_ENDPOINTS.MESSAGES, payload)
    .then(res => res.data);
};

export const makeChatStartRequest = ({other} = {}) => {
  return APIClient()
    .post(CHAT_ENDPOINTS.START_CHAT, {other})
    .then(res => res.data);
};

export const makeChatMarkReadRequest = ({chatId, other} = {}) => {
  const payload = {};
  if (chatId) {
    payload.chatId = chatId;
  }
  if (other) {
    payload.other = other;
  }

  return APIClient()
    .post(CHAT_ENDPOINTS.MARK_READ, payload)
    .then(res => res.data);
};

export const makeChatSendMessageRequest = ({
  chatId,
  other,
  content,
  attachments = [],
} = {}) => {
  const payload = {
    content,
  };
  if (chatId) {
    payload.chatId = chatId;
  }
  if (other) {
    payload.other = other;
  }
  if (attachments?.length) {
    payload.attachments = attachments;
  }

  return APIClient()
    .post(CHAT_ENDPOINTS.SEND_MESSAGE, payload)
    .then(res => res.data);
};

export const makeChatUploadAttachmentsRequest = (files = []) => {
  const formData = new FormData();
  files.forEach((file, index) => {
    // file: { uri, name, type }
    formData.append('files', {
      uri: file.uri,
      name: file.name || `file_${index}`,
      type: file.type || 'application/octet-stream',
    });
  });

  return APIClient()
    .post(CHAT_ENDPOINTS.UPLOAD_ATTACHMENTS, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => res.data);
};

