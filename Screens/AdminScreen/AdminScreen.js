import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { View, Text, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import mainStyles from '../../Styles/mainStyles';
import { showCustomToast } from '../../Components/CustomToast';
import { BASE_URL } from '../../Components/Urls';
import { socket } from '../../Components/Socket.io';

function formatEuropeanDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function AdminScreen({ navigation }) {
    const [usersList, setUsersList] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsersData();
    }, []);

    useEffect(() => {
        setFilteredUsersList(
            usersList.filter(user => user.username.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, usersList]);

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

    const renderUser = ({ item }) => (
        <View style={mainStyles.userRow}>
            <View style={mainStyles.userDetails}>
                <Text style={mainStyles.usernameText}>{item.username}</Text>
                <Text style={mainStyles.emailText}>Email: {item.email}</Text>
                <Text style={[mainStyles.roleText, { marginBottom: 8 }]}>{item.role}</Text>
                <Text style={[mainStyles.detailText, { color: '#FFA726' }]}>Created: {formatEuropeanDate(item.createdAt)}</Text>
                <Text style={[mainStyles.detailText, { color: '#FFA726' }]}>Updated: {formatEuropeanDate(item.updatedAt)}</Text>
            </View>
        </View>
    );

    return (
        <View style={mainStyles.contentContainerList}>
            <View style={mainStyles.searchBarContainer}>
                <SearchBar
                    placeholder="Search Users..."
                    onChangeText={setSearch}
                    value={search}
                    containerStyle={mainStyles.searchBarContainer}
                    inputContainerStyle={mainStyles.searchBar.inputContainerStyle}
                />
            </View>
            <FlatList keyExtractor={(item, index) => index.toString()} data={filteredUsersList} renderItem={renderUser} />
        </View>
    );
}
export default AdminScreen;
