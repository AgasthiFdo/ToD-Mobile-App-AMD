import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { MaterialIcons, Ionicons } from "@expo/vector-icons"

const tabs = [
  { name: "home", icon: "home", title: "Home" },
  { name: "calendar", icon: "calendar-today", title: "Calendar" },
  { name: "tasks", icon: "list", title: "Tasks" },
  { name: "notes", icon: "book", title: "Notes" },
  { name: "news", icon: "article", title: "News" }
  
] as const
// DRY - Don't Repeat Yourself
const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      // tabBar={(props) => <></>}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={tab.icon} color={color} size={size} />
            )
          }}
        />
      ))}
    </Tabs>
  )
}

export default DashboardLayout
