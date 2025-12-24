import React, {Fragment} from 'react';
import {
  CustomButton,
  DropdownComponent,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS, NAVIGATION, SCREEN} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import {ASSETS} from '../../../constants/assets';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyleSheet} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import RangeSlider from 'react-native-sticky-range-slider';
import {
  BedIcon,
  BathRoomIcon,
  CheckIcon,
  CompareIcon,
  HeartIcon,
  LeftArrowIcon,
  OwnershipIcon,
  ShareIcon,
  MaxIcon,
  ArrowRightIcon,
  IIcon,
  DocumentIcon,
  DownloadIcon,
  LocationIcon,
  ExpectedRoiIcon,
} from '../../../components/svgs';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {connect} from 'react-redux';

const DocumentRow = React.memo(({title, t}) => {
  return (
    <View style={styles.docRow}>
      <View style={styles.docLeftIcon}>
        <DocumentIcon />
      </View>
      <View style={styles.flex1}>
        <StyledText size={14} variant="semiBold" color={COLORS.GREYSCALE_900}>
          {title}
        </StyledText>
        <View style={styles.docVerifiedPill}>
          <StyledText size={12} variant="semiBold" color={COLORS.PRIMARY}>
            {t && t('FILTERS_SCREEN.VERIFIED')}
          </StyledText>
        </View>
      </View>
      <View style={styles.docRightIcon}>
        <DownloadIcon />
      </View>
    </View>
  );
});

const PlanTag = React.memo(({label}) => {
  return (
    <View style={styles.planTag}>
      <StyledText size={10} variant="semiBold" color={COLORS.GREYSCALE_700}>
        {label}
      </StyledText>
    </View>
  );
});

const PlanCard = React.memo(({title, price, per, pill, tags = [], onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.planCard}
      onPress={onPress}>
      <View style={styles.planHeaderRow}>
        <View style={styles.planHeaderLeft}>
          <StyledText size={16} variant="bold" color={COLORS.GREYSCALE_900}>
            {title}
          </StyledText>
        </View>
        {!!pill && (
          <View style={styles.planPill}>
            <StyledText size={12} variant="semiBold" color={COLORS.PRIMARY}>
              {pill}
            </StyledText>
          </View>
        )}
      </View>
      <View style={styles.planPriceRow}>
        <StyledText size={22} variant="bold" color={COLORS.PRIMARY}>
          {price}
        </StyledText>
        <StyledText
          size={12}
          variant="semiBold"
          color={COLORS.GREYSCALE_500}
          textStyle={styles.planPerText}>
          {per}
        </StyledText>
        <View style={styles.planArrowRight}>
          <ArrowRightIcon color={COLORS.GREYSCALE_500} />
        </View>
      </View>
      {tags?.length > 0 && (
        <View style={styles.planTagsRow}>
          {tags.map(txt => (
            <PlanTag key={txt} label={txt} />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
});

const TABS = [
  {
    id: 0,
    label: 'PROPERTY_DETAIL_SCREEN.OVERVIEW',
  },
  {
    id: 1,
    label: 'PROPERTY_DETAIL_SCREEN.PAYMENTS_INSTALLMENTS',
  },
  {
    id: 2,
    label: 'PROPERTY_DETAIL_SCREEN.OWNERSHIP_OPTIONS',
  },
  {
    id: 3,
    label: 'PROPERTY_DETAIL_SCREEN.CONSTRUCTION_UPDATES',
  },
  {
    id: 4,
    label: 'PROPERTY_DETAIL_SCREEN.DOCUMENTS',
  },
  {
    id: 5,
    label: 'PROPERTY_DETAIL_SCREEN.AREA_INSIGHTS',
  },
];

// Static constants removed; sections now render from API data

class PropertyDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.fromSearch = false; // props?.route?.params?.fromSearch || false;
    this.state = {
      currentIndex: 0,
      isSelected: false,
      selectedTab: 2,
      overviewExpanded: false,
      overviewCanExpand: false,
      downPayment: 25,
      timelineExpanded: false,
      galleryExpanded: false,
      docsOwnershipExpanded: false,
      aiSchoolsExpanded: false,
      aiClinicsExpanded: false,
      aiMallsExpanded: false,
      aiClubsExpanded: false,
      planDuration: '',
      item: null,
      isLoading: false,
      amenitiesExpanded: false,
      // Static data for payment plans
      paymentPlans: [
        {
          id: '1',
          title: '5-Year Plan',
          price: 'EGP 25,000',
          per: '/month',
          tags: ['0% Interest', 'Ready to Move', 'Exclusive Deal'],
        },
        {
          id: '2',
          title: '8-Year Plan',
          price: 'EGP 18,000',
          per: '/month',
          tags: ['Flexible Payments', 'Hot Deal'],
        },
        {
          id: '3',
          title: '10-Year Plan',
          price: 'EGP 14,000',
          per: '/month',
          tags: ['Fractional Option Available', 'Exclusive Deal'],
        },
      ],
      // Static data for area insights
      areaInsights: {
        schools: [
          {
            id: '1',
            name: 'New Cairo British International',
            distance: '1.4km',
            driveTime: '5 min drive',
            rating: 4.5,
          },
          {
            id: '2',
            name: 'Cairo International School',
            distance: '1.4km',
            driveTime: '5 min drive',
            rating: 4.5,
          },
        ],
        clinics: [
          {
            id: '1',
            name: 'Cairo Medical Center',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
          {
            id: '2',
            name: 'New Cairo Hospital',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
        ],
        malls: [
          {
            id: '1',
            name: 'City Stars Mall',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
          {
            id: '2',
            name: 'Festival City Mall',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
        ],
        clubs: [
          {
            id: '1',
            name: 'Palm Hills Clubhouse',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
          {
            id: '2',
            name: 'Cairo Sports Club',
            distance: '1.4km',
            driveTime: '5 min drive',
          },
        ],
      },
      // Static data for documents grouped
      documentGroups: [
        {
          title: 'Ownership & Title',
          documents: [
            'Ownership Contract',
            'Registration Certificate',
            'Mortgage Agreement',
          ],
        },
        {
          title: 'Developer & Project Verification',
          documents: [
            'Developer License / Approval',
            'Project Registration Certificate',
            'Construction Permit',
          ],
        },
        {
          title: 'Payment & Financing',
          documents: ['Payment Schedule', 'Installment Receipts'],
        },
        {
          title: 'Property Plans',
          documents: ['Floor Plan', 'Master Plan'],
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Compare functionality disabled for now
  }

  onComparePress = () => {
    // Compare functionality disabled for now
    this.setState(prevState => ({
      isSelected: !prevState.isSelected,
    }));
  };

  componentDidMount() {
    MapboxGL.setAccessToken(
      '__REDACTED_MAPBOX_PK__',
    );
    this.fetchData();
  }

  getCarouselItems = () => {
    // Return dummy images for carousel
    return [
      {id: '1', image: ASSETS.IMAGES.DUMMY_IMAGE},
      {id: '2', image: ASSETS.IMAGES.DUMMY_IMAGE},
      {id: '3', image: ASSETS.IMAGES.DUMMY_IMAGE},
      {id: '4', image: ASSETS.IMAGES.DUMMY_IMAGE},
      {id: '5', image: ASSETS.IMAGES.DUMMY_IMAGE},
    ];
  };

  onOverviewTextLayout = e => {
    try {
      const lines = e?.nativeEvent?.lines || [];
      const canExpand = Array.isArray(lines) ? lines.length > 2 : false;
      if (this.state.overviewCanExpand !== canExpand) {
        this.setState({overviewCanExpand: canExpand});
      }
    } catch (_e) {}
  };

  formatPrice = value => {
    if (typeof value === 'number') {
      return `EGP ${value.toLocaleString('en-EG')}`;
    }
    return value || '';
  };

  computeMonthlyPayment = (price, downPaymentPct, years) => {
    if (typeof price !== 'number') return null;
    const y = parseFloat(years);
    if (!y || !isFinite(y) || y <= 0) return null;
    const principal = price * (1 - (Number(downPaymentPct) || 0) / 100);
    const months = y * 12;
    if (months <= 0) return null;
    const perMonth = principal / months;
    return `EGP ${Math.round(perMonth).toLocaleString('en-EG')}`;
  };

  getCenterCoordinate = () => {
    const loc = this.state?.item?.location;
    if (Array.isArray(loc) && loc.length === 2) {
      return loc;
    }
    return [31.2357, 30.0444];
  };

  fetchData = async (showLoading = true) => {};

  onFavouritePress = async it => {};

  render() {
    const {t} = this.props?.i18n;
    const insetTop = this.props?.insets?.top || 0;
    const overlayMarginStyle = StyleSheet.create({
      mt: {marginTop: 14 + insetTop},
    }).mt;

    // Dummy data for overview tab
    const dummyData = {
      propertyTitle: 'Palm Hills Villa',
      subTitle: 'SODIC - New Cairo, Egypt',
      priceText: '9,500,000 EGP',
      isVerified: true,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, sem feugiat ut nullam nisl orci, volutpat, felis. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      ownershipType: 'Full Ownership',
      bedrooms: '3',
      bathrooms: '3',
      area: '3450',
      amenities: [
        {id: '1', name: 'Wifi'},
        {id: '2', name: 'Fitness'},
        {id: '3', name: 'Restaurant'},
        {id: '4', name: 'Minibar'},
      ],
      developer: {
        name: 'SODIC',
        logo: null,
      },
      location: [31.2357, 30.0444],
    };

    const it = this.state.item;
    const propertyTitle = dummyData.propertyTitle;
    const subTitle = dummyData.subTitle;
    const priceText = dummyData.priceText;
    const isVerified = dummyData.isVerified;
    const carouselItems = this.getCarouselItems();
    const centerCoordinate = dummyData.location;
    const carouselHeight = SCREEN.HEIGHT / 2.5 + (this.props?.insets?.top || 0);
    const carouselPlaceholderStyle = StyleSheet.create({
      ph: {
        height: carouselHeight,
        width: '100%',
        backgroundColor: COLORS.GREYSCALE_100,
      },
    }).ph;

    const amenities = dummyData.amenities;

    if (this.state.isLoading) {
      return (
        <View style={[SharedStyles.fullFlex, SharedStyles.center]}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      );
    }

    return (
      <ScreenContainer
        backgroundColor={COLORS.WHITE}
        paddingBottom={1}
        paddingTop={-0.5}>
        <ScrollView>
          <View>
            {carouselItems.length > 0 ? (
              <Carousel
                width={SCREEN.WIDTH}
                onSnapToItem={index => this.setState({currentIndex: index})}
                pagingEnabled
                height={carouselHeight}
                data={carouselItems}
                renderItem={({item}) => (
                  <ImageBackground
                    source={item.image}
                    style={styles.carouselImageBg}
                    resizeMode="cover"
                  />
                )}
              />
            ) : (
              <View style={carouselPlaceholderStyle} />
            )}
            <View style={[styles.overlayTopRow, overlayMarginStyle]}>
              <Pressable
                style={styles.headerCircleBtn}
                onPress={() => this.props.navigation.goBack()}>
                <LeftArrowIcon />
              </Pressable>
              <View style={styles.rightHeaderActions}>
                <Pressable style={styles.headerCircleBtn}>
                  <ShareIcon />
                </Pressable>
                <Pressable
                  onPress={() => this.onFavouritePress(it)}
                  style={[
                    styles.headerCircleBtn,
                    styles.headerCircleBtnSpacing,
                  ]}>
                  <HeartIcon
                    fill={it?.favourite ? COLORS.RED_FILL : 'none'}
                    stroke={it?.favourite ? COLORS.RED_FILL : ''}
                  />
                </Pressable>
              </View>
            </View>
            {carouselItems.length > 1 && (
              <View style={styles.dotsContainer}>
                <View style={styles.dotsRow}>
                  {carouselItems.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dotBase,
                        index === this.state.currentIndex
                          ? styles.dotActive
                          : styles.dotInactive,
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}
            {this.fromSearch && (
              <TouchableOpacity
                onPress={this.onComparePress}
                style={[
                  this.state.isSelected
                    ? styles.compareSelected
                    : styles.compareDefault,
                  styles.compareContainer,
                ]}>
                <CompareIcon
                  color={this.state.isSelected ? COLORS.PRIMARY_400 : 'black'}
                />
                <StyledText
                  size={12}
                  variant="medium"
                  color={
                    this.state.isSelected
                      ? COLORS.PRIMARY_400
                      : COLORS.GREYSCALE_900
                  }
                  textStyle={styles.compareText}>
                  {this.state.isSelected
                    ? t('LABELS.SELECTED')
                    : t('LABELS.COMPARE')}
                </StyledText>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contentSheet}>
            <View style={styles.titleRow}>
              <StyledText size={20} variant="bold" color={COLORS.GREYSCALE_900}>
                {propertyTitle}
              </StyledText>
              {isVerified && (
                <View style={styles.verifiedPillWrap}>
                  <View style={styles.verifiedIcon}>
                    <CheckIcon size="17" color={COLORS.WHITE} />
                  </View>
                  <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                    Verified
                  </StyledText>
                </View>
              )}
            </View>
            <StyledText
              size={14}
              variant="semiBold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.subLocationSpacing}>
              {subTitle}
            </StyledText>
            <StyledText size={18} variant="bold" color={COLORS.PRIMARY}>
              {priceText}
            </StyledText>

            <ScrollView
              horizontal
              contentContainerStyle={styles.tabsContainer}
              showsHorizontalScrollIndicator={false}>
              {TABS.map(item => {
                const isSelected = item.id === this.state.selectedTab;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.setState({selectedTab: item.id})}
                    style={[
                      styles.tabChip,
                      isSelected && styles.tabChipSelected,
                    ]}>
                    <StyledText
                      size={12}
                      variant="semiBold"
                      color={isSelected ? COLORS.WHITE : COLORS.GREYSCALE_900}>
                      {t(item.label)}
                    </StyledText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {this.state.selectedTab === 0 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}>
                  Overview
                </StyledText>
                <StyledText
                  size={14}
                  onTextLayout={this.onOverviewTextLayout}
                  variant="regular"
                  numberOfLines={this.state.overviewExpanded ? undefined : 2}
                  color={COLORS.GREYSCALE_700}
                  textStyle={styles.paragraphSpacing}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci,
                  sem feugiat ut nullam nisl orci, volutpat, felis. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </StyledText>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      overviewExpanded: !this.state.overviewExpanded,
                    })
                  }>
                  <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                    {this.state.overviewExpanded ? 'Read Less' : 'Read More'}
                  </StyledText>
                </TouchableOpacity>

                {/* Full ownership highlight */}
                <View style={styles.ownershipWrapper}>
                  <View style={styles.ownershipCard}>
                    <OwnershipIcon />
                    <StyledText
                      size={16}
                      variant="semiBold"
                      textStyle={styles.ownershipTitleSpacing}
                      color={COLORS.GREYSCALE_900}>
                      Full Ownership
                    </StyledText>
                  </View>
                  <StyledText size={14} color={COLORS.GREYSCALE_900}>
                    Available for Full Ownership
                  </StyledText>
                </View>

                {/* Feature metrics */}
                <View style={styles.featuresRow}>
                  <View style={styles.featureCard}>
                    <BedIcon />
                    <StyledText
                      size={12}
                      variant="bold"
                      color={COLORS.GREYSCALE_700}
                      textStyle={styles.featureLabel}>
                      3 Bedrooms
                    </StyledText>
                  </View>
                  <View style={styles.featureCard}>
                    <BathRoomIcon />
                    <StyledText
                      size={12}
                      variant="bold"
                      color={COLORS.GREYSCALE_700}
                      textStyle={styles.featureLabel}>
                      3 Bathrooms
                    </StyledText>
                  </View>
                  <View style={styles.featureCard}>
                    <MaxIcon />
                    <StyledText
                      size={12}
                      variant="bold"
                      color={COLORS.GREYSCALE_700}
                      textStyle={styles.featureLabel}>
                      3450 sqft
                    </StyledText>
                  </View>
                </View>

                {/* Amenities */}
                <View style={styles.sectionHeaderRow}>
                  <StyledText
                    size={18}
                    variant="bold"
                    color={COLORS.GREYSCALE_900}>
                    {t('PROPERTY_DETAIL_SCREEN.AMENITIES')}
                  </StyledText>
                  <TouchableOpacity activeOpacity={0.8}>
                    <StyledText
                      size={12}
                      variant="semiBold"
                      color={COLORS.PRIMARY}>
                      See all
                    </StyledText>
                  </TouchableOpacity>
                </View>
                <View style={styles.amenitiesGrid}>
                  {amenities.map((a, idx) => {
                    const initial =
                      (a?.name && a.name[0] && a.name[0].toUpperCase()) || '';
                    return (
                      <View key={a?.id || idx} style={styles.amenityCard}>
                        <View style={styles.amenityIcon}>
                          {!!initial && (
                            <StyledText
                              size={18}
                              variant="bold"
                              color={COLORS.GREYSCALE_700}>
                              {initial}
                            </StyledText>
                          )}
                        </View>
                        <StyledText
                          size={12}
                          variant="medium"
                          color={COLORS.GREYSCALE_700}
                          textStyle={styles.amenityText}>
                          {a?.name || ''}
                        </StyledText>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {this.state.selectedTab === 2 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  Ownership Options
                </StyledText>
                {/* Full Ownership Card */}
                <View style={styles.ownershipOptionsCard}>
                  <StyledText
                    size={16}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.ownershipOptionsTitle}>
                    Full Ownership
                  </StyledText>
                  <StyledText
                    size={22}
                    variant="bold"
                    color={COLORS.PRIMARY}
                    textStyle={styles.ownershipOptionsPrice}>
                    EGP 5,000,000
                  </StyledText>
                  <View style={styles.ownershipOptionsTagsRow}>
                    <View style={styles.ownershipOptionsTag}>
                      <StyledText
                        size={12}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_700}>
                        Verified Developer
                      </StyledText>
                    </View>
                    <View style={styles.ownershipOptionsTag}>
                      <StyledText
                        size={12}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_700}>
                        Hot Deal
                      </StyledText>
                    </View>
                  </View>
                  {/* ROI Box */}
                  <View style={styles.ownershipRoiBox}>
                    <ExpectedRoiIcon size={20} />
                    <StyledText
                      size={14}
                      color={COLORS.GREYSCALE_900}
                      textStyle={styles.ownershipRoiText}>
                      Estimated ROI
                    </StyledText>
                    <StyledText
                      size={14}
                      variant="bold"
                      color={COLORS.GREYSCALE_900}>
                      {' : 9% yearly'}
                    </StyledText>
                  </View>
                  <CustomButton
                    title={t(
                      'PROPERTY_DETAIL_SCREEN.VIEW_FULL_FINANCING_OPTIONS',
                    )}
                    onPress={() => {}}
                    containerStyle={styles.viewFullFinancingBtn}
                  />
                </View>
              </View>
            )}

            {this.state.selectedTab === 5 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  {t('PROPERTY_DETAIL_SCREEN.AREA_INSIGHTS')}
                </StyledText>

                {/* Schools */}
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.aiSectionTitle}>
                  Schools
                </StyledText>
                {this.state.areaInsights.schools.map((school, idx) => (
                  <View key={school.id || idx} style={styles.aiRow}>
                    <View style={styles.aiLeftIcon}>
                      <LocationIcon size={20} color={COLORS.PRIMARY} />
                    </View>
                    <View style={styles.flex1}>
                      <StyledText
                        size={14}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_900}>
                        {school.name}
                      </StyledText>
                      <View style={styles.aiChipRow}>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {school.distance}
                          </StyledText>
                        </View>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {school.driveTime}
                          </StyledText>
                        </View>
                      </View>
                      {school.rating && (
                        <View style={styles.aiRatingRow}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            ⭐ {school.rating}
                          </StyledText>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => this.setState({aiSchoolsExpanded: true})}
                  activeOpacity={0.8}>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.PRIMARY_300}
                    textStyle={styles.aiMoreLink}>
                    {t('PROPERTY_DETAIL_SCREEN.AND_N_MORE', {count: 3})}
                  </StyledText>
                </TouchableOpacity>

                {/* Clinics & Medical */}
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.aiSectionTitle}>
                  Clinics & Medical
                </StyledText>
                {this.state.areaInsights.clinics.map((clinic, idx) => (
                  <View key={clinic.id || idx} style={styles.aiRow}>
                    <View style={styles.aiLeftIcon}>
                      <LocationIcon size={20} color={COLORS.PRIMARY} />
                    </View>
                    <View style={styles.flex1}>
                      <StyledText
                        size={14}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_900}>
                        {clinic.name}
                      </StyledText>
                      <View style={styles.aiChipRow}>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {clinic.distance}
                          </StyledText>
                        </View>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {clinic.driveTime}
                          </StyledText>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => this.setState({aiClinicsExpanded: true})}
                  activeOpacity={0.8}>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.PRIMARY_300}
                    textStyle={styles.aiMoreLink}>
                    {t('PROPERTY_DETAIL_SCREEN.AND_N_MORE', {count: 3})}
                  </StyledText>
                </TouchableOpacity>

                {/* Malls & Shopping */}
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.aiSectionTitle}>
                  Malls & Shopping
                </StyledText>
                {this.state.areaInsights.malls.map((mall, idx) => (
                  <View key={mall.id || idx} style={styles.aiRow}>
                    <View style={styles.aiLeftIcon}>
                      <LocationIcon size={20} color={COLORS.PRIMARY} />
                    </View>
                    <View style={styles.flex1}>
                      <StyledText
                        size={14}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_900}>
                        {mall.name}
                      </StyledText>
                      <View style={styles.aiChipRow}>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {mall.distance}
                          </StyledText>
                        </View>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {mall.driveTime}
                          </StyledText>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => this.setState({aiMallsExpanded: true})}
                  activeOpacity={0.8}>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.PRIMARY_300}
                    textStyle={styles.aiMoreLink}>
                    {t('PROPERTY_DETAIL_SCREEN.AND_N_MORE', {count: 3})}
                  </StyledText>
                </TouchableOpacity>

                {/* Clubs & Lifestyle */}
                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.aiSectionTitle}>
                  Clubs & Lifestyle
                </StyledText>
                {this.state.areaInsights.clubs.map((club, idx) => (
                  <View key={club.id || idx} style={styles.aiRow}>
                    <View style={styles.aiLeftIcon}>
                      <LocationIcon size={20} color={COLORS.PRIMARY} />
                    </View>
                    <View style={styles.flex1}>
                      <StyledText
                        size={14}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_900}>
                        {club.name}
                      </StyledText>
                      <View style={styles.aiChipRow}>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {club.distance}
                          </StyledText>
                        </View>
                        <View style={styles.aiChip}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_700}>
                            {club.driveTime}
                          </StyledText>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => this.setState({aiClubsExpanded: true})}
                  activeOpacity={0.8}>
                  <StyledText
                    size={14}
                    variant="semiBold"
                    color={COLORS.PRIMARY_300}
                    textStyle={styles.aiMoreLink}>
                    {t('PROPERTY_DETAIL_SCREEN.AND_N_MORE', {count: 3})}
                  </StyledText>
                </TouchableOpacity>

                <CustomButton
                  title="Explore Nearby on Map"
                  onPress={() => {}}
                  containerStyle={styles.aiExploreBtnWrap}
                />
              </View>
            )}

            {this.state.selectedTab === 1 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  {t('PROPERTY_DETAIL_SCREEN.PAYMENTS_INSTALLMENTS')}
                </StyledText>
                {/* Multiple Payment Plans */}
                {this.state.paymentPlans &&
                  this.state.paymentPlans.length > 0 &&
                  this.state.paymentPlans.map(plan => (
                    <PlanCard
                      key={plan.id}
                      title={plan.title}
                      per={plan.per}
                      price={plan.price}
                      tags={plan.tags || []}
                      onPress={() =>
                        this.props.navigation.navigate(
                          NAVIGATION.COMMON.PLAN_DETAIL_SCREEN,
                        )
                      }
                    />
                  ))}

                <View style={styles.financeCard}>
                  <StyledText
                    size={16}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.financeTitle}>
                    {t('PROPERTY_DETAIL_SCREEN.FINANCING_CALCULATOR')}
                  </StyledText>
                  <View style={styles.financeRow}>
                    <StyledText
                      size={12}
                      variant="semiBold"
                      color={COLORS.GREYSCALE_700}>
                      {t('PROPERTY_DETAIL_SCREEN.DOWN_PAYMENT')}
                    </StyledText>
                    <StyledText
                      size={12}
                      variant="bold"
                      color={COLORS.PRIMARY_400}>
                      {this.state.downPayment}%
                    </StyledText>
                  </View>
                  <RangeSlider
                    min={0}
                    max={100}
                    step={1}
                    low={this.state.downPayment}
                    high={this.state.downPayment}
                    disableRange
                    floatingLabel={false}
                    renderThumb={() => <View style={styles.rsThumb} />}
                    renderRail={() => <View style={styles.rsRail} />}
                    renderRailSelected={() => (
                      <View style={styles.rsRailSelected} />
                    )}
                    renderLowValue={() => null}
                    renderHighValue={() => null}
                    renderNotch={() => <View style={styles.rsNotch} />}
                    onValueChanged={low => {
                      this.setState({downPayment: Math.round(low)});
                    }}
                  />

                  {/* <StyledText
                    size={14}
                    variant="medium"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.planDurationLabel}>
                    Plan Duration
                  </StyledText>
                  <View style={styles.dropdownInput}>
                    <StyledText
                      size={14}
                      variant="semiBold"
                      color={COLORS.GREYSCALE_900}>
                      5 years
                    </StyledText>
                    <ArrowRightIcon
                      color={COLORS.GREYSCALE_500}
                      style={styles.chevronDown}
                    />
                  </View> */}
                  <DropdownComponent
                    placeholder={t('PROPERTY_DETAIL_SCREEN.PLAN_DURATION')}
                    value={this.state.planDuration}
                    onChange={value => this.setState({planDuration: value})}
                    data={[
                      {label: '5 years', value: '5'},
                      {label: '8 years', value: '8'},
                      {label: '10 years', value: '10'},
                    ]}
                  />

                  {(() => {
                    // Use dummy price for calculation
                    const dummyPrice = 9500000; // 9,500,000 EGP
                    const monthly = this.computeMonthlyPayment(
                      dummyPrice,
                      this.state.downPayment,
                      this.state.planDuration,
                    );
                    if (!monthly) return null;
                    return (
                      <View style={styles.monthlySummary}>
                        <StyledText
                          size={14}
                          variant="semiBold"
                          color={COLORS.GREYSCALE_700}>
                          {t('PROPERTY_DETAIL_SCREEN.MONTHLY_PAYMENT')}
                        </StyledText>
                        <StyledText
                          size={16}
                          variant="bold"
                          color={COLORS.PRIMARY_300}>
                          {monthly}
                        </StyledText>
                      </View>
                    );
                  })()}
                </View>

                <View style={styles.noteCard}>
                  <View style={styles.noteIcon}>
                    <IIcon />
                  </View>
                  <StyledText
                    size={12}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_700}
                    textStyle={styles.noteText}>
                    Installments include registration fees and delivery
                    guarantee.
                  </StyledText>
                </View>
                <CustomButton
                  title={t(
                    'PROPERTY_DETAIL_SCREEN.VIEW_FULL_FINANCING_OPTIONS',
                  )}
                  onPress={() => {}}
                  containerStyle={styles.viewFullFinancingBtn}
                />
              </View>
            )}

            {this.state.selectedTab === 3 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  {t('PROPERTY_DETAIL_SCREEN.CONSTRUCTION_UPDATES')}
                </StyledText>

                <View style={styles.cuCard}>
                  <StyledText
                    size={16}
                    variant="semiBold"
                    color={COLORS.GREYSCALE_900}
                    textStyle={styles.cuCardTitle}>
                    {t('PROPERTY_DETAIL_SCREEN.CONSTRUCTION_PROGRESS')}
                  </StyledText>
                  <View style={styles.cuProgressRail}>
                    <View
                      style={[
                        styles.cuProgressFill,
                        {
                          width: `${Math.max(
                            0,
                            Math.min(
                              100,
                              this.state?.item?.constructionProgressHistory?.[0]
                                ?.progressPercentage ?? 0,
                            ),
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.cuPillsRow}>
                    {/* <View style={styles.cuPillPrimary}> */}
                    <StyledText
                      size={14}
                      variant="semiBold"
                      color={COLORS.PRIMARY}>
                      {t('PROPERTY_DETAIL_SCREEN.PERCENT_COMPLETED', {
                        percent:
                          this.state?.item?.constructionProgressHistory?.[0]
                            ?.progressPercentage ?? 0,
                      })}
                    </StyledText>
                    {/* </View> */}
                    <View style={styles.cuPillOutline}>
                      <StyledText
                        size={12}
                        variant="semiBold"
                        color={COLORS.PRIMARY}>
                        {t('PROPERTY_DETAIL_SCREEN.UNDER_CONSTRUCTION')}
                      </StyledText>
                    </View>
                  </View>
                </View>

                <StyledText
                  size={16}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.cuSectionLabel}>
                  {t('PROPERTY_DETAIL_SCREEN.CONSTRUCTION_TIMELINE')}
                </StyledText>
                {(() => {
                  const hist = Array.isArray(it?.constructionProgressHistory)
                    ? it.constructionProgressHistory
                    : [];
                  const toShow = this.state.timelineExpanded
                    ? hist
                    : hist.slice(0, 3);
                  return toShow.map((h, idx) => {
                    const hasImg =
                      typeof h?.media?.[0] === 'string' &&
                      h.media[0].length > 0;
                    return (
                      <View key={h?._id || idx} style={styles.cuTimelineCard}>
                        {hasImg && (
                          <Image
                            source={{uri: h.media[0]}}
                            style={styles.cuTimelineThumb}
                          />
                        )}
                        <View style={styles.flex1}>
                          <View style={styles.cuTimelineHeader}>
                            <StyledText
                              size={12}
                              variant="semiBold"
                              color={COLORS.PRIMARY}>
                              {`Progress: ${h?.progressPercentage ?? 0}%`}
                            </StyledText>
                            <View style={styles.cuOnTrackPill}>
                              <StyledText
                                size={12}
                                variant="semiBold"
                                color={COLORS.PRIMARY}>
                                {t('PROPERTY_DETAIL_SCREEN.ON_TRACK')}
                              </StyledText>
                            </View>
                          </View>
                          {!!h?.media?.length && (
                            <StyledText
                              size={12}
                              variant="medium"
                              color={COLORS.GREYSCALE_700}>
                              {`${h.media.length} photo(s)`}
                            </StyledText>
                          )}
                        </View>
                      </View>
                    );
                  });
                })()}
                {!this.state.timelineExpanded && (
                  <TouchableOpacity
                    onPress={() => this.setState({timelineExpanded: true})}
                    activeOpacity={0.8}>
                    <StyledText
                      size={14}
                      variant="semiBold"
                      color={COLORS.PRIMARY_300}
                      textStyle={styles.cuMoreLink}>
                      {t('PROPERTY_DETAIL_SCREEN.AND_N_MORE', {count: 3})}
                    </StyledText>
                  </TouchableOpacity>
                )}

                {(() => {
                  const histImgs = (
                    Array.isArray(it?.constructionProgressHistory)
                      ? it.constructionProgressHistory
                      : []
                  )
                    .flatMap(h => (Array.isArray(h?.media) ? h.media : []))
                    .filter(u => typeof u === 'string' && u.length > 0)
                    .map((u, i) => ({id: `h-${i}`, image: {uri: u}}));
                  const gallery = histImgs;
                  if (gallery.length === 0) {
                    return null;
                  }
                  return (
                    <>
                      <StyledText
                        size={14}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_900}
                        textStyle={styles.cuSectionLabel}>
                        {t('PROPERTY_DETAIL_SCREEN.CONSTRUCTION_GALLERY')}
                      </StyledText>
                      {!this.state.galleryExpanded ? (
                        <View style={styles.cuGalleryLargeRow}>
                          {gallery.slice(0, 2).map(item => (
                            <Image
                              key={item.id}
                              source={item.image}
                              style={styles.cuGalleryLargeImage}
                              resizeMode="cover"
                            />
                          ))}
                          <Pressable
                            onPress={() =>
                              this.setState({galleryExpanded: true})
                            }
                            style={styles.cuGalleryThirdWrap}>
                            <Image
                              source={(gallery[2] || gallery[0]).image}
                              style={styles.cuGalleryLargeImage}
                              resizeMode="cover"
                            />
                            <View style={styles.cuGalleryOverlay}>
                              <StyledText
                                size={28}
                                variant="bold"
                                color={COLORS.WHITE}>
                                {`${Math.max(0, gallery.length - 2)}+`}
                              </StyledText>
                            </View>
                          </Pressable>
                        </View>
                      ) : (
                        <View style={styles.cuGalleryGrid}>
                          {gallery.map(item => (
                            <Image
                              key={item.id}
                              source={item.image}
                              style={styles.cuGalleryGridImage}
                              resizeMode="cover"
                            />
                          ))}
                        </View>
                      )}
                    </>
                  );
                })()}
              </View>
            )}

            {this.state.selectedTab === 4 && (
              <View>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  {t('PROPERTY_DETAIL_SCREEN.DOCUMENTS')}
                </StyledText>

                {this.state.documentGroups.map((group, groupIdx) => (
                  <View key={groupIdx} style={styles.docGroupContainer}>
                    <StyledText
                      size={16}
                      variant="bold"
                      color={COLORS.GREYSCALE_900}
                      textStyle={styles.docSectionTitle}>
                      {group.title}
                    </StyledText>
                    {group.documents.map((docName, docIdx) => (
                      <DocumentRow
                        key={`${groupIdx}-${docIdx}`}
                        title={docName}
                        t={t}
                      />
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Developer details */}
            {this.state.selectedTab === 0 && (
              <Fragment>
                <StyledText
                  size={18}
                  variant="semiBold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionSpacing}>
                  Developer Details
                </StyledText>
                <TouchableOpacity
                  style={styles.developerCard}
                  onPress={() => {}}>
                  <View style={styles.developerLogo} />
                  <View style={styles.flex1}>
                    <StyledText
                      size={16}
                      variant="bold"
                      color={COLORS.GREYSCALE_900}>
                      SODIC
                    </StyledText>
                    <StyledText
                      size={14}
                      variant="regular"
                      color={COLORS.GREYSCALE_700}>
                      Developer
                    </StyledText>
                  </View>
                  <ArrowRightIcon color={COLORS.GREYSCALE_500} />
                </TouchableOpacity>

                {/* Location on Maps */}
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.mapTitleSpacing}>
                  Location on Maps
                </StyledText>
                <View style={styles.mapWrap}>
                  <MapboxGL.MapView style={styles.mapSmall}>
                    <MapboxGL.Camera
                      zoomLevel={12}
                      centerCoordinate={centerCoordinate}
                      animationDuration={0}
                    />
                    <MapboxGL.PointAnnotation
                      id="property-location"
                      coordinate={centerCoordinate}
                    />
                  </MapboxGL.MapView>
                </View>
              </Fragment>
            )}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({});

export default withTranslation()(
  connect(mapStateToProps, {})(withSafeAreaInsets(PropertyDetailScreen)),
);
