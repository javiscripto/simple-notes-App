import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getFolderNotes, createNote, deleteNote as deleteNoteFromDB, updateNote as updateNoteFromDB,
  getAllFolders,
  getNotes,
  deleteFolder as deleteFolderFromDB
} from '../DB';

export const fetchAllNotes = createAsyncThunk(
  'notes/fetchAlNotes',
  async () => {
    const notes = await getNotes();
    return notes;
  }
);

export const fetchFolderNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (folderId) => {
    const notes = await getFolderNotes(folderId);
    return notes;
  }
);

export const fetchFolders = createAsyncThunk(
  'folders/fetchFolders',
  async () => {
    const folders = await getAllFolders();
    return folders;
  }
)

export const deleteFolderAsync = createAsyncThunk(
  'folders/deleteFolder',
  async (id) => {
    await deleteFolderFromDB(id);
    const folders = await getAllFolders();
    return folders;
  }
)
//las funciones addNoteAsync y deleteNoteAsync modifican el estado global y la base de datos
export const addNoteAsync = createAsyncThunk(
  'notes/addNote',
  async ({ title, content, folderId }) => {
    const note = await createNote(title, content, folderId);
    const notes = await getFolderNotes(folderId);
    return notes;
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNote',
  async (id) => {
    await deleteNoteFromDB(id);
    return
  }
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote',
  async ({ id, title, content }) => {
    await updateNoteFromDB(id, title, content);
    const notes = await getFolderNotes(id);
    return notes
  }
);




const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    folders: [],
    filteredNotes: [], //para almacenar las notas filtradas por id de carpeta
    selectedNote: null, //recibirá una nota en formato objeto
    status: 'idle',
    error: null,
  },
  reducers: {
    //recibe el id de la carpeta y filtra las notas
    setFilterNotesByFolderId: (state, action) => {
      state.filteredNotes = state.notes.filter(note => note.folder_id === action.payload);
    },
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },

  }, extraReducers: (builder) => {
    builder
      //notes
      .addCase(fetchAllNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFolderNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFolderNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(fetchFolderNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //folders
      .addCase(fetchFolders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folders = action.payload;
      })
      .addCase(deleteFolderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.folders = action.payload;
      })
      //add notes
      .addCase(addNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      //delete notes
      .addCase(deleteNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      //update notes
      .addCase(updateNoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
  },
});

export const selectNotes = (state) => state.notes.notes;

export default notesSlice.reducer;
