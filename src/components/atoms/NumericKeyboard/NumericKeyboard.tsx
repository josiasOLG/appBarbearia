// src/components/NumericKeyboard.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import typography from '../../../styles/typographys/typography';

interface NumericKeyboardProps {
  onPress: (value: string) => void;
  onDelete: () => void;
}

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({
  onPress,
  onDelete,
}) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', 'delete'],
  ];

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => (key === 'delete' ? onDelete() : onPress(key))}>
              <Text style={[styles.keyText, typography.regular]}>
                {key === 'delete' ? '⌫' : key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 0,
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  keyText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default NumericKeyboard;
