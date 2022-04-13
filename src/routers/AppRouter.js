import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { login } from "../actions/auth";
import { LoadingScreen } from "../componentes/auth/LoadingScreen";
import { JournalScreen } from "../componentes/journal/JournalScreen";
import { auth } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

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
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/auth/login" loggedIn={loggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/*"
          element={
            <PublicRoute redirectTo='/' loggedIn={loggedIn} >
              <AuthRouter />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
