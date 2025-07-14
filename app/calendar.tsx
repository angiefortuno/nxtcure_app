import BottomNav from "@/components/BottomNav";
import CustomIcon from "@/components/CustomIcon";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageSourcePropType, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Agenda, AgendaEntry, Calendar, LocaleConfig } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AgendaContentRow from "@/components/agendaContentRow";
import { useCallback, useMemo } from "react";
import { todayMinimalAgenda } from "@/types/agenda";

LocaleConfig.locales['custom'] = {
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: [    
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  dayNames: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: 'Today'
};

LocaleConfig.defaultLocale = 'custom';

const calenderScreen = () => {
    // console.log("calenderScreen rendered");
    const router = useRouter();

    const today = useMemo(() => {
      const now = new Date();
      return now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    }, []);
    // console.log("Today:", today);

    //Dynamically update today date highlight 
    const highlight = {
    [today]: {
      selected: true,
      selectedColor : '#908DDC',
      selectedTextColor : '#FFFFFF'}
    };
    // console.log("Highlight:", highlight);

    //function logic to expand agenda page
    const expandAgenda = (day : string) => {
      if (day === today) {
        router.push('/todayAgenda');
      }
      else {
        router.push('/+not-found');
      }
    }

    const handleAddEvent = () => {
        router.push('/addEvent');
    }
    
    //minimal agenda display
    const minimalAgenda =  todayMinimalAgenda;

    return (
      <SafeAreaView style = {styles.container}>
        {/* Header */}
        <View style = {styles.header}>
          <ThemedText 
            type='header'>Calendar</ThemedText>
          <Ionicons name='menu' size={24} color="#0D141C" style={styles.headerIcon}/>
        </View>
      
        {/* Calendar */}
        <Calendar 
            onDayPress={ (day) => {
                expandAgenda(day.dateString);
              }
            }
            style = {styles.calendarContainer}
            markedDates={highlight}
            theme={{
              arrowColor: '#0D141C',
              arrowHeight: 16,
              textMonthFontSize: 16,
              textMonthFontWeight: '700',
              monthTextColor: "#0D141C",
              textDayFontWeight: '500',
              textDayFontSize: 14,
              dayTextColor: "#0D141C",
              textSectionTitleColor: "#0D141C",
              textDayHeaderFontWeight: '700',
              textDayHeaderFontSize: 12
        }}/>

        {/* Overview */}
        
        <ScrollView style={styles.overviewContainer}>
          <ThemedText type='overviewTitles'>Today's Schedule</ThemedText>

          {/* Overview Contents */}
          { minimalAgenda.map((item, index) => (
            <AgendaContentRow
              key={index}
              item={item}
              originPage="calendar"
              navigationRoute= {item.category === 'Medication' ? ['calendar', '/medicationList'] : undefined}
            />
          ))}
        </ScrollView>

        {/* Add event Button*/}
        <TouchableOpacity style = {styles.addButton} onPress = {handleAddEvent}>
          <Ionicons name = 'add' size = {24} color = "#FFFFFF"/>
        </TouchableOpacity>
        <BottomNav/>
      </SafeAreaView>
    );
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      justifyContent: 'center'
    },
    header : {
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
      right: 0,
      top: 0
    },
    calendarContainer: {
      marginVertical: 12,
      marginHorizontal: 16
    },
    overviewContainer: {
      margin: 10,
      marginHorizontal: 15,
      gap: 5,
    },
    addButton: {
      position: 'absolute',
      bottom: 100,
      right: 26,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#908DDC',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default calenderScreen;
export const options = {
    headerShown: false,
}