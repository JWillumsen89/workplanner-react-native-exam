import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Calendar = ({ usersList }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('isoWeek'));
    const [currentWeek, setCurrentWeek] = useState([]);
    const [screenData, setScreenData] = useState(Dimensions.get('window'));

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenData(window);
        });

        setCurrentWeek(getWeekDays(currentWeekStart));

        return () => subscription?.remove();
    }, [currentWeekStart]);

    function getWeekDays(startOfWeek) {
        return Array(7)
            .fill()
            .map((_, i) => startOfWeek.clone().add(i, 'days'));
    }

    function goToNextWeek() {
        setCurrentWeekStart(currentWeekStart.clone().add(1, 'week'));
    }

    function goToPreviousWeek() {
        setCurrentWeekStart(currentWeekStart.clone().subtract(1, 'week'));
    }

    const isLandscape = screenData.width > screenData.height;
    const resourceColumnWidth = isLandscape ? screenData.width * 0.14 : screenData.width * 0.16;
    const dayColumnWidth = isLandscape ? (screenData.width * 0.811) / 7 : (screenData.width * 0.735) / 7;

    const renderItem = ({ item }) => (
        <View style={[styles.dayColumn, { width: dayColumnWidth }]}>
            <Text style={styles.dayText}>{item.format('DD.MM')}</Text>
        </View>
    );

    const renderUserItem = ({ item: user }) => (
        <View style={styles.userRow}>
            <View style={{ width: resourceColumnWidth }}>
                <Text style={styles.userText}>{user.username}</Text>
            </View>
            <FlatList
                data={currentWeek}
                renderItem={({ item, index }) => <View style={[styles.field, { width: dayColumnWidth }]} />}
                keyExtractor={item => item.format('YYYY-MM-DD') + user.id}
                horizontal={true}
                style={styles.userFieldsList}
            />
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerToolbar}>
                <TouchableOpacity onPress={goToPreviousWeek} style={styles.navButton}>
                    <Text style={styles.navButtonText}>&lt; Prev</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}>
                    <Text style={styles.navButtonText}>Next &gt;</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.calendarContainer, isLandscape ? styles.centeredContainer : {}]}>
                <View style={[styles.resourceColumn, { width: resourceColumnWidth }]}>
                    <Text style={styles.resourceText}>Smede</Text>
                </View>
                <FlatList
                    data={currentWeek}
                    renderItem={renderItem}
                    keyExtractor={item => item.format('YYYY-MM-DD')}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                />
            </View>
            <View style={styles.usersContainer}>
                {usersList.map((user, index) => (
                    <React.Fragment key={index}>{renderUserItem({ item: user })}</React.Fragment>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    headerToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#2E2E2E',
        marginBottom: 20,
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFA726',
    },
    navButton: {
        padding: 10,
    },
    navButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    calendarContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#333',
        borderBottomWidth: 2,
        borderBottomColor: '#FFA726',
    },
    centeredContainer: {
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        backgroundColor: '#121212',
    },
    resourceColumn: {
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    resourceText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    dayColumn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    dayText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    navigationText: {
        color: '#FFFFFF',
        fontSize: 12,
        padding: 10,
    },
    usersContainer: {
        flexDirection: 'column',
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: 20,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingVertical: 5,
    },
    userText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    userFieldsList: {
        flexDirection: 'row',
    },
    field: {
        flex: 1,
        height: 30,
        backgroundColor: '#444',
        marginHorizontal: 2,
    },
});

export default Calendar;
