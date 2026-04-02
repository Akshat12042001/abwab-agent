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
  currentPassword: {
    label: 'LABELS.CURRENT_PASSWORD',
    placeholder: 'PLACEHOLDERS.ENTER_YOUR_CURRENT_PASSWORD',
    type: 'currentPassword',
    isPassword: true,
  },
  firstName: {
    label: 'LABELS.FIRST_NAME',
    placeholder: 'PLACEHOLDERS.FIRST_NAME',
    type: 'firstName',
  },
  lastName: {
    label: 'LABELS.LAST_NAME',
    placeholder: 'PLACEHOLDERS.LAST_NAME',
    type: 'lastName',
  },
  bioMulti: {
    label: 'LABELS.BIO',
    placeholder: 'PLACEHOLDERS.BIO',
    type: 'bio',
    multiline: true,
    numberOfLines: 4,
  },
  address: {
    label: 'LABELS.LOCATION',
    placeholder: 'PLACEHOLDERS.LOCATION',
    type: 'address',
  },
  specialization: {
    label: 'LABELS.SERVICE_AREA',
    placeholder: 'PLACEHOLDERS.SERVICE_AREA',
    type: 'specialization',
  },
  experience: {
    label: 'LABELS.EXPERIENCE',
    placeholder: 'PLACEHOLDERS.EXPERIENCE',
    type: 'experience',
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
  currentPassword: Yup.string().required('ERRORS.REQUIRED'),
};

export default {
  LOGIN: {
    fields: [fields.email, fields.password],
    schema: Yup.object().shape({
      email: schemas.email,
      password: schemas.stringRequired,
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
  CHANGE_PASSWORD: {
    fields: [
      fields.currentPassword,
      fields.newPassword,
      fields.confirmNewPassword,
    ],
    schema: Yup.object().shape({
      currentPassword: schemas.currentPassword,
      newPassword: schemas.newPassword,
      confirmNewPassword: schemas.confirmNewPassword,
    }),
  },
  EDIT_PROFILE: {
    fields: [
      fields.firstName,
      fields.lastName,
      fields.email,
      fields.phoneNumber,
      fields.bioMulti,
      fields.address,
      fields.specialization,
      fields.experience,
    ],
    schema: Yup.object().shape({
      firstName: schemas.stringRequired2,
      lastName: schemas.stringRequired2,
      email: schemas.email,
      phoneNumber: Yup.string().trim().min(5, 'ERRORS.REQUIRED').required('ERRORS.REQUIRED'),
      bio: Yup.string().trim().optional().nullable(),
      address: Yup.string().trim().optional().nullable(),
      specialization: Yup.string().trim().optional().nullable(),
      experience: Yup.string().trim().optional().nullable(),
    }),
  },
};
