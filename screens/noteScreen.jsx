import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from '@expo/vector-icons/Ionicons';


export const NoteScreen = () => {
  const route = useRoute();

  const { title, content, createdAt } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        <TouchableOpacity>
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
