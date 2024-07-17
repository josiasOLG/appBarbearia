// App.tsx
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store, {persistor} from './src/store';
import AppWrapper from './AppWrapper'; // Import the new AppWrapper component

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppWrapper />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
