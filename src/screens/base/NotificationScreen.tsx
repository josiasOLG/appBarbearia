import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import typography from '../../styles/typographys/typography';
import NotificationItem from '../../components/molecules/NotificationItem/NotificationItem';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';

const notifications = [
  {
    id: '1',
    type: 'success',
    title: 'Congratulations',
    message:
      'Your order is accepted by the provider and will deliver in short.',
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'danger',
    title: 'We are sorry',
    message:
      'Your order has been rejected by the provider. Let us help you with finding someone else.',
    time: '1 hr ago',
  },
  {
    id: '3',
    type: 'info',
    title: 'On the way',
    message:
      'Your order has been sent to the provider. He will be back shortly.',
    time: '3 hr ago',
  },
  {
    id: '4',
    type: 'danger',
    title: 'We are sorry',
    message:
      'Your order has been rejected by the provider. Let us help you with finding someone else.',
    time: '5 hr ago',
  },
  {
    id: '5',
    type: 'info',
    title: 'On the way',
    message:
      'Your order has been sent to the provider. He will be back shortly.',
    time: '1 day ago',
  },
];

const NotificationScreen: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NotificationItem
            type={item.type}
            title={item.title}
            message={item.message}
            time={item.time}
            themeColors={themeColors}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    ...typography.bold,
    fontSize: 18,
    margin: 16,
  },
});

export default NotificationScreen;
