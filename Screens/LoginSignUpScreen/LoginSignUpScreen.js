import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import { handleSubmit } from '../../Authentication/Authentication';
import { UserContext } from '../../Components/UserContext';
import { showCustomToast } from '../../Components/CustomToast';
import { fetchProfileData } from '../../Authentication/Authentication';

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
            const userData = await handleSubmit(data);

            setUserData(userData);
            onLogin();
            showCustomToast({ type: 'success', text1: 'Logged in successfully.' });
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    const printUserData = () => {
        console.log('User Data:', userData);
    };

    const fetchUserData = async () => {
        const userData = await fetchProfileData();
        console.log('User Data:', userData);
        setUserData(userData);
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

                <TouchableOpacity style={mainStyles.button} onPress={fetchUserData}>
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
