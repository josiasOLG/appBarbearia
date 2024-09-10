import React from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import {useRoute, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  PDFViewer: {base64: string};
};

type PDFViewerRouteProp = RouteProp<RootStackParamList, 'PDFViewer'>;

const PDFViewer: React.FC = () => {
  const route = useRoute<PDFViewerRouteProp>();
  const {base64} = route.params;

  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: `data:application/pdf;base64,${base64}`}}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PDFViewer;
