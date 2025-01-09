import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./tabs";
import { FolderStack } from "./stacks/FolderStack";

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <FolderStack />
      {/* <Tabs /> */}
    </NavigationContainer>
  )
}
