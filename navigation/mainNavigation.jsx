import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./tabs";
import { FolderStack } from "./stacks/FolderStack";
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, fetchAllNotes, fetchFolders } from "../features/notesSlice";
import { useEffect } from "react";
export const MainNavigation = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotes());
    dispatch(fetchFolders());
  }, [dispatch]);

  return (

    <NavigationContainer>
      <FolderStack />
      {/* <Tabs /> */}
    </NavigationContainer>
  )
}
