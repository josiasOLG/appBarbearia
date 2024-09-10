import React, {useRef} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import typography from '../../styles/typographys/typography';
import CustomIcon from '../../components/atoms/Icon/Icon';

import Screen1 from '../../assets/images/screen.png';
import Screen2 from '../../assets/images/screen2.png';
import Screen3 from '../../assets/images/screen3.png';

interface Slide {
  key: string;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    key: 'one',
    title: 'Experiência Única em Barbearia',
    text: 'Descubra a comodidade de agendar cortes e tratamentos exclusivos sem sair de casa.',
    image: Screen1,
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Serviços Exclusivos',
    text: 'Explore uma ampla gama de serviços: cortes clássicos, cuidados especiais com a barba e tratamentos premium.',
    image: Screen2,
    backgroundColor: '#fff',
  },
  {
    key: 'three',
    title: 'Agende Seu Horário',
    text: 'Escolha seu barbeiro favorito, selecione o serviço desejado e reserve o melhor horário para você.',
    image: Screen3,
    backgroundColor: '#fff',
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const sliderRef = useRef<AppIntroSlider<Slide>>(null);

  const renderSlide = ({item}: {item: Slide}) => (
    <View style={styles.slide}>
      <View style={styles.imageBackground}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, typography.bold]}>{item.title}</Text>
        <Text style={[styles.text, typography.light]}>{item.text}</Text>
      </View>
    </View>
  );

  const onDone = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error storing onboarding completion:', error);
    }
  };

  const renderNextButton = () => (
    <View style={[styles.buttonWrapper, styles.shadow]}>
      <CustomIcon
        name="arrow-right"
        type="font-awesome"
        color="#fff"
        size={20}
        style={styles.iconBtnRight}
      />
    </View>
  );

  const renderSkipButton = () => (
    <View style={[styles.buttonWrapperSkip, styles.shadow]}>
      <Text style={styles.buttonTextSkip}>Skip</Text>
    </View>
  );

  const renderDoneButton = () => (
    <View style={[styles.buttonWrapper, styles.shadow]}>
      <CustomIcon
        name="check"
        type="font-awesome"
        color="#fff"
        size={20}
        style={styles.iconBtnRight}
      />
    </View>
  );

  return (
    <LinearGradient colors={['#fff', '#fff']} style={styles.gradient}>
      <StatusBar barStyle="dark-content" backgroundColor={'#efeeea'} />

      <AppIntroSlider<Slide>
        ref={sliderRef}
        renderItem={renderSlide}
        data={slides}
        onDone={onDone}
        showSkipButton
        onSkip={onDone}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        renderDoneButton={renderDoneButton}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  gradient: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#efeeea', // Background cinza
    borderBottomLeftRadius: 50, // Bordas arredondadas na parte inferior
    borderBottomRightRadius: 50,
    paddingBottom: 0,
    paddingTop: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Default color for the rest of the title
    marginBottom: 10,
  },
  highlight: {
    color: '#333', // Highlight color
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  dotStyle: {
    backgroundColor: '#C4C4C4',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: '#333',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  buttonWrapperSkip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonTextSkip: {
    color: '#333',
    fontSize: 14,
  },
  iconBtnRight: {
    alignSelf: 'center',
  },
  iconBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    opacity: 0.3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default OnboardingScreen;
