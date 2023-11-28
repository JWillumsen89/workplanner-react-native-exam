import React, { useContext } from 'react';
import { UserContext } from '../../Components/UserContext';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';


function AdminScreen({ navigation }) {
    const { userData, setUserData } = useContext(UserContext);

    const printUserData = () => {
        console.log('User Data:', userData);
    };

    return (
        <View style={mainStyles.contentContainer}>
            <Text>Admin Screen</Text>
            <TouchableOpacity style={mainStyles.button} onPress={printUserData}>
                <Text style={mainStyles.buttonText}>Print User Data</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AdminScreen;