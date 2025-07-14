import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { AgendaItem } from "@/types/agenda";
import React from "react";
import {getAgendaIcon, getAgendaImage } from "@/utils/agendaUtils";
import { useRouter } from "expo-router";

type ValidRoutes = `/calendar` | `/todayAgenda` | `/medicationList`; 

type Props = {
    item: AgendaItem;
    originPage?: 'calendar' | 'todayAgenda';
    navigationRoute?: [string, ValidRoutes];
};

const AgendaContentRow : React.FC<Props> = ({item, originPage, navigationRoute}) => {

    const router = useRouter();

    const {category, name, startTime, endTime} = item;
    const {icon, iconCategory: IconComponent} = getAgendaIcon(category);
    const image = getAgendaImage(category);
    const showImage = originPage === 'todayAgenda' && item.category === 'Appointment';
    const handleNavigation = () => {
        if (navigationRoute && typeof navigationRoute[1] === 'string') {
            router.push(navigationRoute[1]);
        }

    }
    
    const Content = (
        <View style = {agendaStyle.overviewElement}>
            {/* Image / Icon */}
            <View 
                style = {[
                    agendaStyle.visualContainer,
                    originPage === 'calendar' && {backgroundColor: '#E8EDF5'}
            ]}>
                {showImage && !!image ? (
                    <Image source={image} style={agendaStyle.imageContainer} resizeMode='contain'/>
                ) : (
                    <IconComponent name={icon} size={28} color="#0D141C"/>
                )}
            </View>

            {/* Text Content */}
            <View style = {agendaStyle.TextContainer}>
                <ThemedText type = 'default'>{name}</ThemedText>
                <ThemedText type = 'subtitleLight'>
                    {endTime ? `${startTime} - ${endTime}` : startTime}
                </ThemedText>
                
            </View>
        </View>
    )

    return !!navigationRoute ? (
        <TouchableOpacity onPress={handleNavigation}>{Content}</TouchableOpacity>
    ) : (
        <View>{Content}</View>
    );
}

const agendaStyle = StyleSheet.create({
    overviewElement: {
        flexDirection: 'row',
        alignItems: 'center',
        gap : 10,
        paddingVertical: 12,
    },
    visualContainer: {
        width: 50,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer : {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    TextContainer : {
        flex: 1,
        flexDirection :'column',
        height : 36,
    },

});

export default React.memo(AgendaContentRow);