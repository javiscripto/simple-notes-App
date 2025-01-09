import { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/customButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllFolders } from "../DB/index";
import { Ionicons } from "@expo/vector-icons";

export default function Folder() {
  const { navigate } = useNavigation();
  const [folders, setFolders] = useState([]);

  const getfolders = async () => {
    try {
      const result = await getAllFolders();
      setFolders(result);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getfolders();
  }, []);


  const handleFolderNotesPress = (id, name) => {
    navigate("Notes", { id, name })
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity style={style.item} onPress={() => handleFolderNotesPress(item.id, item.name)}>
      <Ionicons name="folder" size={80} color={"#f90000"} />
      <Text style={style.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Folders</Text>
      <View style={style.content}>
        {folders.length === 0 ? (<Text>lista de carpetas vacia</Text>) : (
          <FlatList
            contentContainerStyle={style.flatList}
            initialNumToRender={8}
            data={folders}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        )
        }
      </View>

      <CustomButton onPress={() => navigate("CreateFolder")}>
        Crear una nueva carpeta
      </CustomButton>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },

  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 8, padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8, elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8, // Espaciado entre ícono y texto
    textAlign: "center",
  },
});
