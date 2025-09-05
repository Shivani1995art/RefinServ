import { enableScreens } from 'react-native-screens';
enableScreens();

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppProvider } from './src/contexts/AppContext';
import colors from './src/constants/colors';
import { ToasterProvider } from './src/constants/CustomToast';
import LoaderProvider from './src/constants/LoaderProvider';
import BootSplash from "react-native-bootsplash";
const App = () => {


   useEffect(() => {
    const init = async () => {
       console.log("do multiple sync or async tasks");
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  return (
    <SafeAreaProvider>
    
       <SafeAreaView edges={['top']} style={styles.safeArea}>
      <AppProvider>
          <LoaderProvider>
        <ToasterProvider>
          <NavigationContainer>
          <Navigation />
        </NavigationContainer>
       
        </ToasterProvider>
        </LoaderProvider>
      </AppProvider>
      </SafeAreaView>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
       backgroundColor: colors.secondary,
  },
});

export default App;
