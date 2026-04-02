import {Dimensions} from 'react-native';

export enum FONTS {
  regular = 'Manrope-Regular',
  medium = 'Manrope-Medium',
  bold = 'Manrope-Bold',
  semiBold = 'Manrope-SemiBold',
  light = 'Manrope-Light',
  extraLight = 'Manrope-ExtraLight',
  serif = 'PTSerif-Bold',
}

const {height, width} = Dimensions.get('window');

export const COLORS = {
  PRIMARY: '#1D4832',
  GREYSCALE_50: '#F9F9F9',
  WHITE: '#FFFFFF',
  GREYSCALE_900: '#0F172A',
  GREYSCALE_700: '#334155',
  PRIMARY_50: '#BBDFC6',
  LIGHT_GREY_BG: '#F7F8FA',
  GREYSCALE_200: '#E2E8F0',
  GREYSCALE_100: '#DFE1E7',
  GREYSCALE_500: '#697586',
  PRIMARY_LIGHT: '#F4F7F5CC',
  PRIMARY_LIGHTEST: '#BBDFC61A',
  RED_ERROR: '#E50000',
  BUTTON_DISABLE: '#BBDFC6CC',
  TEXT_PRIMARY: '#18181B',
  GREY_SECONDARY: '#71717A',
  GREY_QUATERNARY: '#D4D4D8',
  PRIMARY_20: '#BBDFC633',
  RED_NOTIFICATION: '#EF4444',
  WHITE_80: 'rgba(255, 255, 255, 0.8)',
  SECONDARY_BASE: 'rgba(251, 216, 115, 1)',
  GREYSCALE_300: 'rgba(203, 213, 225, 1)',
  GREYSCALE_400: 'rgba(148, 163, 184, 1)',
  GREEN_500: 'rgba(174, 223, 49, 1)',
  ORANGE: 'rgba(250, 164, 63, 1)',
  YELLOW: '#FACC15',
  YELLOW_50: '#FEF3C7',
  RED_FILL: '#EF4444',
  PRIMARY_30: '#BBDFC64D',
  PRIMARY_300: '#4A9B6A',
  PRIMARY_400: '#6BB88A',
};

export const FONT_SIZE = {
  SM: 12,
  MD: 16,
  LG: 20,
};

export const SCREEN_PADDING = 20;

export const SCREEN = {
  HEIGHT: height,
  WIDTH: width,
};
