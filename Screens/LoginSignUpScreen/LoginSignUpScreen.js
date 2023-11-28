import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import { handleSubmit } from '../../Authentication/Authentication';
import { showCustomToast } from '../../Components/CustomToast';
import { UserContext } from '../../Components/UserContext';

function LoginSignUpScreen({ onLogin }) {
    const [username, setUsername] = useState('willumsen');
    const [password, setPassword] = useState('Bowie2018');
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={mainStyles.contentContainer}>
                    <View style={mainStyles.formContainer}>
                        <View style={mainStyles.textContainer}>
                            <Text style={mainStyles.text}>Login Screen</Text>
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
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default LoginSignUpScreen;
