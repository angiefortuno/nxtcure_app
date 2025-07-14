import AgendaContentRow from '@/components/agendaContentRow';
import BottomNav from '@/components/BottomNav';
import { ThemedText } from '@/components/ThemedText';
import { todayAgenda } from '@/types/agenda';
import { groupAgendaByHour } from '@/utils/agendaUtils';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const TodayAgenda = () => {
    const router = useRouter();

    const handleAddEvent = () => {
        router.push('/addEvent');
    }

    
    const agendaData = groupAgendaByHour(todayAgenda);
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
            <TouchableOpacity style = {styles.headerIcon} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#0D141C" />
            </TouchableOpacity>
            <ThemedText type='header'>Today</ThemedText>
            </View>

            {/* Agenda Content */}
            <ScrollView style = {styles.overviewContainer}>
                {Object.keys(agendaData).map((hour: string, index: number) => (
                    <View key={index} style={styles.hourBlock}>
                        <ThemedText type='defaultSemiBold'>{hour}</ThemedText>

                        {agendaData[hour].map((item, idx) => (
                            <AgendaContentRow
                            key = {`agenda-${hour}-${idx}`}
                            item = {item}
                            originPage='todayAgenda'/>
                        ))}
                    </View>
                ))}
            </ScrollView>

            {/* Add event Button*/}
            <TouchableOpacity style = {styles.addButton} onPress = {handleAddEvent}>
                <Ionicons name = 'add' size = {24} color = "#FFFFFF"/>
                <ThemedText type = 'header' style = {{color: '#FFFFFF'}}>Add Event</ThemedText>
            </TouchableOpacity>
            <BottomNav/>
        </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 18,
        marginBottom: 10,
    },
    headerIcon : {
        position: 'absolute',
        paddingLeft: 16,
        paddingRight: 16,
        left: 0,
        top: 0
    },
    overviewContainer: {
      margin: 10,
      marginTop: 30,
      marginHorizontal: 20,
      gap: 30
    },
    hourBlock: {
        marginBottom: 30, 
    },
    addButton: {
      flexDirection: 'row',
      gap : 5,
      position: 'absolute',
      bottom: 100,
      right: 26,
      width: 150,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#908DDC',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default TodayAgenda;
export const options = {
    headerShown: false,
}