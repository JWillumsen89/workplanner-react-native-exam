// In SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { showCustomToast } from '../../Components/CustomToast';
import mainStyles from '../../Styles/mainStyles';
import { BASE_URL } from '../../Components/Urls';

function WorkPlannerScreen({ navigation }) {
    const fetchUsersData = async () => {
        try {
            const response = await fetch(BASE_URL + '/admin/get-all-users', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const responseData = await response.json();
            const usersData = responseData.data;
            console.log('Users Data:', usersData);
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Work Planner Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <TouchableOpacity style={mainStyles.button} onPress={fetchUsersData}>
                <Text style={mainStyles.buttonText}>Fetch Users Data</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default WorkPlannerScreen;
