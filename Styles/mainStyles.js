import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1C1C1E',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userProfileSectionStyle: {
        alignSelf: 'center',
        backgroundColor: '#262626',
        padding: 15,
        margin: 5,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFA726',
        backgroundColor: '#3D3D3D',
        minWidth: '80%',
        maxWidth: '95%',
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
    usersTitle: {
        fontSize: 22,
        color: '#FFA726',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    userRow: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#2D2D2D',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFA726',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        alignSelf: 'center',
    },

    userText: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 4,
    },
    userDetails: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    detailText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    searchBarContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#1C1C1E',
        borderRadius: 5,
    },

    searchBar: {
        borderRadius: 5,
        borderColor: '#FFA726',
        backgroundColor: '#262626',
        color: '#FFFFFF',
        width: '100%',
        inputContainerStyle: {
            borderRadius: 20,
        },
    },

    contentContainerList: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
        backgroundColor: '#1C1C1E',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#FFA726',
        marginBottom: 10,
    },
    headerText: {
        color: '#FFA726',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default mainStyles;
