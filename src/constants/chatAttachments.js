import Config from 'react-native-config';

const trim = v => (v != null && String(v).trim()) || '';

const defaultContractFileUrl = () => trim(Config.CHAT_DEFAULT_CONTRACT_FILE_URL);

/**
 * Resolves `fileUrl` for /chat/send-message attachments.
 * 1) `contract.fileUrl` / `file_url` from API-driven `contractCatalog`
 * 2) Per-type env: CHAT_CONTRACT_URL_NOC, CHAT_CONTRACT_URL_CCE, CHAT_CONTRACT_URL_AB
 * 3) Single fallback for all types: CHAT_DEFAULT_CONTRACT_FILE_URL (easiest for dev)
 *
 * `ncc` is treated like `noc` (common label typo).
 */
export const resolveContractAttachmentFileUrl = contract => {
  if (!contract) {
    return '';
  }
  const direct = trim(contract.fileUrl || contract.file_url);
  if (direct) {
    return direct;
  }
  const type = String(contract.type || '').toLowerCase();
  const nocUrl = trim(Config.CHAT_CONTRACT_URL_NOC);
  const byType = {
    noc: nocUrl,
    ncc: nocUrl,
    cce: trim(Config.CHAT_CONTRACT_URL_CCE),
    ab: trim(Config.CHAT_CONTRACT_URL_AB),
  };
  return byType[type] || defaultContractFileUrl() || '';
};

/** Optional template PDF for payment-request attachment. */
export const resolvePaymentRequestAttachmentFileUrl = payment => {
  const direct = trim(payment?.fileUrl || payment?.file_url);
  if (direct) {
    return direct;
  }
  return (
    trim(Config.CHAT_PAYMENT_REQUEST_URL) ||
    defaultContractFileUrl() ||
    ''
  );
};
