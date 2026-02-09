import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { noteService, NoteType } from '../services/noteService';
import { Ionicons } from "@expo/vector-icons";

const NoteView = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  useEffect(() => {
    noteService.getNotes().then(setNotes);
  }, []);

  const handleAddNote = async () => {
    if (!title.trim()) return;
    const updated = await noteService.saveNote(title, description);
    setNotes(updated); 
    setTitle("");
    setDescription("");
    Keyboard.dismiss();
  };

  const handleDelete = async (id: string) => {
    const updated = await noteService.deleteNote(id);
    setNotes(updated);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.formCard}>
        <TextInput 
          placeholder="Note Title" 
          style={styles.titleInput} 
          value={title}
          onChangeText={setTitle}
        />
        <TextInput 
          placeholder="Description..." 
          style={styles.descInput} 
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleAddNote}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteDesc}>{item.description}</Text>
              <Text style={styles.noteDate}>{item.createdAt}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f0f2f5' },
  formCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, elevation: 3 },
  titleInput: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#eee', marginBottom: 10, paddingVertical: 5 },
  descInput: { fontSize: 16, height: 60, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  noteCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  noteTitle: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  noteDesc: { fontSize: 14, color: '#666', marginTop: 5 },
  noteDate: { fontSize: 11, color: '#aaa', marginTop: 8 },
});

export default NoteView;