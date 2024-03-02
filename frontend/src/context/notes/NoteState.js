import noteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "c-notes-api.vercel.app
"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    //Logic for adding
    const note = await response.json();
    setNotes(notes.concat(note));


  }


  // Delete a Note
  const deleteNote = async (id) => {

    //Api Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)

    const newNotes = notes.filter((notes) => { return notes._id !== id });
    setNotes(newNotes);

  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //Api Call and edit in backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)


    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }} >
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
