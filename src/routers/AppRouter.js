import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { login } from "../actions/auth";
import { LoadingScreen } from "../componentes/auth/LoadingScreen";
import { JournalScreen } from "../componentes/journal/JournalScreen";
import { auth } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setLoggedIn, setChecking]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JournalScreen isAuth={loggedIn} />} />
        <Route path="/auth/*" element={<AuthRouter isAuth={loggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
};
