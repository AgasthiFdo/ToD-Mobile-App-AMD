import React from 'react';
import { View, StyleSheet } from 'react-native';
import NoteView from '@/components/NoteView';

const NotesScreen = () => {
  return (
    <View style={styles.container}>
      
      <NoteView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NotesScreen;









// import { View, Text } from "react-native"
// import React from "react"

// const Notes = () => {
//   return (
//     <View className="flex-1 justify-center items-center">
//       <Text className="text-2xl text-center">Notes</Text>
//     </View>
//   )
// }

// export default Notes
