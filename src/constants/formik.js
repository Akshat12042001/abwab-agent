import * as Yup from 'yup';

const fields = {
  email: {
    label: 'LABELS.EMAIL_ADDRESS',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_EMAIL',
    type: 'email',
  },
  password: {
    label: 'LABELS.PASSWORD',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_PASSWORD',
    type: 'password',
    isPassword: true,
  },
  fullName: {
    label: 'LABELS.FULL_NAME',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_NAME',
    type: 'fullName',
  },
  phoneNumber: {
    label: 'LABELS.PHONE_NUMBER',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_NUMBER',
    type: 'phoneNumber',
  },
  newPassword: {
    label: 'LABELS.NEW_PASSWORD',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_NEW_PASSWORD',
    type: 'newPassword',
    isPassword: true,
  },
  confirmNewPassword: {
    label: 'LABELS.CONFIRM_NEW_PASSWORD',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_CONFIRM_NEW_PASSWORD',
    type: 'confirmNewPassword',
    isPassword: true,
  },
};

const schemas = {
  stringRequired: Yup.string().required('ERRORS.REQUIRED'),
  stringRequired2: Yup.string()
    .trim()
    .min(2, 'ERRORS.MUST_BE_AT_LEAST_2_CHARACTERS')
    .required('ERRORS.REQUIRED'),
  stringOptional: Yup.string().trim().optional().nullable(),
  email: Yup.string()
    .required('ERRORS.EMAIL_IS_REQUIRED')
    .test('valid-email', 'Email is invalid', function (value) {
      if (!value) return false;
      if (value.length < 2) return true;
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }),
  emailOptional: Yup.string()
    .test('valid-email', 'ERRORS.EMAIL_IS_INVALID', function (value) {
      if (!value) return true;
      if (value.length < 2) return true;
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    })
    .optional(),
  phoneRequired: Yup.string().length(10).required('ERRORS.REQUIRED'),
  phoneOptional: Yup.string().length(10).optional().nullable(),
  pincode: Yup.string()
    .matches(/\b\d{5}\b/g, 'ERRORS.PINCODE_IS_NOT_VALID')
    .required('ERRORS.REQUIRED')
    .nullable(),
  numberInput: Yup.number().optional(),
  oldPassword: Yup.string().required('ERRORS.REQUIRED'),
  password: Yup.string()
    .min(8, 'ERRORS.MUST_BE_AT_LEAST_8_CHARACTERS')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      'ERRORS.PASSWORD_LONG',
    )
    .required('ERRORS.REQUIRED'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'ERRORS.PASSWORD_MUST_MATCH')
    .min(8, 'ERRORS.MUST_BE_AT_LEAST_8_CHARACTERS')
    .required('ERRORS.REQUIRED'),
  newPassword: Yup.string()
    .min(8, 'ERRORS.MUST_BE_AT_LEAST_8_CHARACTERS')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
      'ERRORS.PASSWORD_LONG',
    )
    .required('ERRORS.REQUIRED'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'ERRORS.PASSWORD_MUST_MATCH')
    .min(8, 'ERRORS.MUST_BE_AT_LEAST_8_CHARACTERS')
    .required('ERRORS.REQUIRED'),
};

export default {
  LOGIN: {
    fields: [fields.email, fields.password],
    schema: Yup.object().shape({
      email: schemas.email,
      password: schemas.password,
    }),
  },
  FORGOT_PASSWORD: {
    fields: [fields.email],
    schema: Yup.object().shape({
      email: schemas.email,
    }),
  },
  RESET_PASSWORD: {
    fields: [fields.newPassword, fields.confirmNewPassword],
    schema: Yup.object().shape({
      newPassword: schemas.newPassword,
      confirmNewPassword: schemas.confirmNewPassword,
    }),
  },
};
