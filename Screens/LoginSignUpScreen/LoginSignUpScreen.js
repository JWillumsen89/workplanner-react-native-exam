import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import { handleSubmit } from '../../Authentication/Authentication';
import { showCustomToast } from '../../Components/CustomToast';
import { UserContext } from '../../Components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginSignUpScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData, setSessionId } = useContext(UserContext);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            showCustomToast({ type: 'error', text1: 'Error', text2: 'Username and Password are required.' });
            return;
        }
        try {
            const data = {
                username: username,
                password: password,
            };

            await handleSubmit(data, setUserData, setSessionId);

            onLogin();
            showCustomToast({ type: 'success', text1: 'Logged in successfully.' });
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    const printUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            const userData = userDataString ? JSON.parse(userDataString) : null;
            console.log('AsyncStorage - User Data: ', userData);
        } catch (error) {
            console.error('Error reading userData from AsyncStorage:', error);
        }
    };

    return (
        <View style={mainStyles.contentContainer}>
            <View style={mainStyles.formContainer}>
                <View style={mainStyles.textContainer}>
                    <Text style={mainStyles.text}>Login/Sign Up Screen</Text>
                </View>

                <TextInput
                    style={mainStyles.input}
                    placeholder="Enter Username Or Email..."
                    placeholderTextColor="#FFA726"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={mainStyles.input}
                    placeholder="Enter Password..."
                    placeholderTextColor="#FFA726"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={mainStyles.button} onPress={handleLogin}>
                    <Text style={mainStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={mainStyles.button} onPress={printUserData}>
                    <Text style={mainStyles.buttonText}>Print Async User Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginSignUpScreen;
