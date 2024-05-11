import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import PrivacyScreen from '../Screens/PrivacyScreen';
import SettingScreen from '../Screens/SettingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import TermsScreen from '../Screens/TermsScreen';

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
