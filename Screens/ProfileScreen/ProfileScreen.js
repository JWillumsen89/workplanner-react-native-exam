import React, { useContext } from 'react';
import { UserContext } from '../../Components/UserContext';
import { View, Text, TouchableOpacity } from 'react-native';
import mainStyles from '../../Styles/mainStyles';

function formatEuropeanDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function dummyButton() {
    console.log('Dummy button pressed.');
}

function ProfileScreen({ navigation }) {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <View style={mainStyles.contentContainer}>
            <View style={[mainStyles.userProfileSectionStyle, { width: '100%' }]}>
                <View style={mainStyles.userDetails}>
                    <View style={[mainStyles.avatarPlaceholder, { width: 100, height: 100, borderRadius: 50 }]} />
                    <Text style={mainStyles.usernameText}>{userData.username}</Text>
                    <Text style={mainStyles.emailText}>Email: {userData.email}</Text>
                    <Text style={[mainStyles.roleText, { marginBottom: 8 }]}>{userData.role}</Text>
                    <Text style={[mainStyles.detailText, { color: '#FFA726' }]}>Created: {formatEuropeanDate(userData.createdAt)}</Text>
                    <Text style={[mainStyles.detailText, { color: '#FFA726', marginBottom: 20 }]}>Updated: {formatEuropeanDate(userData.updatedAt)}</Text>
                    <View style={mainStyles.buttonContainer}>
                        <TouchableOpacity style={[mainStyles.button, { width: 112, paddingHorizontal: 5 }]} onPress={dummyButton}>
                            <Text style={[mainStyles.buttonText, { fontSize: 14 }]}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[mainStyles.button, { width: 157, paddingHorizontal: 5 }]} onPress={dummyButton}>
                            <Text style={[mainStyles.buttonText, { fontSize: 14 }]}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ProfileScreen;
