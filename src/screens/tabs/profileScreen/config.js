import {
  DocumentIcon,
  HelpIcon,
  LanguageIcon,
  LockIcon,
  NotificationIcon,
  ProfileIcon,
  StarIcon,
} from '../../../components/svgs';
import {COLORS} from '../../../constants';

export const PROFILE_MENU_CONFIG = [
  {
    id: 'account-details',
    sectionTitle: 'PROFILE_SCREEN.ACCOUNT_DETAILS',
    items: [
      {
        id: 'reviews',
        title: 'PROFILE_SCREEN.REVIEWS',
        subtitle: 'PROFILE_SCREEN.PROPERTY_VERIFICATION_REQUESTS',
        icon: <StarIcon />, // Placeholder - will be replaced with actual icon component
      },
    ],
  },
  {
    id: 'settings',
    sectionTitle: 'PROFILE_SCREEN.SETTINGS',
    items: [
      {
        id: 'account-settings',
        title: 'PROFILE_SCREEN.ACCOUNT_SETTINGS',
        subtitle: 'PROFILE_SCREEN.INFORMATION_ACCOUNT',
        icon: <ProfileIcon color={COLORS.PRIMARY} />, // Placeholder
      },
      {
        id: 'notification-sound',
        title: 'PROFILE_SCREEN.NOTIFICATION_SOUND',
        subtitle: 'PROFILE_SCREEN.MANAGE_ALERTS',
        icon: <NotificationIcon color={COLORS.PRIMARY} />, // Placeholder
      },
      {
        id: 'language',
        title: 'PROFILE_SCREEN.LANGUAGE',
        subtitle: 'PROFILE_SCREEN.ENGLISH_EN',
        icon: <LanguageIcon />, // Placeholder
      },
    ],
  },
  {
    id: 'help',
    sectionTitle: 'PROFILE_SCREEN.HELP',
    items: [
      {
        id: 'help-center',
        title: 'PROFILE_SCREEN.HELP_CENTER',
        subtitle: 'PROFILE_SCREEN.GET_SUPPORTS_FAQS',
        icon: <HelpIcon />, // Placeholder
      },
      {
        id: 'terms-conditions',
        title: 'PROFILE_SCREEN.TERMS_CONDITIONS',
        subtitle: 'PROFILE_SCREEN.READ_TERMS_CONDITIONS',
        icon: <DocumentIcon color={COLORS.PRIMARY} />, // Placeholder
      },
      {
        id: 'privacy-policy',
        title: 'PROFILE_SCREEN.PRIVACY_POLICY',
        subtitle: 'PROFILE_SCREEN.OUR_PRIVACY_POLICY',
        icon: <LockIcon />, // Placeholder
      },
    ],
  },
];

export const PROFILE_STATS = [
  {
    id: 'rating',
    value: '4.7',
    label: 'PROFILE_SCREEN.RATING',
  },
  {
    id: 'completed',
    value: '120',
    label: 'PROFILE_SCREEN.COMPLETED',
  },
  {
    id: 'viewings',
    value: '2.5 K',
    label: 'PROFILE_SCREEN.VIEWINGS',
  },
];
