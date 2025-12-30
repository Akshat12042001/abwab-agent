import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {StyledText, CustomButton} from '../../atoms';
import {ContractIcon, DocumentIconCopy, CheckIcon} from '../../svgs';
import {COLORS} from '../../../constants';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const SendContractModal = ({
  visible = false,
  onClose,
  onDone,
  contracts = [],
  selectedContracts = [],
  bottomOffset = 0,
}) => {
  const {t} = useTranslation();
  const [selectedItems, setSelectedItems] = useState(selectedContracts || []);

  // Sync selectedItems with selectedContracts prop when modal opens
  useEffect(() => {
    if (visible) {
      setSelectedItems(selectedContracts || []);
    }
  }, [visible, selectedContracts]);

  const handleContractPress = contractId => {
    setSelectedItems(prev => {
      if (prev.includes(contractId)) {
        return prev.filter(id => id !== contractId);
      } else {
        return [...prev, contractId];
      }
    });
  };

  const handleDone = () => {
    if (onDone && selectedItems.length > 0) {
      onDone(selectedItems);
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedItems(selectedContracts || []);
    onClose?.();
  };

  // Default contracts if none provided
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

  const contractsToDisplay =
    contracts.length > 0 ? contracts : defaultContracts;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating>
      <View style={[styles.modalContent, {marginBottom: bottomOffset + 70}]}>
        {/* Header */}
        <View style={styles.header}>
          <ContractIcon size={24} />
          <StyledText
            size={14}
            variant="bold"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.headerText}>
            {t('CHAT_SCREEN.SEND_CONTRACT')}
          </StyledText>
        </View>

        {/* Contracts Section */}
        <View style={styles.content}>
          <StyledText
            size={14}
            variant="medium"
            color={COLORS.GREYSCALE_900}
            textStyle={styles.sectionLabel}>
            {t('CHAT_SCREEN.CONTRACTS')}
          </StyledText>
          <View style={styles.gridContainer}>
            {contractsToDisplay.map(contract => {
              const isSelected = selectedItems.includes(contract.id);
              return (
                <TouchableOpacity
                  key={contract.id}
                  style={styles.contractItem}
                  onPress={() => handleContractPress(contract.id)}
                  activeOpacity={0.7}>
                  <View style={styles.iconContainer}>
                    <DocumentIconCopy size={44} />
                    {isSelected && (
                      <View style={styles.checkmarkOverlay}>
                        <View style={styles.checkmarkCircle}>
                          <CheckIcon size={16} color={COLORS.WHITE} />
                        </View>
                      </View>
                    )}
                  </View>
                  <StyledText
                    size={12}
                    variant="regular"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.contractLabel}
                    numberOfLines={2}
                    textAlign="center">
                    {contract.label}
                  </StyledText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Done Button */}
        <CustomButton
          title={t('SUCCESS_SCREEN.DONE')}
          onPress={handleDone}
          containerStyle={styles.doneButton}
          isDisabled={selectedItems.length === 0}
        />
      </View>
    </Modal>
  );
};

export default SendContractModal;
