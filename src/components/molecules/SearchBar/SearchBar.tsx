import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import IconButton from '../../atoms/IconButton/IconButton';
import typography from '../../../styles/typographys/typography';

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchPress: () => void;
  themeColor: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextChange,
  onSearchPress,
  themeColor,
}) => {
  return (
    <View style={styles.searchCard}>
      <View style={styles.column1}>
        <Text style={[styles.cardTitle, typography.semiBold]}>Buscar</Text>
        <Text style={[styles.cardText, typography.extraLight]}>
          Busque o código
        </Text>
        <SearchInput
          placeholder="Nome ou Código"
          value={searchText}
          onChangeText={onSearchTextChange}
        />
      </View>
      <View style={[styles.column2, styles.center]}>
        <IconButton onPress={onSearchPress} backgroundColor={themeColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  cardTitle: {
    color: '#12182e',
    fontSize: 20,

    marginBottom: 5,
  },
  cardText: {
    color: '#12182e',
    fontSize: 14,
  },
  column1: {
    flex: 3,
  },
  column2: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
