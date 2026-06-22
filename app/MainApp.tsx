import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path, Circle, Polyline, Line } from 'react-native-svg';
import DiscoverScreen from './tabs/discover';
import CommunityScreen from './tabs/community';
import MessagesScreen from './tabs/messages';
import ProfileScreen from './tabs/profile';

const Tab = createBottomTabNavigator();

function DiscoverIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <Polyline points="9 22 9 12 15 12 15 22"/>
    </Svg>
  );
}

function CommunityIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Circle cx="12" cy="12" r="10"/>
      <Line x1="2" y1="12" x2="22" y2="12"/>
      <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </Svg>
  );
}

function MessagesIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </Svg>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <Circle cx="12" cy="7" r="4"/>
    </Svg>
  );
}

export default function MainApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#BE7B74',
          tabBarInactiveTintColor: '#B0B7C3',
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color }) => {
            if (route.name === 'Discover') return <DiscoverIcon color={color} />;
            if (route.name === 'Community') return <CommunityIcon color={color} />;
            if (route.name === 'Messages') return <MessagesIcon color={color} />;
            if (route.name === 'Profile') return <ProfileIcon color={color} />;
          },
        })}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Messages" component={MessagesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EBEBEB',
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
  },
});
