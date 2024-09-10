import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import FeedbackHeader from '../../components/organisms/FeedbackHeader/FeedbackHeader';
import ReviewList from '../../components/organisms/ReviewList/ReviewList';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const FeedbackScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <LinearGradient colors={['#f1faf2', '#f1faf2']} style={styles.container}>
      <StatusBar
        backgroundColor={themeColors.primary}
        barStyle="light-content"
      />
      <FeedbackHeader themeColors={themeColors} />
      <ReviewList themeColors={themeColors} />
      {/* <TouchableOpacity
        style={[
          styles.writeReviewButton,
          {backgroundColor: themeColors.primary},
        ]}>
        <Text style={[styles.writeReviewButtonText, typography.semiBold]}>
          Write a review
        </Text>
      </TouchableOpacity> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  writeReviewButton: {
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  writeReviewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default FeedbackScreen;
