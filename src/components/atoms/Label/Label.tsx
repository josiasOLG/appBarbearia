import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({text}) => {
  return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
});

export default Label;
