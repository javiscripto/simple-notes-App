import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteNote } from "../DB";


export const NoteScreen = () => {
  const route = useRoute();

  const { title, content, id, createdAt } = route.params;
  const { navigate } = useNavigation();

  const handleDeletePress = async (id) => {
    try {
      await deleteNote(id)
      Alert.alert("Nota eliminada")
      navigate("Folder");
    } catch (error) {
      console.error("ha ocurrido un error al eliminar la nota: ", error)
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => handleDeletePress(id)}
        >
          <Ionicons name="trash-sharp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.content}>{content}</Text>
      </View>
      <Text style={styles.createdAt}>created at {createdAt}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  options: {
    flexDirection: "row",
    marginBottom: 16,
    width: 100,
    gap: 32,
    alignSelf: "flex-end",
  },
  content: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },
  createdAt: {
    fontSize: 12,
    color: "#999",
  },
});
