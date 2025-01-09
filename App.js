import './gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigation } from './navigation/mainNavigation';
import * as SplashScreen from "expo-splash-screen";
import { dropTables, init } from './DB';
import { NavigationContainer } from '@react-navigation/native';
import { FolderStack } from './navigation/stacks/FolderStack';

// dropTables()
//   .then(() => console.log('DB dropped'))
init()
  .then(() => console.log('DB initialized'))
  .catch(err => console.error(err))

export default function App() {
  return (
    <SafeAreaProvider>
      <MainNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}


