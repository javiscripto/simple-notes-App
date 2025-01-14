//tarjeta dentro del listado de notas
import { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteNote } from "../DB";

export const CardNote = ({ title, content, id, createdAt }) => {

  const [optionsVisible, setOptionsVisible] = useState(false);

  const { navigate } = useNavigation();
  const route = useRoute();
  // const folderId = route.params.id;

  const handleViewnotePress = () => {
    navigate('NoteScreen', { title, content, createdAt, id })
  }
  const handleOptionsLongPress = () => {
    setOptionsVisible(true)
  }
  const handleDeletePress = async () => {
    setOptionsVisible(false)
    await deleteNote(id);
    Alert.alert('Nota Eliminada');
    // navigate('Folder', { folderId })

  }

  return (
    <TouchableOpacity
      onLongPress={handleOptionsLongPress}
      onPress={handleViewnotePress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>

        {
          optionsVisible && (
            <View style={styles.options}>
              <TouchableOpacity onPress={handleDeletePress}>
                <Ionicons name="trash-sharp" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  card: {
    display: 'flex',
    padding: 16,
    alignItems: 'center',
    height: 200,
    width: 190,
    backgroundColor: '#f0e000',
    borderRadius: 10,
    margin: 10,
    position: 'relative'
  },
  options: {
    position: 'absolute',
    flexDirection: 'row',
    top: -10,
    right: -20,
    gap: 16,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#fe1110",
    padding: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    fontSize: 16,
    color: '#666'
  }
})
