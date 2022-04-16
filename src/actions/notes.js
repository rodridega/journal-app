import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(AddNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const AddNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id, ...note
  }
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await updateDoc(
      doc(db, `${uid}/journal/notes/${note.id}`),
      noteToFirestore
    );

    dispatch(refreshNote(note.id, note));
    Swal.fire("Saved!", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileURL = await fileUpload(file);
    activeNote.url = fileURL;

    dispatch(startSaveNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = (id) => {
  return async (dispatch, getState) => {

    const { uid } = getState().auth;

    console.log(uid);
    await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));

    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesRemove,
  payload: id,
});

export const notesLogoutCleaning = () => ({
  type: types.notesLogoutCleaning,
});
