import React from 'react';
import {
  ScreenContainer,
  CommonHeader,
  Input,
  CustomButton,
} from '../../../components/atoms';
import {COLORS, FORM_SCHEMA} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';
import {Formik} from 'formik';
import {makeChangePasswordRequest} from '../../../api/auth';
import {errorToast, successToast} from '../../../utils/alerts';
import styles from './styles';

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.form = FORM_SCHEMA.CHANGE_PASSWORD;
    this.state = {
      isLoading: false,
    };
    this.initialValues = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
    this.formRef = null;
    this.inputRefs = this.form.fields.map(() => null);
  }

  onSubmit = async values => {
    const {t, i18n, navigation} = this.props;
    const tr = t || i18n?.t;
    this.setState({isLoading: true});
    try {
      await makeChangePasswordRequest({
        password: values.newPassword,
      });
      successToast(
        tr?.('CHANGE_PASSWORD_SCREEN.SUCCESS', {
          defaultValue: 'Password updated',
        }),
        tr,
      );
      navigation.goBack();
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        tr?.('CHANGE_PASSWORD_SCREEN.FAILED', {
          defaultValue: 'Could not update password',
        });
      errorToast(msg, tr);
    } finally {
      this.setState({isLoading: false});
    }
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader title={t('CHANGE_PASSWORD_SCREEN.TITLE')} />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          enableResetScrollToCoords={false}
          enableAutoAutomaticScroll={false}
          showsVerticalScrollIndicator={false}>
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
                  <View>
                    <View style={styles.formTopSpacing}>
                      {this.form.fields.map((field, index) => {
                        const fieldKey = field?.type;
                        const parsedPlaceholder = t(field?.placeholder) || '';
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
                    </View>
                    <CustomButton
                      title={t('BUTTONS.UPDATE_PASSWORD')}
                      onPress={handleSubmit}
                      isLoading={this.state.isLoading}
                      containerStyle={{marginTop: 25}}
                      isDisabled={
                        values?.currentPassword?.length === 0 ||
                        values?.newPassword?.length === 0 ||
                        values?.confirmNewPassword?.length === 0
                      }
                    />
                  </View>
                );
              }}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(ChangePasswordScreen));
