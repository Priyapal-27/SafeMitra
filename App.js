import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MobileRegistrationScreen from './screens/functional-part/MobileRegistrationScreen';
import LoginScreen from './screens/functional-part/LoginScreen';
import VoiceTrainingScreen from './screens/functional-part/VoiceTrainingScreen';
import SOSSetupScreen from './screens/functional-part/SOSSetupScreen';
import SplashScreen from './screens/functional-part/SplashScreen';
import DashboardScreen from './screens/functional-part/DashboardScreen';
import SOSScreen from './screens/functional-part/SOSScreen';
import GuardianListScreen from './screens/functional-part/GuardianListScreen';
import SafeRouteSetupScreen from './screens/functional-part/SafeRouteSetupScreen';
import TriggerEventsFeedScreen from './screens/functional-part/TriggerEventsFeedScreen';
import SOSListeningControlScreen from './screens/functional-part/SOSListeningControlScreen';
import GuardianNotificationsScreen from './screens/functional-part/GuardianNotificationsScreen';
import BlockchainLogsScreen from './screens/functional-part/BlockchainLogsScreen';
import LiveLocationPreviewScreen from './screens/functional-part/LiveLocationPreviewScreen';
import AdminPanelScreen from './screens/functional-part/AdminPanelScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MobileRegistration" component={MobileRegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VoiceTraining" component={VoiceTrainingScreen} />
          <Stack.Screen name="SOSSetup" component={SOSSetupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen 
            name="SOS" 
            component={SOSScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="GuardianList" component={GuardianListScreen} />
          <Stack.Screen name="SafeRouteSetup" component={SafeRouteSetupScreen} />
          <Stack.Screen name="TriggerEventsFeed" component={TriggerEventsFeedScreen} />
          <Stack.Screen name="SOSListeningControl" component={SOSListeningControlScreen} />
          <Stack.Screen name="GuardianNotifications" component={GuardianNotificationsScreen} />
          <Stack.Screen name="BlockchainLogs" component={BlockchainLogsScreen} />
          <Stack.Screen name="LiveLocationPreview" component={LiveLocationPreviewScreen} />
          <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 