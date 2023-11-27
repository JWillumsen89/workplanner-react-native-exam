const BASE_URL = 'http://192.168.1.10:3000';

export async function handleSubmit(submitData) {
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
            userData.sessionId = sessionId;
            return userData;
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchProfileData() {
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
