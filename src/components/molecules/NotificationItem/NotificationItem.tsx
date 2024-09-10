import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface NotificationItemProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  time: string;
  themeColors?: any;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  title,
  message,
  time,
  themeColors,
}) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return themeColors.success;
      case 'warning':
        return themeColors.warning;
      case 'danger':
        return themeColors.danger;
      case 'info':
        return themeColors.info;
      default:
        return themeColors.dark;
    }
  };

  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={[styles.container, {borderLeftColor: getColor()}]}>
        <View style={[styles.dot, {backgroundColor: getColor()}]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[typography.bold, {color: getColor()}]}>{title}</Text>
            <Text style={[styles.time, {color: themeColors.secondary}]}>
              {time}
            </Text>
          </View>
          <Text style={typography.regular}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    borderLeftWidth: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  time: {},
});

export default NotificationItem;
