import React, { useContext } from 'react';
import { UserContext } from '../../Components/UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
    const { userData, setUserData, sessionId, setSessionId } = useContext(UserContext);

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
            <Text>Home Screen</Text>
            <TouchableOpacity style={mainStyles.button} onPress={printUserData}>
                <Text style={mainStyles.buttonText}>Print Async User Data</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;
