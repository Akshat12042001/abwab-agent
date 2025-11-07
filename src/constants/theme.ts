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
