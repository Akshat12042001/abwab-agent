import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {
  CommonHeader,
  ScreenContainer,
  StyledText,
} from '../../../components/atoms';
import {COLORS} from '../../../constants';
import {withTranslation} from 'react-i18next';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '../../../components/svgs';
import styles from './styles';

class FaqScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedItemId: 'faq_1', // First item expanded by default
      searchQuery: '',
    };
  }

  getFaqData = () => {
    const {t} = this.props?.i18n;
    return [
      {
        id: 'faq_1',
        question: t('FAQ_SCREEN.QUESTION_1'),
        answer: t('FAQ_SCREEN.ANSWER_1'),
      },
      {
        id: 'faq_2',
        question: t('FAQ_SCREEN.QUESTION_2'),
        answer: t('FAQ_SCREEN.ANSWER_2'),
      },
      {
        id: 'faq_3',
        question: t('FAQ_SCREEN.QUESTION_3'),
        answer: t('FAQ_SCREEN.ANSWER_3'),
      },
      {
        id: 'faq_4',
        question: t('FAQ_SCREEN.QUESTION_4'),
        answer: t('FAQ_SCREEN.ANSWER_4'),
      },
      {
        id: 'faq_5',
        question: t('FAQ_SCREEN.QUESTION_5'),
        answer: t('FAQ_SCREEN.ANSWER_5'),
      },
    ];
  };

  toggleItem = itemId => {
    this.setState(prevState => ({
      expandedItemId: prevState.expandedItemId === itemId ? null : itemId,
    }));
  };

  handleSearchChange = text => {
    this.setState({searchQuery: text});
  };

  getFilteredFaqs = () => {
    const {searchQuery} = this.state;
    const faqs = this.getFaqData();
    if (!searchQuery.trim()) {
      return faqs;
    }
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    );
  };

  renderFaqItem = ({item}) => {
    const {expandedItemId} = this.state;
    const isExpanded = expandedItemId === item.id;

    return (
      <View>
        <TouchableOpacity
          style={styles.faqItem}
          onPress={() => this.toggleItem(item.id)}
          activeOpacity={0.7}>
          <View style={styles.faqQuestionContainer}>
            <StyledText
              size={14}
              variant="bold"
              color={COLORS.GREYSCALE_900}
              textStyle={styles.faqQuestion}>
              {item.question}
            </StyledText>
            {isExpanded ? (
              <ChevronUpIcon size={24} color={COLORS.GREYSCALE_500} />
            ) : (
              <ChevronDownIcon size={24} color={COLORS.GREYSCALE_500} />
            )}
          </View>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.faqAnswerContainer}>
            <StyledText
              size={14}
              variant="regular"
              color={COLORS.GREYSCALE_700}
              lineHeight={24}
              textStyle={styles.faqAnswer}>
              {item.answer}
            </StyledText>
          </View>
        )}
        <View style={styles.divider} />
      </View>
    );
  };

  render() {
    const insetTop = this.props?.insets?.top || 0;
    const insetBottom = this.props?.insets?.bottom || 0;
    const {t} = this.props?.i18n;
    const filteredFaqs = this.getFilteredFaqs();

    return (
      <ScreenContainer
        backgroundColor={COLORS.LIGHT_GREY_BG}
        paddingTop={insetTop + 20}>
        <CommonHeader title={t('FAQ_SCREEN.TITLE')} />
        <StyledText
          size={32}
          variant="bold"
          color={COLORS.GREYSCALE_900}
          textStyle={styles.mainTitle}>
          {t('FAQ_SCREEN.MAIN_TITLE')}
        </StyledText>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={COLORS.GREYSCALE_500} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('FAQ_SCREEN.SEARCH_PLACEHOLDER')}
            placeholderTextColor={COLORS.GREYSCALE_500}
            value={this.state.searchQuery}
            onChangeText={this.handleSearchChange}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.faqListContainer}>
            <FlatList
              data={filteredFaqs}
              renderItem={this.renderFaqItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.faqListContent,
                {paddingBottom: insetBottom + 20},
              ]}
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }
}

export default withTranslation()(withSafeAreaInsets(FaqScreen));
