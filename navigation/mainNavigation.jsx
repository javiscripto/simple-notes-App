import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./tabs";
import { FolderStack } from "./stacks/FolderStack";
import { useDispatch, useSelector } from 'react-redux';
import { selectNotes, fetchAllNotes } from "../features/notesSlice";
import { useEffect } from "react";
export const MainNavigation = () => {

  const dispatch = useDispatch();
  // const notes = useSelector(selectNotes);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);


  console.log("notes :", notes);


  return (

    <NavigationContainer>
      <FolderStack />
      {/* <Tabs /> */}
    </NavigationContainer>
  )
}
