import React from 'react';
import { Tabs } from 'expo-router';
import { Moon, BookHeart } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.sageGreen,
        tabBarInactiveTintColor: '#C8C8C8',
        tabBarStyle: {
          backgroundColor: '#F9F8F6',
          borderTopColor: '#F0EDE8',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#F9F8F6',
        },
        headerTintColor: '#4A4A4A',
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '심야의 약방',
          tabBarIcon: ({ color, size }) => (
            <Moon color={color} size={size} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '나만의 약장',
          tabBarIcon: ({ color, size }) => (
            <BookHeart color={color} size={size} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}
