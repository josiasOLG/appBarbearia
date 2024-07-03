import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors/Colors';
import typography from '../../styles/typographys/typography';
import LinearGradient from 'react-native-linear-gradient';

interface ClientDetailsScreenProps {
  route: any;
}

const ClientDetailsScreen: React.FC<ClientDetailsScreenProps> = ({route}) => {
  const {clientName} = route.params;
  const user = useSelector((state: any) => state.user);
  const userRole = user?.user.type?.toLowerCase() || 'user';
  const themeColors = colors[userRole] || colors.user;

  const [clients, setClients] = useState([
    {
      name: 'João Silva',
      points: 120,
      history: ['Corte de cabelo - 10 pontos', 'Barba - 10 pontos'],
    },
    {
      name: 'Maria Oliveira',
      points: 80,
      history: ['Tintura de cabelo - 20 pontos'],
    },
    {name: 'Pedro Sousa', points: 50, history: ['Corte de cabelo - 15 pontos']},
  ]);

  const client = clients.find(client => client.name === clientName);

  return (
    <LinearGradient
      colors={[themeColors.primary, themeColors.primary]}
      style={styles.gradient}>
      <StatusBar backgroundColor={themeColors.primary} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, typography.semiBold]}>
            {client?.name}
          </Text>
          <Text style={[styles.points, typography.bold]}>
            Pontos: {client?.points}
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, typography.bold]}>
              Histórico de Pontos
            </Text>
            {client?.history.map((item, index) => (
              <Text key={index} style={styles.historyText}>
                {item}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  points: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ClientDetailsScreen;
