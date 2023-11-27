import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import { handleSubmit } from '../../Authentication/Authentication';
import { UserContext } from '../../Components/UserContext';
import { showCustomToast } from '../../Components/CustomToast';

function LoginSignUpScreen({ navigation, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { userData, setUserData } = useContext(UserContext);

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
            const userDataResponse = await handleSubmit(data);

            if (userDataResponse) {
                setUserData(userDataResponse);
                onLogin();
                showCustomToast({ type: 'success', text1: 'Logged in successfully.' });
            }
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    const printUserData = () => {
        console.log('User Data:', userData);
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

                <TouchableOpacity style={mainStyles.button} onPress={printUserData}>
                    <Text style={mainStyles.buttonText}>Print User Data</Text>
                </TouchableOpacity>
                <TouchableOpacity style={mainStyles.button} onPress={handleLogin}>
                    <Text style={mainStyles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default LoginSignUpScreen;
