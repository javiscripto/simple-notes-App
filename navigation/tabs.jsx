import { CreateNote } from "../screens/createNote";
import Folder from "../screens/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notes from "../screens/Notes";
import { enableScreens } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";
import { FolderStack } from "./stacks/FolderStack";

enableScreens();

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Folders"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Folders") {
            iconName = focused ? "folder-open" : "folder-open-outline";
          } else if (route.name === "Notes") {
            iconName = focused ? "document" : "document-outline";
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          ;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}

    >
      <Tab.Screen name="Folders" component={FolderStack} />

      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Create" component={CreateNote} />
    </Tab.Navigator >
  );
};

