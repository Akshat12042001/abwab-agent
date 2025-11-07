import React from 'react';
import {Component} from 'react';
import {
  Checkbox,
  CustomButton,
  Input,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, FORM_SCHEMA} from '../../../constants';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ASSETS} from '../../../constants/assets';
import {withTranslation} from 'react-i18next';
import {Formik} from 'formik';
import styles from './styles';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.form = FORM_SCHEMA.LOGIN;
    this.state = {
      isLoading: false,
    };
    this.initialValues = {
      email: '',
      password: '',
    };
    this.formRef = null;
    this.inputRefs = this.form.fields.map(() => null);
  }

  onSubmit = () => {};

  render() {
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer>
        <View style={styles.screen}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            enableResetScrollToCoords={false}
            enableAutoAutomaticScroll={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Image
                source={ASSETS.IMAGES.LOGO}
                style={styles.logo}
                resizeMode="contain"
              />
              <StyledText
                size={32}
                variant="bold"
                color={COLORS.GREYSCALE_900}
                textStyle={styles.titleSpacing}>
                {t('LOGIN_SCREEN.SIGN_IN_TO_YOUR_ACCOUNT')}
              </StyledText>
              <Pressable style={styles.rowStart}>
                <StyledText
                  size={14}
                  variant="regular"
                  color={COLORS.GREYSCALE_700}>
                  {t('LOGIN_SCREEN.DONT_HAVE_AN_ACCOUNT')}
                </StyledText>
                <StyledText
                  size={14}
                  variant="semiBold"
                  color={COLORS.PRIMARY}
                  textStyle={styles.registerGap}>
                  {t('LOGIN_SCREEN.REGISTER')}
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

                      <View style={styles.rememberRow}>
                        <TouchableOpacity style={styles.checkboxRow}>
                          <Checkbox
                            isChecked={this.state.isChecked}
                            onCheckboxPress={() =>
                              this.setState({isChecked: !this.state.isChecked})
                            }
                          />
                          <StyledText
                            color={COLORS.GREYSCALE_700}
                            variant="medium"
                            size={14}>
                            {t('LOGIN_SCREEN.REMEMBER_ME')}
                          </StyledText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <StyledText
                            size={14}
                            variant="medium"
                            color={COLORS.PRIMARY}>
                            {t('LOGIN_SCREEN.FORGOT_PASSWORD')}
                          </StyledText>
                        </TouchableOpacity>
                      </View>
                      <CustomButton
                        title={t('BUTTONS.SIGN_IN')}
                        onPress={handleSubmit}
                        isDisabled={
                          values?.email?.length === 0 ||
                          values?.password?.length === 0
                        }
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
export default withTranslation()(LoginScreen);
