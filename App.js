import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SpaceWeather from './src/App';

const App = (props) =>{
  return(
    <SafeAreaProvider>
      <SpaceWeather/>
    </SafeAreaProvider> 
  );
}

export default App;
