import React from 'react';
import CalendarView from '@/components/CalendarView';

const CalendarScreen = () => {
  return <CalendarView />; 
};

export default CalendarScreen;
































// import React, { useState } from 'react';
// import { View, StyleSheet, Modal, TextInput, Button, Text, FlatList } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const CalendarScreen = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [taskText, setTaskText] = useState('');
  
//   // සියලුම tasks සහ calendar එකේ පෙන්වන markings තියාගන්න state එක
//   const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
//   const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});

//   // දවසක් click කළාම වෙන දේ
//   const handleDayPress = (day: any) => {
//     setSelectedDate(day.dateString);
//     setModalVisible(true);
//   };

//   // Task එක save කරන function එක
//   const addTask = () => {
//     if (taskText.trim().length === 0) return;

//     // 1. Task List එක update කරන්න
//     const currentTasks = tasks[selectedDate] || [];
//     setTasks({
//       ...tasks,
//       [selectedDate]: [...currentTasks, taskText]
//     });

//     // 2. Calendar එකේ dot එකක් දාන්න
//     setMarkedDates({
//       ...markedDates,
//       [selectedDate]: { marked: true, dotColor: '#2196F3', selected: true, selectedColor: '#e3f2fd', selectedTextColor: '#000' }
//     });

//     setTaskText('');
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={handleDayPress}
//         markedDates={markedDates}
//         theme={{
//           todayTextColor: '#2196F3',
//           arrowColor: '#2196F3',
//         }}
//       />

//       {/* තෝරාගත් දවසේ තියෙන Tasks පෙන්වන තැන */}
//       <View style={styles.taskListContainer}>
//         <Text style={styles.dateHeader}>{selectedDate ? `${selectedDate} හි වැඩසටහන්:` : 'දවසක් තෝරන්න'}</Text>
//         <FlatList
//           data={tasks[selectedDate] || []}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.taskItem}>
//               <Text>• {item}</Text>
//             </View>
//           )}
//         />
//       </View>

//       {/* Task එකක් ඇතුළත් කරන්න එන Pop-up (Modal) එක */}
//       <Modal visible={isModalVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>නව වැඩක් එකතු කරන්න</Text>
//             <Text style={{ marginBottom: 10 }}>දිනය: {selectedDate}</Text>
            
//             <TextInput
//               style={styles.input}
//               placeholder="මෙතන ටයිප් කරන්න..."
//               value={taskText}
//               onChangeText={setTaskText}
//             />

//             <View style={styles.buttonRow}>
//               <Button title="අවලංගු කරන්න" color="red" onPress={() => setModalVisible(false)} />
//               <Button title="එකතු කරන්න" onPress={addTask} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
//   taskListContainer: { flex: 1, padding: 20 },
//   dateHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   taskItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
//   modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 20 },
//   buttonRow: { flexDirection: 'row', justifyContent: 'space-around' }
// });

// export default CalendarScreen;






























// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';

// const CalendarScreen = () => {
//   // මෙතන අපිට ඕන දින සහ ඒවායේ ස්වභාවය define කරන්න පුළුවන්
//   const [items, setItems] = useState({
//     '2024-05-20': { selected: true, marked: true, selectedColor: '#00adf5' },
//     '2024-05-22': { marked: true, dotColor: 'red' },
//     '2024-05-25': { marked: true, dotColor: 'green', activeOpacity: 0 },
//   });

//   return (
//     <View style={styles.container}>
//       <Calendar
//         // Marked dates මෙතනට ලබා දෙන්න
//         markedDates={items}
        
//         onDayPress={day => {
//           console.log('ඔබ තේරූ දිනය:', day.dateString);
//           // අලුත් දිනයක් select කළ විට එය highlight කිරීමට:
//           setItems({
//             ...items,
//             [day.dateString]: { selected: true, selectedColor: 'orange' }
//           });
//         }}

//         theme={{
//           calendarBackground: '#ffffff',
//           textSectionTitleColor: '#b6c1cd',
//           selectedDayBackgroundColor: '#00adf5',
//           selectedDayTextColor: '#ffffff',
//           todayTextColor: '#00adf5',
//           dayTextColor: '#2d4150',
//           dotColor: '#00adf5',
//           selectedDotColor: '#ffffff',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     backgroundColor: 'white',
//   },
// });

// export default CalendarScreen;