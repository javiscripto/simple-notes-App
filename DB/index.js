import * as SQLite from "expo-sqlite";


let db = null;

export const init = async () => {
  db = await SQLite.openDatabaseAsync("notes.db");
  //activar las claves foraneas
  await db.execAsync(`PRAGMA foreign_keys = ON;`);


  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    folder_id INTEGER,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
  );`
  );
}
export const dropTables = async () => {
  await db.execAsync(`DROP TABLE IF EXISTS folders;`);
  await db.execAsync(`DROP TABLE IF EXISTS notes;`);
};


export const createFolder = async (name, description) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO folders (name, description) VALUES (?, ?);`,
      name, description,
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getAllFolders = async () => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM folders;`);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getFolder = async (id) => {
  try {
    const result = await db.execAsync(`SELECT * FROM folders WHERE id = ?;`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};
//esta funcion devuelve las notas alojadas dentro de una carpeta especifica
export const getFolderNotes = async (id) => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM notes WHERE folder_id = ?;`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const deleteFolder = async (id) => {
  try {
    const result = await db.runAsync(`DELETE FROM folders WHERE id = ?;`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

//crea una nota dentro de una carpeta especifica
export const createNote = async (title, content, folder_id) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO notes (title, content, folder_id) VALUES (?, ?, ?);`,
      title, content, folder_id
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getNotes = async () => {
  try {
    const result = await db.getAllAsync(`SELECT * FROM notes;`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getNote = async (id) => {
  try {
    const result = await db.execAsync(`SELECT * FROM notes WHERE id = ?;`, [id]);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const deleteNote = async (id) => {
  try {
    const result = await db.runAsync(`DELETE FROM notes WHERE id = ?;`, id);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateNote = async (id, title, content) => {
  try {
    const result = await db.runAsync(
      `UPDATE notes SET title = ?, content = ? WHERE id = ?;`,
      title, content, id
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

