// In HomeScreen.js
import React, { useContext } from 'react';
import { UserContext } from '../../Components/UserContext';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';
import { fetchProfileData } from '../../Authentication/Authentication';

function HomeScreen({ navigation }) {
    const { userData, setUserData } = useContext(UserContext);

    const printUserData = () => {
        console.log('User Data:', userData);
    };

    const fetchUserData = async () => {
        const userData = await fetchProfileData();
        setUserData(userData);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Work Planner" onPress={() => navigation.navigate('WorkPlanner')} />
            <TouchableOpacity style={mainStyles.button} onPress={printUserData}>
                <Text style={mainStyles.buttonText}>Print User Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={mainStyles.button} onPress={fetchUserData}>
                <Text style={mainStyles.buttonText}>Fetch User</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;
