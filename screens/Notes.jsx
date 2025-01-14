//listado de notas dentro de una carpeta
import { Text, StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardNote } from "../components/cardNote";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CustomButton } from "../components/customButton";
import { useDispatch, useSelector } from "react-redux";
import { setFilterNotesByFolderId } from "../features/notesSlice";//to do : revisar reducer

export default function Notes() {
  const [notas, setNotas] = useState([]);

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const allNotes = useSelector((state) => state.notes.notes);
  const foldernotes = useSelector((state) => state.notes.filteredNotes);

  useEffect(() => {
    if (route.params) {
      const folderId = route.params.id;
      const filteredNotes = allNotes.filter((note) => note.folder_id === folderId);
      setNotas(filteredNotes);
    } else {
      setNotas(allNotes);
    }
  }, [route.params, allNotes, dispatch]);

  return (
    <SafeAreaView style={style.container}>
      {route.params ? (
        <Text style={style.title}>{route.params.name}</Text>
      ) : (
        <Text style={style.title}>Todas las notas</Text>
      )}
      <View style={style.content}>
        <FlatList
          data={notas}
          keyExtractor={(item) => item.title}
          contentContainerStyle={style.noteContainer}
          numColumns={2}
          ListEmptyComponent={<Text>No existen notas en esta carpeta</Text>}
          renderItem={({ item }) => <CardNote {...item} />}
        />
      </View>
      {route.params && (
        <CustomButton onPress={() => navigate("CreateNote", { folderId: route.params.id })}>
          Crear una nueva nota
        </CustomButton>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  noteContainer: {
    gap: 8,
  },

}
)
