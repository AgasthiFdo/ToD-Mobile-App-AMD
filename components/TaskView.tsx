import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { taskService, ToDoType } from '../services/taskService';

const TaskView = () => {
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]); // Search සඳහා backup එක
  const [todoText, setTodoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const data = await taskService.getTodos();
    setTodos(data);
    setOldTodos(data);
  };

  
  useEffect(() => {
    if (searchQuery === "") {
      setTodos(oldTodos);
    } else {
      const filtered = oldTodos.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setTodos(filtered);
    }
  }, [searchQuery]);

  const handleAdd = async () => {
    if (!todoText.trim()) return;
    const newTodo = { id: Math.random(), title: todoText, isDone: false };
    const updatedTodos = [...oldTodos, newTodo];
    
    setTodos(updatedTodos);
    setOldTodos(updatedTodos);
    await taskService.saveTodos(updatedTodos);
    
    setTodoText("");
    Keyboard.dismiss();
  };

  const handleDelete = async (id: number) => {
    const updatedTodos = oldTodos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    setOldTodos(updatedTodos);
    await taskService.saveTodos(updatedTodos);
  };

  const handleToggleDone = async (id: number) => {
    const updatedTodos = oldTodos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
    setTodos(updatedTodos);
    setOldTodos(updatedTodos);
    await taskService.saveTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput 
          placeholder="Search Tasks" 
          style={styles.searchInput} 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>


      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoInfo}>
              <Checkbox value={item.isDone} onValueChange={() => handleToggleDone(item.id)} color="#4630EB" />
              <Text style={[styles.todoText, item.isDone && styles.doneText]}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />


      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={80}>
        <View style={styles.inputRow}>
          <TextInput 
            style={styles.newInput} 
            placeholder="Add New Task" 
            value={todoText} 
            onChangeText={setTodoText}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  searchBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10 },
  todoItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  todoInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  todoText: { fontSize: 16 },
  doneText: { textDecorationLine: 'line-through', color: '#aaa' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  newInput: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 10 },
  addButton: { backgroundColor: '#4630EB', padding: 10, borderRadius: 10 }
});

export default TaskView;