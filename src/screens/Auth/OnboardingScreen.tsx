import React, {useRef} from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import EcoIcon from '../../assets/icons/eco.svg';
import OnboradingIcon1 from '../../assets/icons/onborading1.svg';
import typography from '../../styles/typographys/typography';

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
    title: 'Bem-Vindo à StyleCut',
    text: 'Conquiste o visual perfeito com mestres barbeiros ao toque de um botão',
    image: OnboradingIcon1,
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Serviços Exclusivos',
    text: 'Descubra uma ampla gama de serviços - corte clássico, barba artesanal e tratamentos premium',
    image: OnboradingIcon1,
    backgroundColor: '#fff',
  },
  {
    key: 'three',
    title: 'Agende Seu Horário',
    text: 'Escolha seu barbeiro favorito, selecione o serviço desejado e marque o melhor horário para você.',
    image: OnboradingIcon1,
    backgroundColor: '#fff',
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const sliderRef = useRef<AppIntroSlider<Slide>>(null);

  const renderSlide = ({item}: {item: Slide}) => (
    <View style={[styles.slide]}>
      <Text style={[styles.title, typography.bold]}>{item.title}</Text>
      <Text style={[styles.text, typography.light]}>{item.text}</Text>
      <OnboradingIcon1 width={300} color={'#fff'} style={styles.image} />
    </View>
  );

  const onDone = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.navigate('LoginScreens');
    } catch (error) {
      console.error('Error storing onboarding completion:', error);
    }
  };

  const renderNextButton = () => (
    <View style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>Proximo</Text>
    </View>
  );

  const renderSkipButton = () => {
    const currentIndex = sliderRef.current?.state.activeIndex || 0;
    const isFirstSlide = currentIndex === 0;

    return (
      <View
        style={[
          styles.buttonWrapperSkip,
          isFirstSlide && styles.disabledButton,
        ]}>
        <Text style={styles.buttonTextSkip}>Pular</Text>
      </View>
    );
  };

  const renderDoneButton = () => (
    <View style={styles.buttonWrapper}>
      <Text style={styles.buttonText}>Ok</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#7b67e9', '#624ed1']} style={styles.gradient}>
      <StatusBar backgroundColor={'#624ed1'} />
      <EcoIcon style={styles.iconBack} />
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
        dotStyle={{...styles.dotStyle, width: 0, height: 0}}
        activeDotStyle={{...styles.activeDotStyle, width: 0, height: 0}}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gradient: {
    flex: 1,
  },
  image: {
    marginBottom: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginVertical: 20,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  activeDotStyle: {
    backgroundColor: '#000',
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    backgroundColor: '#5350d3',
  },
  buttonWrapperSkip: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  buttonTextSkip: {
    color: '#fff',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  iconBack: {
    position: 'absolute',
    opacity: 0.3,
  },
});

export default OnboardingScreen;
