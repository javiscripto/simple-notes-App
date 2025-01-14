import { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/customButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolderAsync, fetchAllNotes, fetchFolders } from "../features/notesSlice";

export default function Folder() {
  const [optionVisible, setOptionsVisible] = useState(false);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchFolders());
      dispatch(fetchAllNotes());

      return () => { };
    }, [])
  )
  const folders = useSelector((state) => state.notes.folders);



  const handleFolderNotesPress = (id, name) => {
    navigate("Notes", { id, name })
  }



  const handleViewOptionLongPress = () => {
    setOptionsVisible(true)
  };

  const deleteFolder = (id) => {
    dispatch(deleteFolderAsync(id));
    setOptionsVisible(false)
  }
  const deleteFolderPress = (id, name) => {
    Alert.alert(
      "Eliminar Carpeta",
      `Estas seguro que quieres eliminar la carpeta "${name}" y todo su contenido?`,
      [
        {
          text: "Cancelar",
          onPress: () => setOptionsVisible(false),
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => deleteFolder(id),
        },
      ]
    )
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={style.item}
      onLongPress={handleViewOptionLongPress}
      onPress={() => handleFolderNotesPress(item.id, item.name)}>
      <Ionicons name="folder" size={80} color={"#f90000"} />
      <Text style={style.text}>{item.name}</Text>
      <Text style={style.description}>{item.description}</Text>
      {
        optionVisible && (
          <TouchableOpacity onPress={() => deleteFolderPress(item.id, item.name)}>
            <Ionicons name="trash" size={24} color={"#f90000"} />
          </TouchableOpacity>
        )
      }
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Carpetas</Text>
      <View style={style.content}>
        <FlatList
          contentContainerStyle={style.flatList}
          initialNumToRender={8}
          data={folders}
          ListEmptyComponent={<Text>Aun no hay carpetas</Text>}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
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
    backgroundColor: "#e9e9ff",
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
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
