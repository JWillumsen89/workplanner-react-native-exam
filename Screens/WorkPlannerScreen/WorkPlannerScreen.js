import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { showCustomToast } from '../../Components/CustomToast';
import mainStyles from '../../Styles/mainStyles';
import { BASE_URL } from '../../Components/Urls';
import Calendar from './Calendar';
import { socket } from '../../Components/Socket.io';

function WorkPlannerScreen({ navigation }) {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    socket.on('user_signup', async () => {
        await fetchUsersData();
    });

    socket.on('user_updated', async () => {
        await fetchUsersData();
    });

    const fetchUsersData = async () => {
        try {
            const response = await fetch(BASE_URL + '/admin/users', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const responseData = await response.json();
            const sortedUsers = responseData.data.sort((a, b) => a.username.localeCompare(b.username));
            setUsersList(sortedUsers);
        } catch (error) {
            showCustomToast({ type: 'error', text1: 'Error', text2: error.message });
        }
    };

    return (
        <View style={mainStyles.contentContainer}>
            <Calendar usersList={usersList}/>
        </View>
    );
}


export default WorkPlannerScreen;
