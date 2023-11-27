// In SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function WorkPlannerScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Work Planner Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

// You can customize the style as needed
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
