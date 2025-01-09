import { useState } from "react";
import { Alert, View } from "react-native";
import { CustomButton } from "../components/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createFolder } from "../DB";

export const CreateFolder = () => {
  const { navigate } = useNavigation();

  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (name, value) => {
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateFolder = async () => {
    await createFolder(input.name, input.description);
    navigate("Folder");
    Alert.alert("Carpeta Creada");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear Carpeta</Text>
      <View style={styles.content}>
        <View>

          <TextInput style={styles.input} placeholder="Nombre de la Carpeta" onChangeText={(value) => handleInputChange("name", value)} />
          <TextInput style={styles.input} placeholder="descripción..." onChangeText={(value) => handleInputChange("description", value)} multiline={true} />
        </View>
        {input.name !== "" && <CustomButton style={styles.button} onPress={handleCreateFolder}>Crear</CustomButton>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    padding: 10,
    marginBottom: 16,
  }
});
