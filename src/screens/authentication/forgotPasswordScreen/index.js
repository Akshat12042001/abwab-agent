import React from 'react';
import {Component} from 'react';
import {
  CustomButton,
  Input,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, FORM_SCHEMA} from '../../../constants';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTranslation} from 'react-i18next';
import {Formik} from 'formik';
import styles from './styles';
import {LeftArrowIcon} from '../../../components/svgs';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.form = FORM_SCHEMA.FORGOT_PASSWORD;
    this.state = {
      isLoading: false,
    };
    this.initialValues = {
      email: '',
    };
    this.formRef = null;
    this.inputRefs = this.form.fields.map(() => null);
  }

  onSubmit = () => {};

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer paddingTop={!!this.props?.insets?.top ? 30 : 0}>
        <View style={styles.screen}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            enableResetScrollToCoords={false}
            enableAutoAutomaticScroll={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton}>
                <LeftArrowIcon />
              </TouchableOpacity>
              <StyledText
                size={32}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.titleSpacing}>
                {t('FORGOT_PASSWORD_SCREEN.FORGOT_PASSWORD')}
              </StyledText>
              <Pressable style={styles.rowStart}>
                <StyledText
                  size={14}
                  variant="regular"
                  color={COLORS.GREYSCALE_700}>
                  {t(
                    'FORGOT_PASSWORD_SCREEN.ENTER_YOUR_EMAIL_ACCOUNT_TO_RESET_PASSWORD',
                  )}
                </StyledText>
              </Pressable>
            </View>
            <View style={styles.card}>
              <Formik
                validateOnChange
                enableReinitialize={false}
                onSubmit={this.onSubmit}
                initialValues={this.initialValues}
                validationSchema={this.form.schema}
                innerRef={formRef => (this.formRef = formRef)}>
                {({
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => {
                  return (
                    <View style={styles.formTopSpacing}>
                      {this.form.fields.map((field, index) => {
                        const fieldKey = field?.type;
                        const parsedPlaceholder = t(field?.label) || '';
                        const label = t(field?.label) || '';

                        return (
                          <Input
                            {...field}
                            ref={ref => (this.inputRefs[index] = ref)}
                            onSubmitEditing={() => {
                              if (index !== this.form?.fields?.length - 1) {
                                this.inputRefs[index + 1]?.focus();
                              }
                            }}
                            key={`field-${index}`}
                            label={label}
                            value={values[fieldKey]}
                            onBlur={handleBlur(fieldKey)}
                            placeholder={parsedPlaceholder}
                            onChangeText={handleChange(fieldKey)}
                            error={touched?.[fieldKey] && errors?.[fieldKey]}
                            returnKeyType="next"
                          />
                        );
                      })}

                      <CustomButton
                        title={t('BUTTONS.SEND_EMAIL')}
                        onPress={handleSubmit}
                        containerStyle={{marginTop: 25}}
                        isDisabled={values?.email?.length === 0}
                      />
                    </View>
                  );
                }}
              </Formik>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ScreenContainer>
    );
  }
}
export default withTranslation()(withSafeAreaInsets(ForgotPasswordScreen));
