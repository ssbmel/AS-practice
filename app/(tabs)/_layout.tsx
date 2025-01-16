import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function _layout() {
  return (
    <Tabs 
    screenOptions={{
        tabBarActiveTintColor: "#2961ff",
        tabBarStyle: {
            height: 65
        },
        headerStyle: {
            backgroundColor: "#fff",
            // iOS에서 그림자 추가
            shadowOpacity: 0.1,
            shadowRadius: 1,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowColor: "gray",
            // Android에서 그림자 추가
            elevation: 3,
        },
        headerShadowVisible: false,
        headerTitleAlign: "left",
    }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: "AS접수내역",

                tabBarIcon: ({color}) => (
                    <MaterialIcons name="headset-mic" size={24} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name='inventory'
            options={{
                title: "본사재고",
                tabBarIcon: ({color}) => (
                    <FontAwesome name="pencil-square-o" size={24} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name='notification'
            options={{
                title: "공지사항",
                tabBarIcon: ({color}) => (
                    <AntDesign name="notification" size={24} color={color}/>
                )
            }}
        />
        <Tabs.Screen 
            name='alarm'
            options={{
                title: "알림",
                tabBarIcon: ({color}) => (
                    <Ionicons name="notifications-outline" size={24} color={color} />
                )
            }}
        />
        <Tabs.Screen 
            name='menu'
            options={{
                title: "전체메뉴",
                tabBarIcon: ({color}) => (
                    <Feather name="menu" size={24} color={color} />
                )
            }}
        />
    </Tabs>
  )
}