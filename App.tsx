import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useFetchUsers } from './src/hooks/useFetchUsers';
import { StoreProvider } from "./src/stores";
import HomeScreen from './src/screens/HomeScreen';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const data = useFetchUsers();

  // console.log('DATA', data);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StoreProvider>
      <SafeAreaView style={backgroundStyle}>
        <HomeScreen />
      </SafeAreaView>
    </StoreProvider>
  );
}

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default App;
