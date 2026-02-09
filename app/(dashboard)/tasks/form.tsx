import React from 'react';
import { StyleSheet, View } from 'react-native';
import TaskView from '@/components/TaskView';

const TasksScreen = () => {
  return (
    <View style={styles.container}>
      
      <TaskView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default TasksScreen;




// import { View, Text } from 'react-native'
// import React from 'react'

// const TaskForm = () => {
//   return (
//     <View>
//       <Text>TaskForm</Text>
//     </View>
//   )
// }

// export default TaskForm
