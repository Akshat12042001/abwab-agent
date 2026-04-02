import React from 'react';
import {ScreenContainer, StyledText} from '../../../components/atoms';
import {COLORS, SCREEN} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
// import Carousel from 'react-native-reanimated-carousel';
import {
  ActivityIndicator,
  Image,
  // ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
// import {ASSETS} from '../../../constants/assets';
import {
  CheckIcon,
  ClockIcon,
  HeartIcon,
  LeftArrowIcon,
  ShareIcon,
  LocationIcon,
  AppartmentIcon,
  BedIcon,
  BuildingIcon,
  LeafIcon,
  MixedUseIcon,
} from '../../../components/svgs';
import {ASSETS} from '../../../constants/assets';
import {SharedStyles} from '../../../shared';
import renderStars from '../../../utils/renderStars';

// const ITEMS = [...]

// PROJECTS removed; using API data instead

const TABS = [
  {
    id: 0,
    label: 'DEVELOPER_SCREEN.ABOUT',
  },
  {
    id: 1,
    label: 'DEVELOPER_SCREEN.PROJECTS',
  },
  {
    id: 2,
    label: 'DEVELOPER_SCREEN.REVIEWS',
  },
];

class DeveloperDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    // Static dummy data
    this.dummyData = {
      developer: {
        name: 'Palm Hills Dev',
        logo: ASSETS.IMAGES.DUMMY_IMAGE,
        description:
          'Palm Hills Developments is a leading real estate company in Egypt, specializing in luxury residential communities. With over 15 years of experience, we have delivered 25+ projects across Cairo and the New Administrative Capital. Our commitment to quality, innovation, and customer satisfaction has made us a trusted name in the Egyptian real estate market.',
        totalExp: 15,
        totalProjects: 25,
        address: 'Cairo, Egypt',
        rating: 4.5,
        favourite: false,
        highlights: [
          {id: '1', name: 'Luxury Villas', icon: 'bed'},
          {id: '2', name: 'Master Communities', icon: 'building'},
          {id: '3', name: 'Green Living', icon: 'leaf'},
          {id: '4', name: 'Mixed-use Developments', icon: 'mixed'},
        ],
      },
      projects: [
        {
          id: '1',
          title: 'Palm Hills New Cairo',
          subtitle: 'New Cairo',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
        {
          id: '2',
          title: 'Palm Hills October',
          subtitle: '6th October, Egypt',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
        {
          id: '3',
          title: 'Palm Hills New Cairo',
          subtitle: 'New Cairo',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
        {
          id: '4',
          title: 'Palm Hills October',
          subtitle: '6th October, Egypt',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
        {
          id: '5',
          title: 'Palm Hills New Cairo',
          subtitle: 'New Cairo',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
        {
          id: '6',
          title: 'Palm Hills October',
          subtitle: '6th October, Egypt',
          price: 'EGP 5,000,000',
          roi: 'ROI 9%',
          image: ASSETS.IMAGES.DUMMY_IMAGE,
        },
      ],
      reviews: [
        {
          id: '1',
          name: 'Emily Johnson',
          date: '24 Aug 2025',
          rating: 5,
          text: 'Palm Hills has exceeded my expectations in every way. The quality of construction is outstanding, and their customer service',
        },
        {
          id: '2',
          name: 'Terry Press',
          date: '20 Feb 2025',
          rating: 5,
          text: 'Palm Hills has exceeded my expectations in every way. The quality of construction is outstanding, and their customer service',
        },
        {
          id: '3',
          name: 'Michael Chen',
          date: '15 Aug 2025',
          rating: 4,
          text: 'Palm Hills has exceeded my expectations in every way. The quality of construction is outstanding, and their customer service',
        },
      ],
      ratingBreakdown: [
        {label: 'Content Quality', pct: 90},
        {label: 'Instructure Expertise', pct: 85},
        {label: 'Student Support', pct: 88},
        {label: 'Learning Resource', pct: 82},
      ],
    };
    this.state = {
      currentIndex: 0,
      selectedTab: 0,
      overviewExpanded: false,
      reviewFilterIdx: 0,
      developer: this.dummyData.developer,
      isLoading: false,
      projects: this.dummyData.projects,
    };
  }

  componentDidMount() {
    // Using static dummy data, no API calls needed
  }

  markDeveloperFavourite = async () => {};

  handleTabPress = tab => {
    this.setState({selectedTab: tab.id});
  };

  render() {
    const {t} = this.props?.i18n;
    const insetTop = this.props?.insets?.top || 0;
    const overlayMarginStyle = StyleSheet.create({
      mt: {marginTop: 14 + insetTop},
    }).mt;

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
            {/* <Carousel
              width={SCREEN.WIDTH}
              onSnapToItem={index => this.setState({currentIndex: index})}
              pagingEnabled
              height={SCREEN.HEIGHT / 2.5 + (this.props?.insets?.top || 0)}
              data={[{image: this.state.developer?.logo}]}
              renderItem={({item}) => (
                <ImageBackground
                  source={item.image}
                  style={styles.carouselImageBg}
                  resizeMode="cover"
                />
              )}
            /> */}
            <Image
              source={this.state.developer?.logo || ASSETS.IMAGES.DUMMY_IMAGE}
              style={{
                height: SCREEN.HEIGHT / 2.5 + (this.props?.insets?.top || 0),
                width: SCREEN.WIDTH,
              }}
              resizeMode="cover"
            />

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
                  onPress={() => this.markDeveloperFavourite()}
                  style={[
                    styles.headerCircleBtn,
                    styles.headerCircleBtnSpacing,
                  ]}>
                  <HeartIcon
                    fill={
                      this.state.developer?.favourite ? COLORS.RED_FILL : 'none'
                    }
                    stroke={
                      this.state.developer?.favourite ? COLORS.RED_FILL : ''
                    }
                  />
                </Pressable>
              </View>
            </View>
            {/* <View style={styles.dotsContainer}>
              <View style={styles.dotsRow}>
                {ITEMS.map((item, index) => (
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
            </View> */}
          </View>
          <View style={styles.contentSheet}>
            <View style={styles.devLogoContainer}>
              <Image
                source={this.state.developer?.logo || ASSETS.IMAGES.DUMMY_IMAGE}
                resizeMode="cover"
                style={styles.devLogoImage}
              />
            </View>

            <View style={styles.devNameRow}>
              <StyledText size={20} variant="bold" color={COLORS.GREYSCALE_900}>
                {this.state.developer?.name || ''}
              </StyledText>
              <View style={styles.verifiedPillWrap}>
                <View style={styles.verifiedIcon}>
                  <CheckIcon size="17" color={COLORS.WHITE} />
                </View>
                <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                  {t('DEVELOPER_SCREEN.VERIFIED_DEVELOPER')}
                </StyledText>
              </View>
            </View>
            <View style={styles.aiRatingRow}>
              {renderStars(this.state.developer?.rating || 4.5)}
              <StyledText
                size={12}
                variant="semiBold"
                color={COLORS.GREYSCALE_700}
                textStyle={styles.aiRatingText}>
                {this.state.developer?.rating || 4.5}
              </StyledText>
            </View>
            <View style={styles.factsRow}>
              {(() => {
                const dev = this.state.developer || {};
                const facts = [];
                if (dev?.totalExp) {
                  facts.push({
                    key: 'years',
                    icon: <ClockIcon />,
                    text: `${dev?.totalExp}${
                      dev?.totalExp >= 1 ? '+' : ''
                    } Years Experience`,
                  });
                }
                if (dev?.totalProjects != null) {
                  facts.push({
                    key: 'projects',
                    icon: <AppartmentIcon color={COLORS.GREYSCALE_900} />,
                    text: `${dev.totalProjects} Projects Delivered`,
                  });
                }
                if (dev?.address) {
                  facts.push({
                    key: 'address',
                    icon: (
                      <LocationIcon color={COLORS.GREYSCALE_900} size="17" />
                    ),
                    text: dev.address,
                  });
                }
                return facts.map(f => (
                  <View key={f.key} style={styles.factChip}>
                    {f.icon}
                    <StyledText
                      size={14}
                      color={COLORS.GREYSCALE_900}
                      textStyle={styles.factChipText}>
                      {f.text}
                    </StyledText>
                  </View>
                ));
              })()}
            </View>

            <View style={styles.tabsPillBar}>
              {TABS.map(item => {
                const isSelected = item.id === this.state.selectedTab;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.handleTabPress(item)}
                    style={[
                      styles.tabPill,
                      {
                        backgroundColor: isSelected
                          ? COLORS.PRIMARY
                          : COLORS.GREYSCALE_50,
                      },
                    ]}>
                    <StyledText
                      size={12}
                      variant="semiBold"
                      color={isSelected ? COLORS.WHITE : COLORS.PRIMARY}>
                      {t(item.label)}
                    </StyledText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {this.state.selectedTab === 1 && (
              <View style={styles.projectsWrap}>
                {this.state.projects.map(p => (
                  <TouchableOpacity
                    key={p.id}
                    activeOpacity={0.9}
                    style={styles.projectCard}
                    onPress={() => {}}>
                    <View style={styles.projectImageWrap}>
                      <Image
                        source={p?.image || ASSETS.IMAGES.DUMMY_IMAGE}
                        style={styles.projectImage}
                        resizeMode="cover"
                      />

                      {!!p.roi && (
                        <View style={styles.roiBadge}>
                          <StyledText
                            size={12}
                            variant="semiBold"
                            color={COLORS.GREYSCALE_900}>
                            {p.roi}
                          </StyledText>
                        </View>
                      )}
                    </View>
                    <View style={styles.projectBody}>
                      <StyledText
                        size={14}
                        variant="bold"
                        color={COLORS.GREYSCALE_900}>
                        {p.title}
                      </StyledText>
                      <StyledText
                        size={12}
                        variant="semiBold"
                        color={COLORS.GREYSCALE_500}
                        textStyle={styles.projectSub}>
                        {p.subtitle}
                      </StyledText>
                      <StyledText
                        size={14}
                        variant="bold"
                        color={COLORS.GREYSCALE_900}
                        textStyle={styles.projectPrice}>
                        {p.price}
                      </StyledText>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {this.state.selectedTab === 0 && (
              <View style={styles.overviewBlock}>
                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}>
                  {t('DEVELOPER_SCREEN.OVERVIEW')}
                </StyledText>
                <StyledText
                  size={14}
                  variant="regular"
                  color={COLORS.GREYSCALE_700}
                  lineHeight={24}
                  textStyle={styles.overviewParaSpacing}
                  numberOfLines={this.state.overviewExpanded ? undefined : 2}>
                  {this.state?.developer?.description || ''}
                </StyledText>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      overviewExpanded: !this.state.overviewExpanded,
                    })
                  }>
                  <StyledText size={12} variant="bold" color={COLORS.PRIMARY}>
                    {this.state.overviewExpanded
                      ? t('DEVELOPER_SCREEN.READ_LESS')
                      : t('DEVELOPER_SCREEN.READ_MORE')}
                  </StyledText>
                </TouchableOpacity>

                <StyledText
                  size={18}
                  variant="bold"
                  color={COLORS.GREYSCALE_900}
                  textStyle={styles.sectionHeading}>
                  {t('DEVELOPER_SCREEN.KEY_HIGHLIGHTS')}
                </StyledText>
                <View style={styles.gridWrap}>
                  {this.state.developer?.highlights?.map(h => {
                    const getIcon = () => {
                      switch (h.icon) {
                        case 'bed':
                          return <BedIcon size={24} color={COLORS.PRIMARY} />;
                        case 'building':
                          return (
                            <BuildingIcon size={24} color={COLORS.PRIMARY} />
                          );
                        case 'leaf':
                          return <LeafIcon size={24} color={COLORS.PRIMARY} />;
                        case 'mixed':
                          return (
                            <MixedUseIcon size={24} color={COLORS.PRIMARY} />
                          );
                        default:
                          return null;
                      }
                    };
                    return (
                      <View key={h?.id || h?.name} style={styles.highlightCard}>
                        <View style={styles.highlightIcon}>{getIcon()}</View>
                        <StyledText
                          size={12}
                          variant="bold"
                          color={COLORS.GREYSCALE_700}
                          textStyle={styles.highlightText}>
                          {h?.name || ''}
                        </StyledText>
                      </View>
                    );
                  })}
                </View>

                {/* Tags intentionally hidden as requested */}
              </View>
            )}

            {this.state.selectedTab === 2 && (
              <View style={styles.reviewsBlock}>
                <View style={styles.reviewsHeader}>
                  <StyledText
                    size={32}
                    variant="bold"
                    color={COLORS.GREYSCALE_900}>
                    4.5
                  </StyledText>
                  <View style={styles.reviewsStarsRow}>{renderStars(4.5)}</View>
                  <StyledText
                    size={14}
                    color={COLORS.GREYSCALE_500}
                    textStyle={styles.reviewsSub}>
                    Based on 1,200 reviews
                  </StyledText>
                </View>

                {/* Category bars */}
                {this.dummyData.ratingBreakdown.map(item => (
                  <View key={item.label} style={styles.barRow}>
                    <StyledText
                      size={14}
                      variant="medium"
                      color={COLORS.GREYSCALE_900}
                      textStyle={styles.barLabel}>
                      {item.label}
                    </StyledText>
                    <View style={styles.barTrack}>
                      <View style={[styles.barFill, {width: `${item.pct}%`}]} />
                    </View>
                  </View>
                ))}

                {/* Filter chips */}
                <View style={styles.reviewChipsRow}>
                  {[
                    t('DEVELOPER_SCREEN.REV_FILTER_ALL'),
                    t('DEVELOPER_SCREEN.REV_FILTER_LASTEST'),
                    t('DEVELOPER_SCREEN.REV_FILTER_TOP_RATED'),
                    t('DEVELOPER_SCREEN.REV_FILTER_REVIEW_OF_DAY'),
                  ].map((txt, idx) => {
                    const active = this.state.reviewFilterIdx === idx;
                    return (
                      <TouchableOpacity
                        key={txt}
                        onPress={() => this.setState({reviewFilterIdx: idx})}
                        style={[
                          styles.reviewChip,
                          active && styles.reviewChipActive,
                        ]}>
                        <StyledText
                          size={12}
                          variant="semiBold"
                          color={active ? COLORS.WHITE : COLORS.GREYSCALE_900}>
                          {txt}
                        </StyledText>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Reviews list */}
                {this.dummyData.reviews.map((r, idx) => (
                  <View key={r.id || r.name + idx} style={styles.reviewItem}>
                    <View style={styles.reviewHeaderRow}>
                      <StyledText
                        size={14}
                        variant="bold"
                        color={COLORS.GREYSCALE_900}>
                        {r.name}
                      </StyledText>
                      <StyledText size={12} color={COLORS.GREYSCALE_500}>
                        {r.date}
                      </StyledText>
                    </View>
                    <View style={styles.reviewStarsRow}>
                      {renderStars(r.rating)}
                    </View>
                    <StyledText
                      size={12}
                      lineHeight={22}
                      color={COLORS.GREYSCALE_700}
                      textStyle={styles.reviewText}>
                      {r.text}
                    </StyledText>
                    <View style={styles.reviewDivider} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(DeveloperDetailScreen));
