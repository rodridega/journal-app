import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const startNewNote = () => {
  return async(dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    await setDoc(doc(db,`${uid}/journal/notes`), newNote)
  };
};
