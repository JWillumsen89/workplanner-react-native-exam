import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { UserContext, UserProvider } from './Components/UserContext';
import { View, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { showCustomToast } from './Components/CustomToast';
// Screens
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import WorkPlannerScreen from './Screens/WorkPlannerScreen/WorkPlannerScreen';
import LoginSignUpScreen from './Screens/LoginSignUpScreen/LoginSignUpScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Button title="Logout" onPress={props.onLogout} />
        </DrawerContentScrollView>
    );
}

function MyDrawer({ onLogout }) {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{ drawerType: 'slide' }}
            drawerContent={props => <CustomDrawerContent {...props} onLogout={onLogout} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="WorkPlanner" component={WorkPlannerScreen} />
        </Drawer.Navigator>
    );
}

const toastConfig = {
    success: props => (
        <BaseToast
            {...props}
            style={{
                backgroundColor: '#2D2D2D',
                borderLeftColor: '#FFA726',
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: '#FFA726',
                fontWeight: 'bold',
                fontSize: 26,
            }}
            text2Style={{
                color: '#FFFFFF',
                fontSize: 14,
            }}
        />
    ),
    error: props => (
        <BaseToast
            {...props}
            style={{
                backgroundColor: '#2D2D2D',
                borderLeftColor: '#D32F2F',
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                color: '#D32F2F',
                fontWeight: 'bold',
                fontSize: 22,
            }}
            text2Style={{
                color: '#FFFFFF',
                fontSize: 14,
            }}
        />
    ),
};

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setUserData } = useContext(UserContext);

    const handleLogout = () => {
        setUserData(null);
        setIsLoggedIn(false);

        showCustomToast({ type: 'success', text1: 'Logged out successfully.' });
    };

    return (
        <UserProvider>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, position: 'relative' }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} keyboardShouldPersistTaps="always">
                        <View style={{ flex: 1 }}>
                            <NavigationContainer>
                                {isLoggedIn ? <MyDrawer onLogout={handleLogout} /> : <LoginSignUpScreen onLogin={() => setIsLoggedIn(true)} />}
                            </NavigationContainer>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>

            <Toast config={toastConfig} />
        </UserProvider>
    );
}
