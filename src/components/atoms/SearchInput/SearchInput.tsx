import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      placeholderTextColor={'#12182e'}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    color: '#333',
    flex: 1,
    height: 'auto',
    backgroundColor: '#d2e2ef',
    marginTop: 15,
    borderRadius: 10,
    fontSize: 18,
    padding: 20,
  },
});

export default SearchInput;
