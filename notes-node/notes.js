const fs = require("fs");

const addNote = (title, body) => {
  let notes = readData();
  const new_note = { title, body };

  notes.push(new_note);
  fs.writeFileSync("notes.json", JSON.stringify(notes));

  console.log("Note created !!");
};

const getNotes = () => {
  let notes = readData();
  if (notes.length === 0) {
    console.log("There are no notes yet !!");
    return;
  }

  console.log("Notes", notes);
};

const getNoteByTitle = title => {
  let notes = readData();

  const note = notes.filter(note => note.title === title);

  if (note.length > 0) {
    console.log("Note ->", note[0]);
  } else {
    console.log("There is no note with the name providen.");
  }
};

const deleteNote = title => {
  let notes = readData();
  const the_notes = notes.filter(note => note.title !== title);
  
  fs.writeFileSync("notes.json", JSON.stringify(the_notes));
  
  console.log("Note deleted !");
};

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json"));
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote,
  getNotes,
  getNoteByTitle,
  deleteNote
};
