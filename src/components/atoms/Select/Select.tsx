import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import CustomIcon from '../Icon/Icon';

interface SelectProps {
  items: {label: string; value: string}[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  themeColors?: any;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Select: React.FC<SelectProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder,
  themeColors,
  style,
  textStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.select, style]}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.selectedText, textStyle]}>
          {selectedValue
            ? items.find(item => item.value === selectedValue)?.label
            : placeholder || 'Select'}
        </Text>
        <CustomIcon name="chevron-down" size={20} color="#000" type="feather" />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item.value)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={[
                styles.closeButton,
                {backgroundColor: themeColors.primary},
              ]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 0,
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  closeButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Select;
