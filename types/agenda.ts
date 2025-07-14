import { formatAgendaTitle } from "@/utils/agendaUtils";
import { ImageSourcePropType } from "react-native";
import { AgendaEntry } from "react-native-calendars";

export const eventCategories = ['Appointment', 'Medication', 'Milestone'] as const;
export type agendaCategory = typeof eventCategories[number];
export const medicineCategories = ['Aspirin', 'Ibuprofen', 'Acetaminophen'] as const;
export type medicineCategory = typeof medicineCategories[number];

export type AgendaItem = {
  category: agendaCategory ;
  name: string;
  startTime: string;
  endTime: string | null;
};

export type MedicationItem = {
  name: string,
  dosage: string,
  nextDose: string,
  refillDate: string,
}

export const todayAgenda: AgendaItem[] = [
  {
    category: 'Appointment',
    name: formatAgendaTitle('Appointment', 'Dr.Ramirez'),
    startTime : '10:00 AM',
    endTime: '11:00 AM',
  },
  {
    category: 'Medication',
    name: formatAgendaTitle('Medication', 'Chemotherapy'),
    startTime: '11:00 AM',
    endTime: null
  },
  {
    category: 'Appointment',
    name: formatAgendaTitle('Appointment', 'Dr.Michael Chen'),
    startTime: '12:00 PM',
    endTime: '1:00 PM',
  },
  {
    category: 'Medication',
    name: formatAgendaTitle('Medication', 'Chemotherapy'),
    startTime: '1:00 PM',
    endTime: null
  },
  {
    category: 'Milestone',
    name: formatAgendaTitle('Milestone', 'Post-treatment Checkup'),
    startTime: '2:00 PM',
    endTime: '2:30 PM',
  },
  {
    category: 'Medication',
    name: formatAgendaTitle('Medication', 'Chemotherapy'),
    startTime: '3:00 PM',
    endTime: null
  },
  {
    category: 'Medication',
    name: formatAgendaTitle('Medication', 'Chemotherapy'),
    startTime: '5:00 PM',
    endTime: null
  },
];

export const currentMedications : MedicationItem[] = [
  {
    name: 'Aspirin',
    dosage: '81mg, Once daily',
    nextDose: '10:00 AM',
    refillDate: '5 days',
  },
  {
    name: 'Ibuprofen',
    dosage: '200mg, Twice daily',
    nextDose: '12:00 PM',
    refillDate: '10 days',
  },
  {
    name: 'Acetaminophen',
    dosage: '500mg, Once daily',
    nextDose: '6:00 PM',
    refillDate: '15 days',
  },
];

export const todayMinimalAgenda = eventCategories
  .map(category => todayAgenda.find(item => item.category === category))
  .filter(Boolean) as AgendaItem[];