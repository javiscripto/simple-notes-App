import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./tabs";
import { useDispatch } from 'react-redux';
import { fetchAllNotes, fetchFolders } from "../features/notesSlice";
import { useEffect } from "react";
export const MainNavigation = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotes());
    dispatch(fetchFolders());
  }, [dispatch]);

  return (

    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}
