import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type={"text"}
          placeholder="Algun titulo genial"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          className="notes__textarea"
          placeholder="Que paso hoy?"
        ></textarea>
        <div className="notes__images">
          <img
            src="https://i.pinimg.com/originals/a7/fc/aa/a7fcaa43650adc892c401956a08dc32a.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
