import AsyncStorage from "@react-native-async-storage/async-storage";

export type NoteType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const NOTES_KEY = "my-notes";

export const noteService = {
  
  async getNotes(): Promise<NoteType[]> {
    try {
      const data = await AsyncStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error fetching notes", error);
      return [];
    }
  },

  async saveNote(title: string, description: string): Promise<NoteType[]> {
    try {
      const allNotes = await this.getNotes();
      const newNote: NoteType = {
        id: Math.random().toString(),
        title,
        description,
        createdAt: new Date().toLocaleString(),
      };
      const updatedNotes = [newNote, ...allNotes];
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
      return updatedNotes; 
    } catch (error) {
      console.error("Error saving note", error);
      return [];
    }
  },

  async deleteNote(id: string): Promise<NoteType[]> {
    const allNotes = await this.getNotes();
    const filtered = allNotes.filter(n => n.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    return filtered;
  }
};