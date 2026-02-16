import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarService } from '../services/calendarService';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null); 

  const refreshTasks = async (date: string) => {
    const data = await calendarService.fetchTasksByDate(date);
    setTasks(data);
  };

  const handleDayPress = async (day: any) => {
    setSelectedDate(day.dateString);
    refreshTasks(day.dateString);
  };

  const handleSave = async () => {
    if (!name || !selectedDate) return;

    if (editingId) {
      
      await calendarService.updateTaskInFirestore(editingId, name, description);
    } else {
      
      await calendarService.saveTaskToFirestore(name, description, selectedDate);
    }

    setName('');
    setDescription('');
    setEditingId(null);
    setModalVisible(false);
    refreshTasks(selectedDate);
  };

  const handleEditPress = (item: any) => {
    setName(item.Name);
    setDescription(item.Description);
    setEditingId(item.id);
    setModalVisible(true);
  };

  const handleDeletePress = (id: string) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
          await calendarService.deleteTaskFromFirestore(id);
          refreshTasks(selectedDate);
      }, style: 'destructive'}
    ]);
  };

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={handleDayPress} 
        markedDates={{[selectedDate]: {selected: true, selectedColor: '#2196F3'}}} 
      />

      <View style={styles.header}>
        <Text style={styles.dateText}>{selectedDate || "Select A Date"}</Text>
        <Button title=" Add Task " onPress={() => { setEditingId(null); setModalVisible(true); }} disabled={!selectedDate} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={{flex: 1}}>
              <Text style={styles.taskTitle}>{item.Name}</Text>
              <Text style={styles.taskSub}>{item.Description}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
               <TouchableOpacity onPress={() => handleEditPress(item)} style={styles.editBtn}>
                  <Text style={{color: 'blue'}}>Edit</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                  <Text style={{color: 'red'}}>Delete</Text>
               </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{editingId ? "Edit Task" : "Add New Task"}</Text>
            <TextInput placeholder="Title" value={name} style={styles.input} onChangeText={setName} />
            <TextInput placeholder="Description" value={description} style={styles.input} onChangeText={setDescription} />
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="Cancel" color="gray" onPress={() => { setModalVisible(false); setName(''); setDescription(''); }} />
                <Button title={editingId ? "Update" : "Save"} onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    alignItems: 'center' 
  },
  dateText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  taskItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee', 
    marginHorizontal: 10, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  taskTitle: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  taskSub: { 
    fontSize: 14, 
    color: '#666' 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    padding: 20 
  },
  modalBox: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10 
  },
  modalTitle: { 
    fontWeight: 'bold', 
    marginBottom: 15, 
    fontSize: 18, 
    textAlign: 'center' 
  },
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 15, 
    padding: 5 
  },
  editBtn: { 
    marginRight: 15 
  }
});

export default CalendarView;