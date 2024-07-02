import React from 'react';
import {Text, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface CardTextProps {
  text: string;
}

const CardText: React.FC<CardTextProps> = ({text}) => {
  return <Text style={[styles.text, typography.regular]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default CardText;
