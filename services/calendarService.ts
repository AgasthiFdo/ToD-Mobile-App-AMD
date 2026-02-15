import { db } from "./firebase"; 
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

const TASKS_COLLECTION = "tasks";

export const calendarService = {
  async saveTaskToFirestore(name: string, description: string, selectedDate: string) {
    try {
      const taskDate = new Date(selectedDate);
      
      await addDoc(collection(db, TASKS_COLLECTION), {
        Name: name,
        Description: description,
        date: Timestamp.fromDate(taskDate), 
      });
    } catch (e) {
      console.error("Error saving task: ", e);
    }
  },

  async fetchTasksByDate(dateString: string) {
    const start = new Date(dateString);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dateString);
    end.setHours(23, 59, 59, 999);

    
    const q = query(
      collection(db, TASKS_COLLECTION),
      where("date", ">=", Timestamp.fromDate(start)),
      where("date", "<=", Timestamp.fromDate(end))
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
};






// import { db } from "./firebase"; 
// import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

// const TASKS_COLLECTION = "tasks";

// export const calendarService = {
  
//   async saveTaskToFirestore(name: string, description: string, selectedDate: string) {
//     try {
//       const taskDate = new Date(selectedDate);
//       await addDoc(collection(db, TASKS_COLLECTION), {
//         Name: name,
//         Description: description,
//         Date: Timestamp.fromDate(taskDate), 
//       });
//     } catch (e) {
//       console.error("Error saving task: ", e);
//     }
//   },

  
//   async fetchTasksByDate(dateString: string) {
//     const start = new Date(dateString);
//     start.setHours(0, 0, 0, 0);
    
//     const end = new Date(dateString);
//     end.setHours(23, 59, 59, 999);

//     const q = query(
//       collection(db, TASKS_COLLECTION),
//       where("date", ">=", Timestamp.fromDate(start)),
//       where("date", "<=", Timestamp.fromDate(end))
//     );

//     const querySnapshot = await getDocs(q);
    
//     return querySnapshot.docs.map(doc => doc.data());
//   }
// };