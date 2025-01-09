import { createStackNavigator } from '@react-navigation/stack';
import Folder from '../../screens/home';
import { CreateFolder } from '../../screens/createFolder';
import Notes from '../../screens/Notes';
import { CreateNote } from '../../screens/createNote';
import { NoteScreen } from '../../screens/noteScreen';



const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();


export const FolderStack = () => {
  return (
    <StackNavigator
      initialRouteName="Folder"
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <StackScreen name="Folder" component={Folder} />
      <StackScreen name="CreateFolder" component={CreateFolder} />
      <StackScreen name="Notes" component={Notes} />
      <StackScreen name="CreateNote" component={CreateNote} />
      <StackScreen name="NoteScreen" component={NoteScreen} />
    </StackNavigator>
  );
};
