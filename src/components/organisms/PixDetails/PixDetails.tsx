import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import typography from '../../../styles/typographys/typography';
import CustomIcon from '../../atoms/Icon/Icon';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors/Colors';

interface PixDetailProp {
  themeColors: any;
}

const PixDetails: React.FC<PixDetailProp> = ({themeColors}) => {
  const pixCode =
    '00020126580014BR.GOV.BCB.PIX0136a3390e5c-2942-4bd7-9905-4974c4ded81b520400005303986540529.905802BR5925Josias Oliveira Goncalves6009SAO PAULO62140510MhBw4MjB0V6304B9BC';

  const copyToClipboard = () => {
    Clipboard.setString(pixCode);
    Alert.alert(
      'Código copiado',
      'O código Pix foi copiado para a área de transferência.',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, typography.bold]}>Pagamento via Pix</Text>
        <Text style={[styles.description, typography.regular]}>
          Copie ou scanneie o código Pix abaixo para pagar a sua assinatura.
        </Text>
        <CustomIcon
          type="material"
          name="attach-money"
          size={100}
          color="#333"
          style={styles.pixImage}
        />
      </View>

      <View style={styles.codeContainer}>
        <Text style={[styles.codeText, typography.regular]}>{pixCode}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: themeColors.primary}]}
          onPress={copyToClipboard}>
          <Text style={[styles.buttonText, typography.bold]}>
            Copiar código Pix
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  pixImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  codeContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  codeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PixDetails;
