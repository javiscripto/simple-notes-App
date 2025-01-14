import { createStackNavigator } from "@react-navigation/stack";
import Notes from "../../screens/Notes";
import { NoteScreen } from "../../screens/noteScreen";



const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();

export const AllNotesStack = () => {
  return (
    <StackNavigator
      initialRouteName="AllNotes"
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <StackScreen name="AllNotes" component={Notes} />
      <StackScreen name="NoteScreen" component={NoteScreen} />

    </StackNavigator>
  )
}
