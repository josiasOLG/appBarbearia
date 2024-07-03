import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const LoadingModal: React.FC = () => {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingModal;
