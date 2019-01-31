const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const argv = yargs
  .command("add", "Add a new note", {
    title: {
      describe: "Title of note",
      demand: true,
      alias: "t"
    },
    body: {
      describe: "Body of note",
      demand: true,
      alias: "b"
    }
  })
  .help().argv;
const { op, title, body } = argv;

switch (op) {
  case "add":
    notes.addNote(title, body);
    break;
  case "readAll":
    notes.getNotes();
    break;
  case "get":
    notes.getNoteByTitle(title);
    break;
  case "delete":
    notes.deleteNote(title);
    break;
  default:
    console.error("Command not found");
    return;
}
