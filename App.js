import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { UserContext, UserProvider } from './Components/UserContext';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { showCustomToast } from './Components/CustomToast';
import { BASE_URL } from './Components/Urls';
import mainStyles from './Styles/mainStyles';
import { validateSession, fetchProfileData } from './Authentication/Authentication';

// User Screens
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import WorkPlannerScreen from './Screens/WorkPlannerScreen/WorkPlannerScreen';
import LoginSignUpScreen from './Screens/LoginSignUpScreen/LoginSignUpScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
// Admin Screens
import AdminScreen from './Screens/AdminScreen/AdminScreen';

const Drawer = createDrawerNavigator();

const useUserData = () => {
    const { userData: contextUserData, setUserData } = useContext(UserContext);
    const [localUserData, setLocalUserData] = useState(contextUserData);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!contextUserData) {
                try {
                    const userDataString = await AsyncStorage.getItem('userData');
                    const userData = userDataString ? JSON.parse(userDataString) : null;
                    setLocalUserData(userData);
                    setUserData(userData);
                } catch (error) {
                    console.error('Error retrieving userData from AsyncStorage:', error);
                }
            }
        };

        fetchUserData();
    }, [contextUserData, setUserData]);

    return contextUserData || localUserData;
};

function CustomDrawerContent(props) {
    const userData = useUserData();
    const { navigation } = props;

    if (!userData) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    const navigateToProfile = () => {
        navigation.navigate('Profile');
    };

    const userProfileSection = (
        <TouchableOpacity onPress={navigateToProfile}>
            <View style={mainStyles.userProfileSectionStyle}>
                <View style={mainStyles.avatarPlaceholder} />
                <Text style={mainStyles.usernameText}> {userData.username} </Text>
                <Text style={mainStyles.emailText}> {userData.email} </Text>
                <Text style={mainStyles.roleText}> {userData.role} </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: mainStyles.contentContainer.backgroundColor }}>
            {userProfileSection}
            <DrawerItemList {...props} />
            <TouchableOpacity style={[mainStyles.button, { marginTop: 15, width: 100 }]} onPress={props.onLogout}>
                <Text style={mainStyles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

function MyDrawer({ onLogout }) {
    const userData = useUserData();
    const headerStyle = {
        headerStyle: {
            backgroundColor: '#3D3D3D',
        },
        headerTintColor: '#FFA726',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            letterSpacing: 2,
        },
        headerTitleAlign: 'center',
    };

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerType: 'slide',
                drawerActiveTintColor: '#FFA726',
                drawerInactiveTintColor: '#FFFFFF',
                drawerActiveBackgroundColor: '#3D3D3D',
                drawerLabelStyle: { fontSize: 16 },
            }}
            drawerContent={props => <CustomDrawerContent {...props} onLogout={onLogout} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ ...headerStyle, title: 'Home' }} />
            {userData && userData.role === 'admin' && (
                <Drawer.Screen name="AdminScreen" component={AdminScreen} options={{ ...headerStyle, title: 'Admin Screen' }} />
            )}
            <Drawer.Screen name="WorkPlanner" component={WorkPlannerScreen} options={{ ...headerStyle, title: 'Work Planner' }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{ ...headerStyle, title: 'Profile' }} />
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
    const [isLoading, setIsLoading] = useState(true);
    const { setUserData, setSessionId } = useContext(UserContext);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const storedSessionId = await AsyncStorage.getItem('sessionId');
                const storedUserData = await AsyncStorage.getItem('userData');

                if (storedSessionId && storedUserData) {
                    const isValidSession = await validateSession();
                    if (isValidSession) {
                        const fetchedUserData = await fetchProfileData();
                        setSessionId(storedSessionId);
                        setUserData(fetchedUserData);
                        setIsLoggedIn(true);
                        setIsLoading(false);
                    } else {
                        setIsLoggedIn(false);
                        setIsLoading(false);
                    }
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error checking session', error);
            }
        };

        checkSession();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(BASE_URL + '/auth/logout', {
                method: 'POST',
            });
            if (response.ok) {
                setUserData(null);
                setSessionId(null);
                setIsLoggedIn(false);
                await AsyncStorage.removeItem('sessionId');
                await AsyncStorage.removeItem('userData');
                showCustomToast({ type: 'success', text1: 'Logged out successfully.' });
            }
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    return (
        <UserProvider>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, position: 'relative' }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} keyboardShouldPersistTaps="always">
                        <View style={{ flex: 1 }}>
                            <NavigationContainer>
                                {isLoading ? (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                ) : isLoggedIn ? (
                                    <MyDrawer onLogout={handleLogout} />
                                ) : (
                                    <LoginSignUpScreen onLogin={() => setIsLoggedIn(true)} />
                                )}
                            </NavigationContainer>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>

            <Toast config={toastConfig} />
        </UserProvider>
    );
}
