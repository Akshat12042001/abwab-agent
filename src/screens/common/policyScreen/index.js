import React from 'react';
import {ScreenContainer, CommonHeader} from '../../../components/atoms';
import {COLORS, SCREEN} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import styles from './styles';
import {ScrollView} from 'react-native';

const systemFonts = [
  ...defaultSystemFonts,
  'Manrope-Bold',
  'Manrope-ExtraBold',
  'Manrope-ExtraLight',
  'Manrope-Light',
  'Manrope-Medium',
  'Manrope-Regular',
  'Manrope-SemiBold',
  'PTSerif-Bold',
];

class PolicyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.isTerms = false;
    this.state = {
      html: '',
    };
  }

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const {t} = this.props?.i18n;
    return (
      <ScreenContainer
        backgroundColor={COLORS.LIGHT_GREY_BG}
        paddingTop={insetTop + 20}>
        <CommonHeader
          title={
            this.isTerms
              ? t('LABELS.TERMS_AND_CONDITIONS')
              : t('LABELS.PRIVACY_POLICY')
          }
        />
        <ScrollView
          style={styles.root}
          contentContainerStyle={styles.container}>
          <RenderHTML
            contentWidth={SCREEN.WIDTH}
            source={{
              html: `
              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  </li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                </ol>
                <h1>Lorem ipsum dolor sit amet</h1>
                <h2>Lorem ipsum dolor sit amet</h2>
                <h3>Lorem ipsum dolor sit amet</h3>
                <h4>Lorem ipsum dolor sit amet</h4>
                <h5>Lorem ipsum dolor sit amet</h5>
                <h6>Lorem ipsum dolor sit amet</h6>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  </li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                </ol>
                <h1>Lorem ipsum dolor sit amet</h1>
                <h2>Lorem ipsum dolor sit amet</h2>
                <h3>Lorem ipsum dolor sit amet</h3>
                <h4>Lorem ipsum dolor sit amet</h4>
                <h5>Lorem ipsum dolor sit amet</h5>
                <h6>Lorem ipsum dolor sit amet</h6>
              `,
            }}
            systemFonts={systemFonts}
            tagsStyles={styles.tagsStyles}
          />
        </ScrollView>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(PolicyScreen));
