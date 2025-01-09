import { Text, StyleSheet, TextInput, Alert, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../components/customButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNote } from "../DB";

export const CreateNote = () => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { navigate } = useNavigation();
  const route = useRoute();
  const folderId = route.params.folderId


  const handleTitleChange = (value) => {
    setInputs((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleContentChange = (value) => {
    setInputs((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSaveNote = async () => {
    try {
      const result = await createNote(inputs.title, inputs.content, folderId);
      console.log("db result (createnote): ", result)
      if (!result) {
        Alert.alert("Error al guardar la nota");
        throw new Error("Error al guardar la nota");
      }
      Alert.alert("Nota Guardada");
      navigate("Notes", { id: folderId }); //redirigir a pantalla anterior con parametro necesario
    } catch (error) {
      console.error(error);
    } finally {

      setInputs({
        title: "",
        content: "",
      })
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.title}>Crear Nota</Text>
      <View style={style.content}>
        <TextInput
          placeholder="Título"
          value={inputs.title}
          onChangeText={handleTitleChange}
          style={style.input}
        />
        <TextInput
          placeholder="Contenido"
          value={inputs.content}
          onChangeText={handleContentChange}
          style={style.input}
          multiline={true}
        />
      </View>
      {inputs.title && inputs.content && (
        <CustomButton content="Guardar" onPress={handleSaveNote} >crear nota</CustomButton>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginBottom: 15,
  },
});

