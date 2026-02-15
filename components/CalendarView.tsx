import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarService } from '../services/calendarService';

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  
  const handleDayPress = async (day: any) => {
    setSelectedDate(day.dateString);
    const data = await calendarService.fetchTasksByDate(day.dateString);
    setTasks(data);
  };

  

  const handleSave = async () => {
      if (!name || !selectedDate) return;
      
     
      await calendarService.saveTaskToFirestore(name, description, selectedDate);
      
      
      setName('');
      setDescription('');
      setModalVisible(false);
      
    
      const updatedData = await calendarService.fetchTasksByDate(selectedDate);
      setTasks(updatedData); 
    };





  // const handleSave = async () => {
  //   if (!name || !selectedDate) return;
    
  //   await calendarService.saveTaskToFirestore(name, description, selectedDate);
    
    
  //   setName('');
  //   setDescription('');
  //   setModalVisible(false);
    
    
  //   const updatedData = await calendarService.fetchTasksByDate(selectedDate);
  //   setTasks(updatedData);
  // };

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={handleDayPress} 
        markedDates={{[selectedDate]: {selected: true, selectedColor: '#2196F3'}}} 
      />

      <View style={styles.header}>
        <Text style={styles.dateText}>{selectedDate || "Select A Date"}</Text>
        <Button title=" Add " onPress={() => setModalVisible(true)} disabled={!selectedDate} />
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.Name}</Text>
            <Text style={styles.taskSub}>{item.Description}</Text>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Add An Other Task</Text>
            <TextInput placeholder="Title" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="Description" style={styles.input} onChangeText={setDescription} />
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  dateText: { fontSize: 16, fontWeight: 'bold' },
  taskItem: { padding: 15, borderBottomWidth: 1, borderColor: '#eee', marginHorizontal: 10 },
  taskTitle: { fontSize: 16, fontWeight: '600' },
  taskSub: { fontSize: 14, color: '#666' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 5 }
});

export default CalendarView;