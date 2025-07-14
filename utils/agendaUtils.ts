import { agendaCategory, AgendaItem, medicineCategory } from "@/types/agenda";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export function getAgendaIcon(category: agendaCategory) {
  return agendaIconMap[category] ?? { icon: "alert", iconCategory: Ionicons };
}

export function getAgendaImage(category: agendaCategory) {
  return agendaImageMap[category] ?? null;
}

export function formatAgendaTitle(category: agendaCategory, eventTopic: string): string {
  return category === "Appointment"
    ? `${category} with ${eventTopic}`
    : `${category}: ${eventTopic}`;
}

export function groupAgendaByHour(agenda: AgendaItem[]) {
  const grouped: Record<string, AgendaItem[]> = {};

  agenda.forEach(item => {
    const hour = item.startTime.split(':')[0] + ':00 ' + item.startTime.split(' ')[1]; // e.g., "10:00 AM"
    if (!grouped[hour]) {
      grouped[hour] = [];
    }
    grouped[hour].push(item);
  });

  return grouped;
}

export const agendaIconMap: Record<agendaCategory,  {icon:string, iconCategory: React.ComponentType<any> }> = {
    Appointment: {
        icon: 'calendar-outline',
        iconCategory: Ionicons
    },
    Medication: {
        icon: 'pill',
        iconCategory: MaterialCommunityIcons
    },
    Milestone: {
        icon: 'flag-outline',
        iconCategory: Ionicons
    }
}

export const agendaImageMap: Record<agendaCategory, any> = {
    Appointment: require('../assets/images/doctor.png'),
    Medication: null,
    Milestone: null
};

export const medicineImageMap : Record<medicineCategory, any> = {
    Aspirin: require('../assets/images/aspirin.png'),
    Ibuprofen: require('../assets/images/ibuprofen.png'),
    Acetaminophen: require('../assets/images/acetaminophen.png'),
};