import AsyncStorage from "@react-native-async-storage/async-storage";

export type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

const STORAGE_KEY = "my-todo";

export const taskService = {
  
  async getTodos(): Promise<ToDoType[]> {
    try {
      const todos = await AsyncStorage.getItem(STORAGE_KEY);
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error("Error getting todos", error);
      return [];
    }
  },

  
  async saveTodos(todos: ToDoType[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos", error);
    }
  }
};
