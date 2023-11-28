import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1C1C1E',
    },
    formContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFA726',
        backgroundColor: '#262626',
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FFA726',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FFA726',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#262626',
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFA726',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFB85C',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#1C1C1E',
        fontWeight: '500',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userProfileSectionStyle: {
        backgroundColor: '#262626', // A slightly lighter dark background
        padding: 15,
        margin: 5,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFA726',
        backgroundColor: '#3D3D3D',
    },
    usernameText: {
        color: '#FFA726',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emailText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 5,
    },
    roleText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontStyle: 'italic',
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFA726',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'center',
    },
});

export default mainStyles;
