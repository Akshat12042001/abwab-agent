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
import {connect} from 'react-redux';
import {
  makeUpdateAgentProfileRequest,
} from '../../../api/auth';
import {errorToast, successToast} from '../../../utils/alerts';
import {setUserData} from '../../../redux/auth/auth.reducer';
import styles from './styles';

const getAgentFromRoute = route => {
  const a = route?.params?.agent;
  return a && typeof a === 'object' ? a : {};
};

const splitFullName = full => {
  const name = String(full || '').trim();
  if (!name) {
    return {firstName: '', lastName: ''};
  }
  const parts = name.split(/\s+/);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
};

const buildInitialValues = agent => {
  const {firstName, lastName} = splitFullName(
    agent?.name || agent?.fullName,
  );
  const fn =
    agent?.firstName ||
    agent?.first_name ||
    firstName;
  const ln =
    agent?.lastName ||
    agent?.last_name ||
    lastName;
  return {
    firstName: fn || '',
    lastName: ln || '',
    email: String(agent?.email || '').trim(),
    phoneNumber: String(
      agent?.phoneNo || agent?.phone || agent?.phoneNumber || '',
    ).trim(),
    bio: String(agent?.bio || '').trim(),
    address: String(agent?.address || '').trim(),
    specialization: String(agent?.specialization || '').trim(),
    experience: String(agent?.experience || '').trim(),
  };
};

const buildPutBody = (agent, values) => {
  const id = agent?._id || agent?.id || '';
  const name = `${values.firstName} ${values.lastName}`.trim();
  return {
    _id: String(id),
    name,
    email: values.email.trim(),
    phoneNo: values.phoneNumber.trim(),
    experience: values.experience?.trim() || '',
    address: values.address?.trim() || '',
    specialization: values.specialization?.trim() || '',
    bio: values.bio?.trim() || '',
    isActive: agent?.isActive !== undefined ? Boolean(agent.isActive) : true,
    inActiveReason: String(agent?.inActiveReason || agent?.inactiveReason || ''),
  };
};

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.form = FORM_SCHEMA.EDIT_PROFILE;
    this.state = {isLoading: false};
    const agent = getAgentFromRoute(props.route);
    this.initialValues = buildInitialValues(agent);
    this.agentRef = agent;
    this.inputRefs = this.form.fields.map(() => null);
  }

  onSubmit = async values => {
    const {navigation, setUserData: saveUser, userData, t, i18n} = this.props;
    const tr = t || i18n?.t;
    if (!this.agentRef?._id && !this.agentRef?.id) {
      errorToast(
        tr?.('EDIT_PROFILE_SCREEN.MISSING_AGENT', {
          defaultValue: 'Profile data missing. Open Account Settings again.',
        }),
        tr,
      );
      return;
    }
    this.setState({isLoading: true});
    try {
      const body = buildPutBody(this.agentRef, values);
      await makeUpdateAgentProfileRequest(body);
      const merged = {
        ...userData,
        ...body,
        name: body.name,
        phoneNo: body.phoneNo,
      };
      saveUser(merged);
      successToast(
        tr?.('EDIT_PROFILE_SCREEN.SAVED', {
          defaultValue: 'Profile updated',
        }),
        tr,
      );
      navigation.goBack();
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        tr?.('EDIT_PROFILE_SCREEN.SAVE_FAILED', {
          defaultValue: 'Could not save profile',
        });
      errorToast(msg, tr);
    } finally {
      this.setState({isLoading: false});
    }
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {t, i18n} = this.props;
    const tr = t || i18n?.t;

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingTop={insetTop + 20}>
        <CommonHeader title={tr('EDIT_PROFILE_SCREEN.TITLE')} />
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          enableResetScrollToCoords={false}
          enableAutomaticScroll={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Formik
              validateOnChange
              enableReinitialize
              onSubmit={this.onSubmit}
              initialValues={this.initialValues}
              validationSchema={this.form.schema}
              innerRef={formRef => {
                this.formRef = formRef;
              }}>
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <View style={styles.formTopSpacing}>
                    {this.form.fields.map((field, index) => {
                      const fieldKey = field?.type;
                      const parsedPlaceholder = tr(field?.placeholder) || '';
                      const label = tr(field?.label) || '';

                      return (
                        <Input
                          {...field}
                          ref={ref => {
                            this.inputRefs[index] = ref;
                          }}
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
                    title={tr('EDIT_PROFILE_SCREEN.SAVE_CHANGES')}
                    onPress={handleSubmit}
                    isLoading={this.state.isLoading}
                    containerStyle={styles.submitBtn}
                    isDisabled={this.state.isLoading}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  userData: state?.auth?.userData || {},
});

export default connect(mapStateToProps, {setUserData})(
  withTranslation()(withSafeAreaInsets(EditProfileScreen)),
);
