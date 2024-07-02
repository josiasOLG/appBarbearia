// components/organisms/AssinaturaList/AssinaturaList.tsx
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import AssinaturaItem from '../../molecules/AssinaturaItem/AssinaturaItem';

interface Assinatura {
  id: string;
  status: string;
  createdAt: string;
  amount: string;
}

const AssinaturaList: React.FC<{assinaturas: Assinatura[]}> = ({
  assinaturas,
}) => (
  <FlatList
    data={assinaturas}
    renderItem={({item}) => <AssinaturaItem item={item} />}
    keyExtractor={item => item.id}
    style={styles.flatlist}
  />
);

const styles = StyleSheet.create({
  flatlist: {},
});

export default AssinaturaList;
