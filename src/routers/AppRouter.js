import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JournalScreen } from "../componentes/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JournalScreen />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
