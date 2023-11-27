import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1C1C1E', // Dark background for the whole screen
    },
    formContainer: {
        width: '100%', // Take up full width available
        padding: 20, // Padding inside the container
        borderRadius: 10, // Rounded corners for the form
        borderWidth: 2, // Border width
        borderColor: '#FFA726', // Orange border color
        backgroundColor: '#262626', // Slightly lighter dark background for the form
        marginBottom: 20, // Space below the form
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: '#FFA726', // Orange color for text
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FFA726', // Orange border
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#262626', // Slightly lighter grey for input background
        color: '#FFFFFF', // White color for input text
    },
    button: {
        backgroundColor: '#FFA726', // Orange background for buttons
        paddingVertical: 10, // Reduced vertical padding
        paddingHorizontal: 20, // Slightly more horizontal padding
        borderRadius: 5, // Rounded corners
        borderWidth: 1, // Subtle border
        borderColor: '#FFB85C', // A lighter shade of orange for the border
        alignItems: 'center', // Center text in button
        marginBottom: 10, // Space below each button
        width: '80%', // Less massive, more elegant width
        alignSelf: 'center', // Center the button in its container
    },
    buttonText: {
        fontSize: 16, // Adjusted font size
        color: '#1C1C1E', // Dark text for better contrast
        fontWeight: '500', // Medium font weight
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20, // Margin bottom for text container
    },
});

export default mainStyles;
