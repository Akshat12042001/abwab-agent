import Config from 'react-native-config';
import {io} from 'socket.io-client';

let socket = null;
let currentToken = '';
let handlersRegistered = false;

const now = () => new Date().toISOString();
const log = (...args) => console.log(`[Socket][${now()}]`, ...args);

/**
 * Handshake auth: many backends expect the same shape as REST (`Authorization: Bearer …`)
 * or a raw JWT in `token`. We send both so either convention works.
 */
const buildHandshakeAuth = token => {
  const raw = String(token || '')
    .trim()
    .replace(/^bearer\s+/i, '')
    .trim();
  if (!raw) {
    return {};
  }
  const bearer = `Bearer ${raw}`;
  return {
    token: raw,
    accessToken: raw,
    access_token: raw,
    jwt: raw,
    authorization: bearer,
    Authorization: bearer,
    bearer,
  };
};

const getSocketUrl = () => {
  // Prefer explicit SOCKET_URL env; fallback to API_URL without trailing /api
  const raw = Config.SOCKET_URL || Config.API_URL || '';

  if (!raw) {
    return '';
  }
  // Remove common "/api" suffix if present
  return raw.replace(/\/api\/?$/i, '');
};

const connect = (token = '') => {
  const url = getSocketUrl();
  if (!url) {
    log('connect failed: missing SOCKET_URL/API_URL');
    throw new Error('Missing SOCKET_URL/API_URL for socket connection');
  }

  const nextToken = String(token || '')
    .trim()
    .replace(/^bearer\s+/i, '')
    .trim();

  // If already connected with same token, reuse
  if (socket && currentToken === nextToken && nextToken) {
    log('reuse existing connection', {connected: socket.connected});
    return socket;
  }

  // If token changed, reconnect
  if (socket) {
    log('disconnecting previous socket before reconnect');
    try {
      socket.disconnect();
    } catch (e) {}
    socket = null;
    handlersRegistered = false;
  }

  currentToken = nextToken;
  const handshakeAuth = buildHandshakeAuth(currentToken);
  log('connecting socket', {
    url,
    hasToken: Boolean(currentToken),
    tokenTail: currentToken ? currentToken.slice(-8) : '',
  });
  socket = io(url, {
    transports: ['websocket'],
    autoConnect: true,
    auth: handshakeAuth,
    // Many Socket.IO backends also read the JWT from the connection query string.
    query: currentToken
      ? {
          token: currentToken,
          access_token: currentToken,
        }
      : {},
  });
  registerBaseHandlers();

  return socket;
};

const disconnect = () => {
  if (!socket) {
    log('disconnect skipped: no socket');
    return;
  }
  log('disconnecting socket', {connected: socket.connected});
  try {
    socket.disconnect();
  } finally {
    socket = null;
    currentToken = '';
    handlersRegistered = false;
  }
};

const getSocket = () => socket;
const isConnected = () => Boolean(socket?.connected);

const registerBaseHandlers = () => {
  if (!socket || handlersRegistered) {
    return;
  }
  handlersRegistered = true;
  socket.on('connect', () => {
    log('connected', {socketId: socket?.id});
  });
  socket.on('disconnect', reason => {
    log('disconnected', {reason});
  });
  socket.on('connect_error', err => {
    log('connect_error', err?.message || err);
  });
  socket.on('error', err => {
    log('error event', err);
  });
  socket.on('auth:error', err => {
    log('auth:error event', err);
  });
};

// --- Emits (per backend doc) ---
const joinRoom = ({chatId, userId}) => {
  const tok = currentToken;
  const payload = {
    chatId,
    userId,
    ...(tok
      ? {token: tok, accessToken: tok, access_token: tok}
      : {}),
  };
  log('emit chat:joinRoom', {chatId, userId, hasToken: Boolean(tok)});
  socket?.emit('chat:joinRoom', payload);
};

const leaveRoom = ({chatId, userId}) => {
  log('emit chat:leaveRoom', {chatId, userId});
  socket?.emit('chat:leaveRoom', {chatId, userId});
};

const typing = ({chatId, userId, isTyping}) => {
  log('emit chat:typing', {chatId, userId, isTyping});
  socket?.emit('chat:typing', {chatId, userId, isTyping});
};

const messageDelivered = ({chatId, messageId, deliveredAt = new Date()}) => {
  log('emit chat:messageDelivered', {chatId, messageId, deliveredAt});
  socket?.emit('chat:messageDelivered', {chatId, messageId, deliveredAt});
};

const messageRead = ({chatId, messageId, readAt = new Date()}) => {
  log('emit chat:messageRead', {chatId, messageId, readAt});
  socket?.emit('chat:messageRead', {chatId, messageId, readAt});
};

// --- Listeners ---
const on = (event, handler) => {
  log('on listener', event);
  socket?.on(event, handler);
};

const off = (event, handler) => {
  log('off listener', event);
  socket?.off(event, handler);
};

export default {
  connect,
  disconnect,
  getSocket,
  isConnected,
  joinRoom,
  leaveRoom,
  typing,
  messageDelivered,
  messageRead,
  on,
  off,
};

