import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import SearchIcon from '../../../assets/icons/search.svg';

interface IconButtonProps {
  onPress: () => void;
  backgroundColor: string;
}

const IconButton: React.FC<IconButtonProps> = ({onPress, backgroundColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.roundedIconSearch, {backgroundColor}]}>
        <SearchIcon color={'#fff'} width={25} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedIconSearch: {
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
  },
});

export default IconButton;
