import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStack';
import LoadingScreen from './src/screens/base/LoadingScreen';
import {hideLoading} from './src/store/reducers/loading.reducer';
import Toast from 'react-native-toast-message';

const AppWrapper: React.FC = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  const loadingMessage = useSelector((state: any) => state.loading.message);
  const dispatch = useDispatch();

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <RootStackNavigator />
          <LoadingScreen
            visible={isLoading}
            message={loadingMessage}
            onSuccess={() => dispatch(hideLoading())}
            onError={(message, type = 'error') => {
              dispatch(hideLoading());
              Toast.show({
                type: type,
                text1:
                  type === 'success'
                    ? 'Sucesso'
                    : type === 'warning'
                    ? 'Aviso'
                    : 'Erro',
                text2: message,
              });
            }}
          />
        </SafeAreaView>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppWrapper;
