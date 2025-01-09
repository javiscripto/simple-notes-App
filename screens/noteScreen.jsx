import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { deleteNote, updateNote } from "../DB/index";
import { CustomButton } from "../components/customButton";

export const NoteScreen = () => {
  const route = useRoute();
  const { title, content, id, createdAt } = route.params;
  const { navigate } = useNavigation();

  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeletePress = async (id) => {
    try {
      await deleteNote(id);
      Alert.alert("Nota eliminada");
      navigate("Folder");
    } catch (error) {
      console.error("Ha ocurrido un error al eliminar la nota: ", error);
    }
  };

  const handleSavePress = async () => {
    try {
      await updateNote(id, title, editableContent);
      Alert.alert("Nota actualizada");
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => handleDeletePress(id)}>
          <Ionicons name="trash-sharp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? "checkmark" : "create-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.content, styles.editableContent]}
              value={editableContent}
              onChangeText={setEditableContent}
              multiline
            />
            <CustomButton onPress={handleSavePress}>Guardar los cambios</CustomButton>
          </>
        ) : (
          <Text style={styles.content}>{editableContent}</Text>
        )}
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
  editableContent: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  createdAt: {
    fontSize: 12,
    color: "#999",
  },
});

