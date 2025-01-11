import './gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigation } from './navigation/mainNavigation';
import { dropTables, init } from './DB';
import { Provider } from 'react-redux';
import { store } from './store/index';

// dropTables()
//   .then(() => console.log('DB dropped'))
init()
  .then(() => console.log('DB initialized'))
  .catch(err => console.error(err))

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigation />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </Provider>
  );
}


