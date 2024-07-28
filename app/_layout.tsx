import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '@/app/index';
import notFound from '@/app/+not-found';
import Loan_details from '@/app/loan_details';
import {RootStackParamList, } from '@/assets/types/navigations' 


import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

 



  const RootStack = createStackNavigator<RootStackParamList>();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootStack.Navigator initialRouteName="index">

        {/* <RootStack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <RootStack.Screen name='index' options={{headerShown: false}} component={Index}/>
        <RootStack.Screen name="+not-found" component={notFound}/>
        <RootStack.Screen name='loan_details' options={{headerShown: false}} component={Loan_details}/>
        </RootStack.Navigator>

    </ThemeProvider>
  );
}
