//listado de notas dentro de una carpeta
import { Text, StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardNote } from "../components/cardNote";
import { useEffect, useState } from "react";
import { getFolderNotes, getNotes } from "../DB";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CustomButton } from "../components/customButton";

export default function Notes() {
  const [notas, setNotas] = useState([]);

  const { navigate } = useNavigation()
  const route = useRoute()
  const folderId = route.params.id;
  const folderName = route.params.name;





  const fetchNotes = async () => {
    try {
      let result;
      if (!folderId) {
        result = await getNotes();
      } else {
        result = await getFolderNotes(folderId);
      }
      setNotas(result)
    } catch (error) {
      console.error("ha ocurrido un error al recibir las notas: ", error)
    }
  }
  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>{folderName}</Text>
      <View style={style.content}>
        {notas.length === 0 ? (
          <Text>no existen notas en esta carpeta</Text>
        ) :
          (<FlatList
            data={notas}
            keyExtractor={(item) => item.title}
            contentContainerStyle={style.noteContainer}
            numColumns={2}
            renderItem={({ item }) =>
              <CardNote title={item.title}
                content={item.content}
                id={item.id}
                createdAt={item.createdAt}

                folderId={item.folder_id}
              />}
          />)}
      </View>
      <CustomButton onPress={() => navigate("CreateNote", { folderId })}>Crear una nueva nota</CustomButton>

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
