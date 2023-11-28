import { BASE_URL } from '../Components/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function handleSubmit(submitData, setUserData, setSessionId) {
    const data = {
        username: submitData.username,
        password: submitData.password,
        app: true,
    };
    try {
        const response = await fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const sessionId = jsonResponse.data.sessionId;
            const userData = await fetchProfileData();

            setUserData(userData);
            setSessionId(sessionId);
            await AsyncStorage.setItem('sessionId', sessionId);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export async function fetchProfileData() {
    try {
        const response = await fetch(BASE_URL + '/user/profile', {
            credentials: 'include',
        });
        if (response.ok) {
            const responseData = await response.json();
            const userData = responseData.data;
            return userData;
        } else {
            console.error('Error fetching profile data: ', await response.text());
        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

export async function validateSession() {
    try {
        const response = await fetch(BASE_URL + '/auth/validateSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            const responseData = await response.json();
            const isValidSession = responseData.isValid;
            return isValidSession;
        } else {
            console.error('Error validating session: ', await response.text());
        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}
